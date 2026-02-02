# AI Demo Setup Guide

A demo showing AI agents integrated into GitHub PR workflow. Claude can automatically fix bugs when triggered via PR comments or CLI.

---

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `ai-demo`
3. Leave it **empty** (no README, no .gitignore, no license)
4. Click **Create repository**

---

## Step 2: Push Code to GitHub

```bash
# Set your GitHub repo as remote
git remote set-url origin git@github.com:YOUR_USERNAME/ai-demo.git

# Push main branch
git checkout main
git push -u origin main
```

---

## Step 3: Add Anthropic API Key Secret

1. Go to your repo on GitHub
2. Click **Settings** tab
3. In left sidebar: **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Name: `ANTHROPIC_API_KEY`
6. Value: Your Anthropic API key (get it from https://console.anthropic.com/settings/keys)
7. Click **Add secret**

---

## Step 4: Create Feature Branch with Bug

```bash
# Create feature branch
git checkout -b feature/welcome-message

# Edit index.js to add typos (for demo)
# Change "Hello" to "Helo" and "Welcome" to "Welcom"

git add index.js
git commit -m "feat: Add greeting message"
git push -u origin feature/welcome-message
```

---

## Step 5: Create Pull Request

1. Go to: https://github.com/YOUR_USERNAME/ai-demo
2. Click **Compare & pull request** (or go to Pull requests → New)
3. Base: `main` ← Compare: `feature/welcome-message`
4. Title: `feat: Add greeting message`
5. Click **Create pull request**

---

## Step 6: Trigger Claude to Fix

### Option A: Comment on PR
1. On the PR page, add a comment: `@claude fix this`
2. The GitHub Action triggers automatically

### Option B: CLI Command
```bash
gh workflow run claude-fix.yml -f pr_number=<PR_NUMBER>
```

---

## What Happens

1. GitHub Action triggers
2. Claude reads the codebase
3. Claude finds typos ("Helo" → "Hello", "Welcom" → "Welcome")
4. Claude commits the fix
5. Claude comments on the PR

---

## Workflow Triggers

| Trigger | When |
|---------|------|
| `@claude` comment | Comment on any PR |
| `gh workflow run` | Manual CLI trigger with PR number |
| Push to `feature/*` | Auto-runs on feature branch pushes |
| Push to `docs/*` | Auto-runs on docs branch pushes |

---

## The Bug (for demo)

File: `index.js` on feature branch

```javascript
function greetUser(name) {
  return `Helo, ${name}! Welcom to our app.`; // typos
}
```

## The Fix (what Claude does)

```javascript
function greetUser(name) {
  return `Hello, ${name}! Welcome to our app.`; // fixed!
}
```

---

## Troubleshooting

### Action not running?
- Check `ANTHROPIC_API_KEY` secret is set
- For comments: make sure it contains `@claude`
- Check Actions are enabled in repo settings

### Push rejected?
- Make sure GitHub repo was created empty
- Check remote: `git remote -v`

### CLI trigger not working?
- Install GitHub CLI: `brew install gh` or `apt install gh`
- Authenticate: `gh auth login`

---

## Files

| File | Description |
|------|-------------|
| `index.js` | Node.js greeting app |
| `package.json` | Project config |
| `.github/workflows/claude-fix.yml` | GitHub Action |
| `SETUP.md` | This guide |
