# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a demo project showcasing Claude AI integration with GitHub Actions. It demonstrates automated code fixes triggered by PR comments, manual CLI invocation, or branch pushes.

## Commands

```bash
npm start              # Run the app (greets "Guest" with today's date)
node index.js "Name"   # Run with custom greeting name
```

No test or lint commands are configured - this is a minimal demonstration project.

## Architecture

- **index.js**: Main application with two exported functions (`greetUser`, `formatDate`) using CommonJS exports
- **.github/workflows/claude-fix.yml**: GitHub Actions workflow that runs Claude Code to fix bugs
- **.claude/settings.local.json**: Pre-configured git permissions for Claude Code

## GitHub Actions Workflow

The `claude-fix.yml` workflow can be triggered three ways:
1. **PR comment**: Comment containing `@claude` on a pull request
2. **Manual CLI**: `gh workflow run claude-fix.yml -f pr_number=<NUMBER>`
3. **Push**: Automatic on pushes to `feature/*` or `docs/*` branches

The workflow checks out the branch, runs Claude Code with the `--print` flag, commits fixes, and pushes back to the branch.

## Required Setup

Add `ANTHROPIC_API_KEY` as a GitHub repository secret (from https://console.anthropic.com/settings/keys).
