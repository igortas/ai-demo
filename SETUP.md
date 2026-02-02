# AI Demo Setup Guide

A demo showing AI agents integrated into GitHub PR workflow. When someone comments `@claude fix this` on a PR, a GitHub Action triggers Claude to automatically fix the bug.

---

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `ai-demo`
3. Leave it **empty** (no README, no .gitignore, no license)
4. Click **Create repository**

---

## Step 2: Push Code to GitHub

Run these commands in the terminal:

```bash
# Add your GitHub repo as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/ai-demo.git

# Push main branch
git checkout main
git push -u origin main

# Push bugfix or docs branch (contains the bug)
git checkout -b bugfix/welcome-message
git push -u origin bugfix/welcome-message
```

---

## Step 3: Add Anthropic API Key Secret

1. Go to your repo on GitHub
2. Click **Settings** tab
3. In left sidebar: **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Name: `ANTHROPIC_API_KEY`
6. Value: Your Anthropic API key
7. Click **Add secret**

---

## Step 4: Create Pull Request

1. Go to your repo on GitHub: `https://github.com/YOUR_USERNAME/ai-demo`
2. You should see a banner: **"bugfix/welcome-message had recent pushes"**
3. Click **Compare & pull request**
4. Title: `bugfix: Update greeting message`
5. Click **Create pull request**

---

## Step 5: Demo the AI Agent

1. On the PR page, scroll to the comment box
2. Type: `@claude fix this`
3. Click **Comment**
4. Watch the **Actions** tab - the workflow will run
5. Claude will find the typos ("Helo" → "Hello", "Welcom" → "Welcome")
6. Claude commits the fix automatically
7. Check the PR - you'll see a new commit with the fix!

---

## What's in the Demo

### The Bug (intentional)

File: `index.js` on `bugfix/welcome-message` branch

```javascript
function greetUser(name) {
	return `Helo, ${name}! Welcom to our app.`; // typos: "Helo", "Welcom"
}
```

### The Fix (what Claude will do)

```javascript
function greetUser(name) {
	return `Hello, ${name}! Welcome to our app.`; // fixed!
}
```

---

## Presentation Talking Points

- **Agent Autonomy**: Claude reads code, identifies bugs, fixes them, and commits
- **CI/CD Integration**: AI agents fit seamlessly into DevOps workflows
- **Human-in-the-Loop**: The `@claude` comment gives developers control
- **Real-World Pattern**: This mirrors how teams use AI for routine fixes

---

## Troubleshooting

### Action not running?

- Make sure `ANTHROPIC_API_KEY` secret is set
- Check that comment contains `@claude`
- Verify Actions are enabled in repo settings

### Push rejected?

- Make sure the GitHub repo is empty (no initial README)
- Check your remote URL: `git remote -v`

---

## Files in This Demo

| File                               | Description                          |
| ---------------------------------- | ------------------------------------ |
| `index.js`                         | Simple Node.js greeting app          |
| `package.json`                     | Project configuration                |
| `.github/workflows/claude-fix.yml` | GitHub Action for Claude integration |
| `SETUP.md`                         | This file                            |
