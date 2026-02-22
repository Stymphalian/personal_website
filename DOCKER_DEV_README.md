# Docker Development Environment

All development happens inside a Docker container.
The container image is defined in `Dockerfile.dev` and orchestrated by 
`docker-compose.yaml`. VS Code connects to the container via the Dev Containers
extension using `.devcontainer/devcontainer.json`.

## How it fits together

```
Dockerfile.dev              ← defines the image (node:24-alpine + git + global tools)
docker-compose.yaml         ← defines the `shell` service (workspace mount, env vars)
.devcontainer/
  devcontainer.json         ← points VS Code at the `shell` service; adds extensions,
                               settings, .gitconfig mount, port forwarding
```

`devcontainer.json` does **not** define its own image or volumes — it delegates to `docker-compose.yaml` so there is a single source of truth for the container configuration.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed and running
- [VS Code](https://code.visualstudio.com/) with the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension (`ms-vscode-remote.remote-containers`)

## Quick Start (VS Code Dev Container)

This is the primary development workflow.

1. Open the repo in VS Code
2. When prompted **"Reopen in Container"**, click it — or open the Command Palette and run **Dev Containers: Reopen in Container**
3. VS Code builds the image (first time only), starts the `shell` service, and reconnects the editor inside the container
4. Once inside, open a terminal and start the dev server:
   ```bash
   cd personal-blog && npm run dev
   ```
5. VS Code automatically forwards port **5173** — open http://localhost:5173 in your browser

On first open, `postCreateCommand` runs automatically:
- Marks `/workspace` as a git safe directory
- Runs `npm install` inside `personal-blog/`

## Common Commands (run inside the container terminal)

```bash
# Start dev server with hot reload
cd personal-blog && npm run dev

# Run tests
cd personal-blog && npm test

# Run tests in watch mode
cd personal-blog && npm run test:watch

# Type check
cd personal-blog && npm run type-check

# Lint
cd personal-blog && npm run lint

# Fix lint issues
cd personal-blog && npm run lint:fix

# Production build
cd personal-blog && npm run build

# Preview production build
cd personal-blog && npm run preview

# Install a new dependency
cd personal-blog && npm install <package-name>
```

## Git Inside the Container

Git works exactly as it does on the host:

- The entire repo (including `.git/`) is bind-mounted at `/workspace`, so all history, branches, and staged changes are live
- `~/.gitconfig` from the host is mounted read-only into the container, so your name, email, and aliases are available
- VS Code Dev Containers automatically forwards your host **SSH agent**, so `git push` / `git pull` over SSH works without any extra setup
- HTTPS credential helpers are also forwarded by VS Code automatically

```bash
git status
git add .
git commit -m "message"
git push
```

## Headless / CLI Usage (without VS Code)

If you need a shell in the container without VS Code:

```bash
# Start the shell service interactively
docker compose run --rm shell

# Or start it in the background and exec in
docker compose up -d shell
docker compose exec shell bash

# Stop when done
docker compose down
```

## Ports

| Port | Service |
|------|---------|
| 5173 | Vite dev server |
| 3000 | Alternative / preview |

## Rebuilding the Image

If you change `Dockerfile.dev` or update dependencies in the image:

```bash
# From VS Code: Dev Containers: Rebuild Container

# Or from the host CLI:
docker compose build shell
```

## Troubleshooting

### Port already in use
Edit the `ports` mapping in `docker-compose.yaml`:
```yaml
ports:
  - "5174:5173"  # use 5174 on the host instead
```

### `node_modules` conflicts
The `node_modules` directory is excluded from the workspace bind-mount via an anonymous volume, so host and container dependencies stay isolated. If you see stale dependency issues, reinstall inside the container:
```bash
cd personal-blog && rm -rf node_modules && npm install
```

### Git "dubious ownership" error
This is fixed automatically by `postCreateCommand`. If it reappears after a manual `docker compose run`, run:
```bash
git config --global --add safe.directory /workspace
```
