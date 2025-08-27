@echo off
REM Docker build script for personal-blog (Windows)
REM Usage: build.bat [dev|prod|all] [--no-cache] [--push]

setlocal enabledelayedexpansion

REM Default values
set BUILD_TYPE=all
set NO_CACHE=
set PUSH=
set IMAGE_NAME=personal-blog
set REGISTRY=

REM Parse command line arguments
:parse_args
if "%~1"=="" goto :end_parse
if "%~1"=="dev" (
    set BUILD_TYPE=dev
    shift
    goto :parse_args
)
if "%~1"=="development" (
    set BUILD_TYPE=dev
    shift
    goto :parse_args
)
if "%~1"=="prod" (
    set BUILD_TYPE=prod
    shift
    goto :parse_args
)
if "%~1"=="production" (
    set BUILD_TYPE=prod
    shift
    goto :parse_args
)
if "%~1"=="all" (
    set BUILD_TYPE=all
    shift
    goto :parse_args
)
if "%~1"=="--no-cache" (
    set NO_CACHE=--no-cache
    shift
    goto :parse_args
)
if "%~1"=="--push" (
    set PUSH=true
    shift
    goto :parse_args
)
if "%~1"=="--registry" (
    set REGISTRY=%~2
    shift
    shift
    goto :parse_args
)
if "%~1"=="--help" (
    goto :show_help
)
if "%~1"=="-h" (
    goto :show_help
)
echo Unknown option: %~1
exit /b 1

:show_help
echo Usage: %0 [dev^|prod^|all] [--no-cache] [--push] [--registry REGISTRY]
echo.
echo Build types:
echo   dev, development  - Build development image only
echo   prod, production  - Build production image only
echo   all               - Build both images ^(default^)
echo.
echo Options:
echo   --no-cache       - Build without using cache
echo   --push           - Push images to registry after build
echo   --registry       - Specify registry for pushing
echo   --help, -h       - Show this help message
exit /b 0

:end_parse

echo Building personal-blog Docker images...
echo Build type: %BUILD_TYPE%
if defined NO_CACHE (
    echo No cache: Yes
) else (
    echo No cache: No
)
if defined PUSH (
    echo Push: Yes
) else (
    echo Push: No
)
echo.

REM Build based on type
if "%BUILD_TYPE%"=="dev" (
    echo Building Dockerfile.dev -^> %IMAGE_NAME%:dev
    docker build %NO_CACHE% -f Dockerfile.dev -t %IMAGE_NAME%:dev .
    if %ERRORLEVEL% EQU 0 (
        echo ✓ Successfully built %IMAGE_NAME%:dev
    ) else (
        echo ✗ Failed to build %IMAGE_NAME%:dev
        exit /b 1
    )
) else if "%BUILD_TYPE%"=="prod" (
    echo Building Dockerfile -^> %IMAGE_NAME%:production
    docker build %NO_CACHE% -f Dockerfile --target production -t %IMAGE_NAME%:production .
    if %ERRORLEVEL% EQU 0 (
        echo ✓ Successfully built %IMAGE_NAME%:production
    ) else (
        echo ✗ Failed to build %IMAGE_NAME%:production
        exit /b 1
    )
) else if "%BUILD_TYPE%"=="all" (
    echo Building Dockerfile.dev -^> %IMAGE_NAME%:dev
    docker build %NO_CACHE% -f Dockerfile.dev -t %IMAGE_NAME%:dev .
    if %ERRORLEVEL% EQU 0 (
        echo ✓ Successfully built %IMAGE_NAME%:dev
    ) else (
        echo ✗ Failed to build %IMAGE_NAME%:dev
        exit /b 1
    )
    
    echo Building Dockerfile -^> %IMAGE_NAME%:production
    docker build %NO_CACHE% -f Dockerfile --target production -t %IMAGE_NAME%:production .
    if %ERRORLEVEL% EQU 0 (
        echo ✓ Successfully built %IMAGE_NAME%:production
    ) else (
        echo ✗ Failed to build %IMAGE_NAME%:production
        exit /b 1
    )
    
    echo Building Dockerfile -^> %IMAGE_NAME%:latest
    docker build %NO_CACHE% -f Dockerfile --target production -t %IMAGE_NAME%:latest .
    if %ERRORLEVEL% EQU 0 (
        echo ✓ Successfully built %IMAGE_NAME%:latest
    ) else (
        echo ✗ Failed to build %IMAGE_NAME%:production
        exit /b 1
    )
)

REM Build based on type
if "%BUILD_TYPE%"=="dev" (
    call :build_image Dockerfile.dev dev
) else if "%BUILD_TYPE%"=="prod" (
    call :build_image Dockerfile production production
) else if "%BUILD_TYPE%"=="all" (
    call :build_image Dockerfile.dev dev
    call :build_image Dockerfile production production
    call :build_image Dockerfile latest production
)

echo Build completed successfully!
echo.
echo Available images:
docker images %IMAGE_NAME%
