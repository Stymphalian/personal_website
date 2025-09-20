# Overview
This VS Code extension gives you a context-menu and Ctrl+P command to generate
a GitHub perma-link for specific lines in your code repository. This allows you to 
quickly share snippets of code in slack, in docs, etc. Many IDEs and tools provide this functionality out of the box. 
The best extension I found for VSCode was [this](https://github.com/hogashi/vscode-copy-github-permalink).
As is my current trend, the entirety of this tool was generated using AI-assisted coding
agents. This time I am trying out GitHub Copilot Pro with Claude Sonnet 4.

The main features of the extension:
- **Copy Link** to GitHub into your clipboard using the current line(s) and the current repository and branch. \
This will generate a link like this: \
`https://github.com/Stymphalian/vscode-code-share-link/blob/main/LICENSE#L2`
- **Keyboard Shortcuts**:
   - `Ctrl+Shift+Alt+C` (`Cmd+Shift+Alt+C` on Mac) - Generate link with current branch
   - `Ctrl+Shift+Alt+M` (`Cmd+Shift+Alt+M` on Mac) - Generate link with main branch
- **Context Menu**: Right-click in the editor and select code link options
- **Configurable**:  The extension can be customized through VS Code settings:
   - `codeShareLink.baseUrl`: Base URL for the git hosting service (default: `github.com`)
   - `codeShareLink.defaultBranch`: Default branch name for main branch links (default: `main`)
   - `codeShareLink.showInContextMenu`: Show commands in context menu (default: `true`)
   - `codeShareLink.showMainBranchInContextMenu`: Show main branch command in context menu (default: `true`)

## Commentary

- This was a relatively simple exercise and it allowed me to try out some new tools.
- I started the project out by using GitHub Copilot's [Coding Agent](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/agents/coding-agent/about-coding-agent) feature
which is built directly into github.com. When you create a new repository through github.com 
you have the option of having a copilot agent running through a task and making a pull-request
with the changes. 
- You can see the pull request that the agent made [here](https://github.com/Stymphalian/vscode-code-share-link/pull/1). This was actually quite cool. The pull request functions as any normal code review. As long as you tag `@copilot` in your
responses then the agent will spin up again and address your comments and make additional changes. 
- After this I just merged the feature branch into main and used VS Code Copilot agent chatting to 
finish off miscellaneous features (such as multi-line select, copy link (main), etc)
- There is not much to the architecture of this extension. It directly uses the `git` CLI tool to 
query for the branch name, repository root directory path and it concatenates it together
to form the final `url` and stores it in the clipboard.
- I had written this exact same extension previously while working at CourseHero
and I remember it took me the better part of the entire day to get working. Most
of the time was spent just reading through VS Code API documentation, browsing through 
Stack Overflow for obscure `git` commands to get the information I wanted. I am constantly
surprised at how powerful these AI agents can now be at getting things done. 
- With all this AI stuff looming over the Software industry I have seen the impression
that software developer jobs are going extinct and no one should need to learn how to code. 
- My current feeling is that we still need programmers and software developers but the
nature of our valued skillset is now changing. You still need to know all your fundamentals 
of CS and programming but it is now much more useful to have the ability to quickly 
read through code and understand the structure of the program. I feel like a lot of the 
time developers are just reading through obscure documentation and 
writing out magical boilerplate code to use a particular API or library. The AI agents
are now quite sophisticated in that it is just a matter of verifying the ordering and 
correctness of the code written rather than digging/writing it up yourself. 

---

*Project completed: September 20, 2025*