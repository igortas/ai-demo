# AI Demo

> Inherits from: `~/.claude/CLAUDE.md` (global Node.js preferences)

Demo project for Claude Code + GitHub Actions integration.

## Commands

- `npm test` - Run tests (index.test.js)
- `npm start` - Run main app
- `node generate-pptx.mjs` - Generate presentation

## Project Structure

- `index.js` - Main app (greetUser, formatDate functions)
- `index.test.js` - Tests using Node assert
- `generate-pptx.mjs` - PowerPoint generator

## GitHub Actions

- `@claude` in PR comments → Makes code changes
- `@claude` in Issues → Read-only analysis
- PRs from `feature/*` or `bugfix/*` trigger auto-review
