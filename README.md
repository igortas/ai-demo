# AI Demo

Demo project: Claude AI integrated with GitHub Actions for automated code review, bug fixes, and task execution.

## Quick Start

1. Fork or clone this repo
2. Add `ANTHROPIC_API_KEY` to GitHub repository secrets ([get key](https://console.anthropic.com/settings/keys))
3. Create a `feature/*` branch, open PR → auto-review triggers
4. Comment `@claude fix this` on any PR → Claude makes changes

## Workflows

| Workflow | Trigger | Action |
|----------|---------|--------|
| **claude.yml** | `@claude` comment on Issue or PR | Execute requests (PR) or analyze (Issue) |
| **claude-pr-review.yml** | PR opened/updated from `feature/*` or `bugfix/*` | Automatic code review |

### @claude Mention Examples

```
@claude fix the typos in this code
@claude add error handling to the greetUser function
@claude analyze this codebase and suggest improvements
```

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Regular development |
| `feature/*` | New features - triggers PR review |
| `bugfix/*` | Bug fixes - triggers PR review |

## Run Locally

```bash
npm start              # Run app (greets "Guest")
node index.js "Name"   # Run with custom name
```

## Architecture

- **index.js**: Main app with `greetUser()` and `formatDate()` functions (CommonJS)
- **.github/workflows/**: Two Claude workflows (claude.yml, claude-pr-review.yml)
- **.claude/settings.local.json**: Pre-configured git permissions

## Troubleshooting

**Action not running?**
- Check `ANTHROPIC_API_KEY` secret is set in repo settings
- Ensure comment contains `@claude`
- Verify Actions are enabled in repo settings
