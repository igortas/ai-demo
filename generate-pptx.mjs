import pptxgen from 'pptxgenjs';

const pptx = new pptxgen();

// Set presentation properties
pptx.author = 'Claude Code';
pptx.title = 'AI Demo - Claude Code Integration';
pptx.subject = 'Claude Code + GitHub Actions';

// Design constants
const MARGIN = 0.75;
const CONTENT_WIDTH = 10 - (MARGIN * 2); // 8.5"
const HEADLINE_SIZE = 24;
const BODY_SIZE = 14;
const CODE_SIZE = 14;

// Subtle color palette
const colors = {
  headline: '1F2937',      // Dark gray
  body: '4B5563',          // Medium gray
  accent: '3B82F6',        // Blue
  subtle: '6B7280',        // Light gray
  codeText: 'E5E7EB',      // Light for dark bg
  codeBg: '1F2937',        // Dark background
  tableBg: 'F9FAFB',       // Very light gray
  tableAlt: 'FFFFFF',      // White
  tableHeader: '374151'    // Dark gray
};

// Helper for consistent text styling
const headline = (text, y = MARGIN) => ({
  text,
  options: {
    x: MARGIN, y, w: CONTENT_WIDTH, h: 0.6,
    fontSize: HEADLINE_SIZE, bold: true, color: colors.headline
  }
});

const body = (text, y, h = 0.5) => ({
  text,
  options: {
    x: MARGIN, y, w: CONTENT_WIDTH, h,
    fontSize: BODY_SIZE, color: colors.body
  }
});

// Slide 1: Title
let slide = pptx.addSlide();
slide.addText('AI Demo', {
  x: MARGIN, y: 2, w: CONTENT_WIDTH, h: 0.8,
  fontSize: 44, bold: true, color: colors.headline,
  align: 'center'
});
slide.addText('Claude Code + GitHub Actions Integration', {
  x: MARGIN, y: 2.9, w: CONTENT_WIDTH, h: 0.5,
  fontSize: 22, color: colors.accent,
  align: 'center'
});
slide.addText('Automating development workflows with AI', {
  x: MARGIN, y: 3.6, w: CONTENT_WIDTH, h: 0.4,
  fontSize: BODY_SIZE, color: colors.subtle,
  align: 'center'
});

// Slide 2: What is AI Demo?
slide = pptx.addSlide();
slide.addText(headline('What is AI Demo?').text, headline('What is AI Demo?').options);
slide.addText('A demonstration project integrating Claude Code CLI with GitHub Actions for automated code assistance.', {
  x: MARGIN, y: 1.5, w: CONTENT_WIDTH, h: 0.6,
  fontSize: BODY_SIZE, color: colors.body
});
const features = [
  'Trigger Claude via @claude mentions in PRs and Issues',
  'Automatic code changes on Pull Requests',
  'Analysis and recommendations on Issues',
  'Built-in test automation'
];
features.forEach((feat, i) => {
  slide.addText(`•  ${feat}`, {
    x: MARGIN + 0.2, y: 2.4 + (i * 0.55), w: CONTENT_WIDTH - 0.2, h: 0.5,
    fontSize: BODY_SIZE, color: colors.body
  });
});

// Slide 3: Project Structure
slide = pptx.addSlide();
slide.addText(headline('Project Structure').text, headline('Project Structure').options);
const structure = `ai-demo/
├── .github/workflows/claude.yml
├── index.js
├── index.test.js
├── package.json
└── README.md`;
slide.addText(structure, {
  x: MARGIN, y: 1.5, w: 4, h: 2.2,
  fontSize: CODE_SIZE, fontFace: 'Courier New', color: colors.codeText,
  fill: { color: colors.codeBg }, valign: 'top',
  margin: [10, 10, 10, 10]
});
slide.addText('Core Application', {
  x: 5, y: 1.5, w: 4.25, h: 0.4,
  fontSize: 18, bold: true, color: colors.headline
});
const codeSnippet = `function greetUser(name) {
  return \`Hello, \${name}!\`;
}

function formatDate(date) {
  return date.toLocaleDateString(
    'en-US', { weekday: 'long' }
  );
}`;
slide.addText(codeSnippet, {
  x: 5, y: 2, w: 4.25, h: 2.2,
  fontSize: CODE_SIZE, fontFace: 'Courier New', color: colors.codeText,
  fill: { color: colors.codeBg }, valign: 'top',
  margin: [10, 10, 10, 10]
});

// Slide 4: GitHub Action Workflow
slide = pptx.addSlide();
slide.addText(headline('GitHub Action Workflow').text, headline('GitHub Action Workflow').options);
slide.addText('Configured in .github/workflows/claude.yml', {
  x: MARGIN, y: 1.4, w: CONTENT_WIDTH, h: 0.4,
  fontSize: BODY_SIZE, color: colors.subtle
});
const workflow = `name: Claude

on:
  issue_comment:
    types: [created]

jobs:
  claude:
    if: contains(github.event.comment.body, '@claude')
    runs-on: ubuntu-latest
    steps:
      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code`;
slide.addText(workflow, {
  x: MARGIN, y: 1.9, w: CONTENT_WIDTH, h: 3.2,
  fontSize: CODE_SIZE, fontFace: 'Courier New', color: colors.codeText,
  fill: { color: colors.codeBg }, valign: 'top',
  margin: [12, 12, 12, 12]
});

// Slide 5: Claude Code CLI
slide = pptx.addSlide();
slide.addText('Claude Code CLI', {
  x: MARGIN, y: 2.2, w: CONTENT_WIDTH, h: 0.8,
  fontSize: 40, bold: true, color: colors.headline,
  align: 'center'
});
slide.addText('Essential commands for your workflow', {
  x: MARGIN, y: 3.1, w: CONTENT_WIDTH, h: 0.5,
  fontSize: 20, color: colors.accent,
  align: 'center'
});

// Slide 6: Getting Started
slide = pptx.addSlide();
slide.addText(headline('Getting Started').text, headline('Getting Started').options);
const basicCommands = `# Install globally
npm install -g @anthropic-ai/claude-code

# Start interactive session
claude

# One-shot command
claude "explain this code"

# Print output only (non-interactive)
claude --print "fix the bug"`;
slide.addText(basicCommands, {
  x: MARGIN, y: 1.5, w: CONTENT_WIDTH, h: 3.5,
  fontSize: CODE_SIZE, fontFace: 'Courier New', color: colors.codeText,
  fill: { color: colors.codeBg }, valign: 'top',
  margin: [12, 12, 12, 12]
});

// Slide 7: Common Flags
slide = pptx.addSlide();
slide.addText(headline('Common Flags').text, headline('Common Flags').options);
const flags = `# Skip permission prompts (CI/CD)
claude --dangerously-skip-permissions

# Continue last conversation
claude --continue

# Resume specific session
claude --resume <session-id>

# Use specific model
claude --model opus`;
slide.addText(flags, {
  x: MARGIN, y: 1.5, w: CONTENT_WIDTH, h: 3.5,
  fontSize: CODE_SIZE, fontFace: 'Courier New', color: colors.codeText,
  fill: { color: colors.codeBg }, valign: 'top',
  margin: [12, 12, 12, 12]
});

// Slide 8: Slash Commands (Part 1)
slide = pptx.addSlide();
slide.addText(headline('Slash Commands').text, headline('Slash Commands').options);
slide.addText('Built-in commands for common tasks', {
  x: MARGIN, y: 1.4, w: CONTENT_WIDTH, h: 0.35,
  fontSize: BODY_SIZE, color: colors.subtle
});

const commands1 = [
  ['/help', 'Show available commands'],
  ['/init', 'Initialize project with CLAUDE.md'],
  ['/review', 'Review code changes'],
  ['/pr-comments', 'Address PR feedback'],
  ['/compact', 'Condense conversation context']
];

slide.addText('Command', {
  x: MARGIN, y: 2, w: 2.2, h: 0.45,
  fontSize: BODY_SIZE, bold: true, color: colors.codeText,
  fill: { color: colors.tableHeader }, align: 'center', valign: 'middle'
});
slide.addText('Description', {
  x: MARGIN + 2.2, y: 2, w: 6.3, h: 0.45,
  fontSize: BODY_SIZE, bold: true, color: colors.codeText,
  fill: { color: colors.tableHeader }, align: 'center', valign: 'middle'
});

commands1.forEach((cmd, i) => {
  const bgColor = i % 2 === 0 ? colors.tableBg : colors.tableAlt;
  slide.addText(cmd[0], {
    x: MARGIN, y: 2.45 + (i * 0.5), w: 2.2, h: 0.5,
    fontSize: BODY_SIZE, fontFace: 'Courier New', color: colors.headline,
    fill: { color: bgColor }, valign: 'middle', margin: [0, 0, 0, 10]
  });
  slide.addText(cmd[1], {
    x: MARGIN + 2.2, y: 2.45 + (i * 0.5), w: 6.3, h: 0.5,
    fontSize: BODY_SIZE, color: colors.body,
    fill: { color: bgColor }, valign: 'middle', margin: [0, 0, 0, 10]
  });
});

// Slide 9: Slash Commands (Part 2)
slide = pptx.addSlide();
slide.addText(headline('More Slash Commands').text, headline('More Slash Commands').options);

const commands2 = [
  ['/clear', 'Clear conversation history'],
  ['/config', 'View/edit configuration'],
  ['/cost', 'Show token usage and costs'],
  ['/doctor', 'Check installation health']
];

slide.addText('Command', {
  x: MARGIN, y: 1.5, w: 2.2, h: 0.45,
  fontSize: BODY_SIZE, bold: true, color: colors.codeText,
  fill: { color: colors.tableHeader }, align: 'center', valign: 'middle'
});
slide.addText('Description', {
  x: MARGIN + 2.2, y: 1.5, w: 6.3, h: 0.45,
  fontSize: BODY_SIZE, bold: true, color: colors.codeText,
  fill: { color: colors.tableHeader }, align: 'center', valign: 'middle'
});

commands2.forEach((cmd, i) => {
  const bgColor = i % 2 === 0 ? colors.tableBg : colors.tableAlt;
  slide.addText(cmd[0], {
    x: MARGIN, y: 1.95 + (i * 0.5), w: 2.2, h: 0.5,
    fontSize: BODY_SIZE, fontFace: 'Courier New', color: colors.headline,
    fill: { color: bgColor }, valign: 'middle', margin: [0, 0, 0, 10]
  });
  slide.addText(cmd[1], {
    x: MARGIN + 2.2, y: 1.95 + (i * 0.5), w: 6.3, h: 0.5,
    fontSize: BODY_SIZE, color: colors.body,
    fill: { color: bgColor }, valign: 'middle', margin: [0, 0, 0, 10]
  });
});

// Slide 10: Working with Git
slide = pptx.addSlide();
slide.addText(headline('Working with Git').text, headline('Working with Git').options);
const gitCommands = `# Create a commit
claude "commit these changes"

# Create a PR
claude "create a PR for this feature"

# Review current changes
claude /review

# Address PR comments
claude /pr-comments`;
slide.addText(gitCommands, {
  x: MARGIN, y: 1.5, w: CONTENT_WIDTH, h: 3,
  fontSize: CODE_SIZE, fontFace: 'Courier New', color: colors.codeText,
  fill: { color: colors.codeBg }, valign: 'top',
  margin: [12, 12, 12, 12]
});

// Slide 11: Project Context with CLAUDE.md
slide = pptx.addSlide();
slide.addText(headline('Project Context').text, headline('Project Context').options);
slide.addText('Initialize with /init to create a CLAUDE.md file:', {
  x: MARGIN, y: 1.4, w: CONTENT_WIDTH, h: 0.4,
  fontSize: BODY_SIZE, color: colors.subtle
});
const claudeMd = `# Project: AI Demo

## Commands
- npm test    Run tests
- npm start   Start application

## Style Guidelines
- Use ES6+ syntax
- Prefer const over let
- Add JSDoc comments for functions`;
slide.addText(claudeMd, {
  x: MARGIN, y: 1.9, w: CONTENT_WIDTH, h: 2.8,
  fontSize: CODE_SIZE, fontFace: 'Courier New', color: colors.codeText,
  fill: { color: colors.codeBg }, valign: 'top',
  margin: [12, 12, 12, 12]
});

// Slide 12: Environment Variables
slide = pptx.addSlide();
slide.addText(headline('Environment Variables').text, headline('Environment Variables').options);
const envVars = `# Required: API Key
export ANTHROPIC_API_KEY=sk-...

# Optional: Custom config location
export CLAUDE_CONFIG_DIR=~/.claude

# Optional: Disable telemetry
export CLAUDE_CODE_DISABLE_TELEMETRY=1`;
slide.addText(envVars, {
  x: MARGIN, y: 1.5, w: CONTENT_WIDTH, h: 2.8,
  fontSize: CODE_SIZE, fontFace: 'Courier New', color: colors.codeText,
  fill: { color: colors.codeBg }, valign: 'top',
  margin: [12, 12, 12, 12]
});

// Slide 13: Using @claude on Pull Requests
slide = pptx.addSlide();
slide.addText(headline('Using @claude on Pull Requests').text, headline('Using @claude on Pull Requests').options);
slide.addText('@claude please add input validation', {
  x: MARGIN, y: 1.5, w: CONTENT_WIDTH, h: 0.5,
  fontSize: CODE_SIZE, fontFace: 'Courier New', color: colors.codeText,
  fill: { color: colors.codeBg }, valign: 'middle',
  margin: [10, 10, 10, 10]
});
slide.addText('Claude will:', {
  x: MARGIN, y: 2.2, w: CONTENT_WIDTH, h: 0.4,
  fontSize: BODY_SIZE, bold: true, color: colors.headline
});
const prSteps = [
  'Analyze the request and codebase',
  'Make the necessary code changes',
  'Add or update tests',
  'Commit and push to the branch'
];
prSteps.forEach((step, i) => {
  slide.addText(`${i + 1}.  ${step}`, {
    x: MARGIN + 0.2, y: 2.7 + (i * 0.5), w: CONTENT_WIDTH - 0.2, h: 0.45,
    fontSize: BODY_SIZE, color: colors.body
  });
});

// Slide 14: Using @claude on Issues
slide = pptx.addSlide();
slide.addText(headline('Using @claude on Issues').text, headline('Using @claude on Issues').options);
slide.addText('@claude how can we improve date formatting?', {
  x: MARGIN, y: 1.5, w: CONTENT_WIDTH, h: 0.5,
  fontSize: CODE_SIZE, fontFace: 'Courier New', color: colors.codeText,
  fill: { color: colors.codeBg }, valign: 'middle',
  margin: [10, 10, 10, 10]
});
slide.addText('Claude will:', {
  x: MARGIN, y: 2.2, w: CONTENT_WIDTH, h: 0.4,
  fontSize: BODY_SIZE, bold: true, color: colors.headline
});
const issueSteps = [
  'Analyze the codebase',
  'Provide detailed recommendations',
  'Suggest implementation approach',
  'No code changes (read-only mode)'
];
issueSteps.forEach((step, i) => {
  slide.addText(`${i + 1}.  ${step}`, {
    x: MARGIN + 0.2, y: 2.7 + (i * 0.5), w: CONTENT_WIDTH - 0.2, h: 0.45,
    fontSize: BODY_SIZE, color: colors.body
  });
});

// Slide 15: MCP Servers Section Title
slide = pptx.addSlide();
slide.addText('MCP Servers', {
  x: MARGIN, y: 2.2, w: CONTENT_WIDTH, h: 0.8,
  fontSize: 40, bold: true, color: colors.headline,
  align: 'center'
});
slide.addText('Model Context Protocol - Extending Claude\'s capabilities', {
  x: MARGIN, y: 3.1, w: CONTENT_WIDTH, h: 0.5,
  fontSize: 20, color: colors.accent,
  align: 'center'
});

// Slide 16: What are MCP Servers?
slide = pptx.addSlide();
slide.addText(headline('What are MCP Servers?').text, headline('What are MCP Servers?').options);
slide.addText('MCP servers give Claude access to external tools and data sources.', {
  x: MARGIN, y: 1.5, w: CONTENT_WIDTH, h: 0.5,
  fontSize: BODY_SIZE, color: colors.body
});
const mcpFeatures = [
  'Connect to databases (PostgreSQL, SQLite)',
  'Access external APIs (GitHub, Slack, Jira)',
  'Read from file systems and cloud storage',
  'Integrate with design tools (Figma)',
  'Custom tools for your specific needs'
];
mcpFeatures.forEach((feat, i) => {
  slide.addText(`•  ${feat}`, {
    x: MARGIN + 0.2, y: 2.2 + (i * 0.5), w: CONTENT_WIDTH - 0.2, h: 0.45,
    fontSize: BODY_SIZE, color: colors.body
  });
});

// Slide 17: Adding MCP Servers
slide = pptx.addSlide();
slide.addText(headline('Adding MCP Servers').text, headline('Adding MCP Servers').options);
slide.addText('Configure in ~/.claude/settings.json:', {
  x: MARGIN, y: 1.4, w: CONTENT_WIDTH, h: 0.4,
  fontSize: BODY_SIZE, color: colors.subtle
});
const mcpConfig = `{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_xxx"
      }
    }
  }
}`;
slide.addText(mcpConfig, {
  x: MARGIN, y: 1.9, w: CONTENT_WIDTH, h: 2.8,
  fontSize: CODE_SIZE, fontFace: 'Courier New', color: colors.codeText,
  fill: { color: colors.codeBg }, valign: 'top',
  margin: [12, 12, 12, 12]
});

// Slide 18: Popular MCP Servers
slide = pptx.addSlide();
slide.addText(headline('Popular MCP Servers').text, headline('Popular MCP Servers').options);

const mcpServers = [
  ['@anthropic/mcp-github', 'GitHub issues, PRs, repos'],
  ['@anthropic/mcp-postgres', 'PostgreSQL databases'],
  ['@anthropic/mcp-filesystem', 'Extended file access'],
  ['@anthropic/mcp-slack', 'Slack messaging']
];

slide.addText('Package', {
  x: MARGIN, y: 1.5, w: 4, h: 0.45,
  fontSize: BODY_SIZE, bold: true, color: colors.codeText,
  fill: { color: colors.tableHeader }, align: 'center', valign: 'middle'
});
slide.addText('Capability', {
  x: MARGIN + 4, y: 1.5, w: 4.5, h: 0.45,
  fontSize: BODY_SIZE, bold: true, color: colors.codeText,
  fill: { color: colors.tableHeader }, align: 'center', valign: 'middle'
});

mcpServers.forEach((server, i) => {
  const bgColor = i % 2 === 0 ? colors.tableBg : colors.tableAlt;
  slide.addText(server[0], {
    x: MARGIN, y: 1.95 + (i * 0.5), w: 4, h: 0.5,
    fontSize: 13, fontFace: 'Courier New', color: colors.headline,
    fill: { color: bgColor }, valign: 'middle', margin: [0, 0, 0, 10]
  });
  slide.addText(server[1], {
    x: MARGIN + 4, y: 1.95 + (i * 0.5), w: 4.5, h: 0.5,
    fontSize: BODY_SIZE, color: colors.body,
    fill: { color: bgColor }, valign: 'middle', margin: [0, 0, 0, 10]
  });
});

// Slide 19: Skills Section Title
slide = pptx.addSlide();
slide.addText('Skills', {
  x: MARGIN, y: 2.2, w: CONTENT_WIDTH, h: 0.8,
  fontSize: 40, bold: true, color: colors.headline,
  align: 'center'
});
slide.addText('Custom slash commands for your workflow', {
  x: MARGIN, y: 3.1, w: CONTENT_WIDTH, h: 0.5,
  fontSize: 20, color: colors.accent,
  align: 'center'
});

// Slide 20: What are Skills?
slide = pptx.addSlide();
slide.addText(headline('What are Skills?').text, headline('What are Skills?').options);
slide.addText('Skills are reusable prompts invoked with slash commands.', {
  x: MARGIN, y: 1.5, w: CONTENT_WIDTH, h: 0.5,
  fontSize: BODY_SIZE, color: colors.body
});
const skillFeatures = [
  'Triggered with /skill-name syntax',
  'Can accept arguments and parameters',
  'Stored in ~/.claude/skills/ directory',
  'Share across projects or keep project-specific',
  'Chain multiple skills together'
];
skillFeatures.forEach((feat, i) => {
  slide.addText(`•  ${feat}`, {
    x: MARGIN + 0.2, y: 2.2 + (i * 0.5), w: CONTENT_WIDTH - 0.2, h: 0.45,
    fontSize: BODY_SIZE, color: colors.body
  });
});

// Slide 21: Creating Skills
slide = pptx.addSlide();
slide.addText(headline('Creating a Skill').text, headline('Creating a Skill').options);
slide.addText('Create ~/.claude/skills/review-security.md:', {
  x: MARGIN, y: 1.4, w: CONTENT_WIDTH, h: 0.4,
  fontSize: BODY_SIZE, color: colors.subtle
});
const skillExample = `---
name: review-security
description: Security code review
---

Review the code for security vulnerabilities:
- SQL injection risks
- XSS vulnerabilities
- Authentication issues
- Sensitive data exposure

Focus on: $ARGUMENTS`;
slide.addText(skillExample, {
  x: MARGIN, y: 1.9, w: CONTENT_WIDTH, h: 2.8,
  fontSize: CODE_SIZE, fontFace: 'Courier New', color: colors.codeText,
  fill: { color: colors.codeBg }, valign: 'top',
  margin: [12, 12, 12, 12]
});

// Slide 22: Using Skills
slide = pptx.addSlide();
slide.addText(headline('Using Skills').text, headline('Using Skills').options);
const skillUsage = `# Invoke a skill
/review-security auth module

# Built-in skills
/init          # Initialize CLAUDE.md
/review        # Review code changes
/pr-comments   # Address PR feedback

# List available skills
/help`;
slide.addText(skillUsage, {
  x: MARGIN, y: 1.5, w: CONTENT_WIDTH, h: 3,
  fontSize: CODE_SIZE, fontFace: 'Courier New', color: colors.codeText,
  fill: { color: colors.codeBg }, valign: 'top',
  margin: [12, 12, 12, 12]
});

// Slide 23: CLAUDE.md Section Title
slide = pptx.addSlide();
slide.addText('CLAUDE.md', {
  x: MARGIN, y: 2.2, w: CONTENT_WIDTH, h: 0.8,
  fontSize: 40, bold: true, color: colors.headline,
  align: 'center'
});
slide.addText('Project context document for Claude', {
  x: MARGIN, y: 3.1, w: CONTENT_WIDTH, h: 0.5,
  fontSize: 20, color: colors.accent,
  align: 'center'
});

// Slide 24: CLAUDE.md Purpose
slide = pptx.addSlide();
slide.addText(headline('Why CLAUDE.md?').text, headline('Why CLAUDE.md?').options);
slide.addText('Provides project context that persists across sessions.', {
  x: MARGIN, y: 1.5, w: CONTENT_WIDTH, h: 0.5,
  fontSize: BODY_SIZE, color: colors.body
});
const claudeMdBenefits = [
  'Automatically loaded at session start',
  'Defines build commands and scripts',
  'Documents code style preferences',
  'Describes architecture and patterns',
  'Lists important files and conventions'
];
claudeMdBenefits.forEach((benefit, i) => {
  slide.addText(`•  ${benefit}`, {
    x: MARGIN + 0.2, y: 2.2 + (i * 0.5), w: CONTENT_WIDTH - 0.2, h: 0.45,
    fontSize: BODY_SIZE, color: colors.body
  });
});

// Slide 25: CLAUDE.md Structure
slide = pptx.addSlide();
slide.addText(headline('CLAUDE.md Structure').text, headline('CLAUDE.md Structure').options);
const claudeMdFull = `# Project Name

## Build Commands
- npm install  # Install dependencies
- npm test     # Run test suite
- npm start    # Start dev server

## Architecture
- /src         # Source code
- /tests       # Test files

## Code Style
- TypeScript with strict mode
- Functional components preferred`;
slide.addText(claudeMdFull, {
  x: MARGIN, y: 1.5, w: CONTENT_WIDTH, h: 3.5,
  fontSize: CODE_SIZE, fontFace: 'Courier New', color: colors.codeText,
  fill: { color: colors.codeBg }, valign: 'top',
  margin: [12, 12, 12, 12]
});

// Slide 26: Subagents Section Title
slide = pptx.addSlide();
slide.addText('Subagents', {
  x: MARGIN, y: 2.2, w: CONTENT_WIDTH, h: 0.8,
  fontSize: 40, bold: true, color: colors.headline,
  align: 'center'
});
slide.addText('Delegating tasks to specialized agents', {
  x: MARGIN, y: 3.1, w: CONTENT_WIDTH, h: 0.5,
  fontSize: 20, color: colors.accent,
  align: 'center'
});

// Slide 27: What are Subagents?
slide = pptx.addSlide();
slide.addText(headline('What are Subagents?').text, headline('What are Subagents?').options);
slide.addText('Claude can spawn child agents to handle specific subtasks independently.', {
  x: MARGIN, y: 1.5, w: CONTENT_WIDTH, h: 0.5,
  fontSize: BODY_SIZE, color: colors.body
});
const subagentFeatures = [
  'Autonomous task execution with own context',
  'Specialized for specific task types (explore, plan, code)',
  'Results returned to parent agent',
  'Reduces main context pollution',
  'Enables parallel task processing'
];
subagentFeatures.forEach((feat, i) => {
  slide.addText(`•  ${feat}`, {
    x: MARGIN + 0.2, y: 2.2 + (i * 0.5), w: CONTENT_WIDTH - 0.2, h: 0.45,
    fontSize: BODY_SIZE, color: colors.body
  });
});

// Slide 28: Subagent Types
slide = pptx.addSlide();
slide.addText(headline('Subagent Types').text, headline('Subagent Types').options);
slide.addText('Built-in specialized agents for different tasks', {
  x: MARGIN, y: 1.4, w: CONTENT_WIDTH, h: 0.35,
  fontSize: BODY_SIZE, color: colors.subtle
});

const agentTypes = [
  ['Explore', 'Search and understand codebase'],
  ['Plan', 'Design implementation strategies'],
  ['Bash', 'Execute shell commands'],
  ['Code Review', 'Analyze code for issues']
];

slide.addText('Agent', {
  x: MARGIN, y: 2, w: 2.5, h: 0.45,
  fontSize: BODY_SIZE, bold: true, color: colors.codeText,
  fill: { color: colors.tableHeader }, align: 'center', valign: 'middle'
});
slide.addText('Purpose', {
  x: MARGIN + 2.5, y: 2, w: 6, h: 0.45,
  fontSize: BODY_SIZE, bold: true, color: colors.codeText,
  fill: { color: colors.tableHeader }, align: 'center', valign: 'middle'
});

agentTypes.forEach((agent, i) => {
  const bgColor = i % 2 === 0 ? colors.tableBg : colors.tableAlt;
  slide.addText(agent[0], {
    x: MARGIN, y: 2.45 + (i * 0.5), w: 2.5, h: 0.5,
    fontSize: BODY_SIZE, fontFace: 'Courier New', color: colors.headline,
    fill: { color: bgColor }, valign: 'middle', margin: [0, 0, 0, 10]
  });
  slide.addText(agent[1], {
    x: MARGIN + 2.5, y: 2.45 + (i * 0.5), w: 6, h: 0.5,
    fontSize: BODY_SIZE, color: colors.body,
    fill: { color: bgColor }, valign: 'middle', margin: [0, 0, 0, 10]
  });
});

// Slide 29: Using Subagents
slide = pptx.addSlide();
slide.addText(headline('Using Subagents').text, headline('Using Subagents').options);
slide.addText('Claude automatically spawns subagents when needed:', {
  x: MARGIN, y: 1.4, w: CONTENT_WIDTH, h: 0.4,
  fontSize: BODY_SIZE, color: colors.subtle
});
const subagentExample = `# Claude will use explore subagent
"Find all API endpoints in this codebase"

# Claude will use plan subagent
"Plan the implementation of user auth"

# You can also explicitly request
"Use a subagent to search for error
handling patterns across all files"`;
slide.addText(subagentExample, {
  x: MARGIN, y: 1.9, w: CONTENT_WIDTH, h: 2.8,
  fontSize: CODE_SIZE, fontFace: 'Courier New', color: colors.codeText,
  fill: { color: colors.codeBg }, valign: 'top',
  margin: [12, 12, 12, 12]
});

// Slide 30: Parallel Agents Section Title
slide = pptx.addSlide();
slide.addText('Parallel Agents', {
  x: MARGIN, y: 2.2, w: CONTENT_WIDTH, h: 0.8,
  fontSize: 40, bold: true, color: colors.headline,
  align: 'center'
});
slide.addText('Running multiple Claude instances simultaneously', {
  x: MARGIN, y: 3.1, w: CONTENT_WIDTH, h: 0.5,
  fontSize: 20, color: colors.accent,
  align: 'center'
});

// Slide 31: Why Parallel Agents?
slide = pptx.addSlide();
slide.addText(headline('Why Parallel Agents?').text, headline('Why Parallel Agents?').options);
const parallelBenefits = [
  'Work on multiple features simultaneously',
  'Reduce total development time',
  'Independent contexts prevent interference',
  'Each agent has full Claude capabilities',
  'Scale up for large refactoring tasks'
];
parallelBenefits.forEach((benefit, i) => {
  slide.addText(`•  ${benefit}`, {
    x: MARGIN + 0.2, y: 1.6 + (i * 0.55), w: CONTENT_WIDTH - 0.2, h: 0.5,
    fontSize: BODY_SIZE, color: colors.body
  });
});

// Slide 32: Running Agents in Parallel
slide = pptx.addSlide();
slide.addText(headline('Running Agents in Parallel').text, headline('Running Agents in Parallel').options);
slide.addText('Launch multiple Claude sessions in separate terminals:', {
  x: MARGIN, y: 1.4, w: CONTENT_WIDTH, h: 0.4,
  fontSize: BODY_SIZE, color: colors.subtle
});
const parallelCode = `# Terminal 1 - Feature A
claude "implement user login form"

# Terminal 2 - Feature B
claude "add payment processing"

# Terminal 3 - Bug fixes
claude "fix the date parsing bug"`;
slide.addText(parallelCode, {
  x: MARGIN, y: 1.9, w: CONTENT_WIDTH, h: 2.5,
  fontSize: CODE_SIZE, fontFace: 'Courier New', color: colors.codeText,
  fill: { color: colors.codeBg }, valign: 'top',
  margin: [12, 12, 12, 12]
});

// Slide 33: Git Worktrees Section Title
slide = pptx.addSlide();
slide.addText('Git Worktrees', {
  x: MARGIN, y: 2.2, w: CONTENT_WIDTH, h: 0.8,
  fontSize: 40, bold: true, color: colors.headline,
  align: 'center'
});
slide.addText('Isolated directories for parallel development', {
  x: MARGIN, y: 3.1, w: CONTENT_WIDTH, h: 0.5,
  fontSize: 20, color: colors.accent,
  align: 'center'
});

// Slide 34: What are Git Worktrees?
slide = pptx.addSlide();
slide.addText(headline('What are Git Worktrees?').text, headline('What are Git Worktrees?').options);
slide.addText('Git worktrees allow multiple working directories from one repository.', {
  x: MARGIN, y: 1.5, w: CONTENT_WIDTH, h: 0.5,
  fontSize: BODY_SIZE, color: colors.body
});
const worktreeFeatures = [
  'Each worktree has its own branch checkout',
  'Shared git history and objects',
  'No conflicts between parallel changes',
  'Perfect for running multiple agents'
];
worktreeFeatures.forEach((feat, i) => {
  slide.addText(`•  ${feat}`, {
    x: MARGIN + 0.2, y: 2.2 + (i * 0.55), w: CONTENT_WIDTH - 0.2, h: 0.5,
    fontSize: BODY_SIZE, color: colors.body
  });
});

// Slide 35: Creating Worktrees
slide = pptx.addSlide();
slide.addText(headline('Creating Worktrees').text, headline('Creating Worktrees').options);
const worktreeCommands = `# Create worktree for feature branch
git worktree add ../project-feature-a feature-a

# Create worktree with new branch
git worktree add -b feature-b ../project-feature-b

# List all worktrees
git worktree list

# Remove worktree when done
git worktree remove ../project-feature-a`;
slide.addText(worktreeCommands, {
  x: MARGIN, y: 1.5, w: CONTENT_WIDTH, h: 3,
  fontSize: CODE_SIZE, fontFace: 'Courier New', color: colors.codeText,
  fill: { color: colors.codeBg }, valign: 'top',
  margin: [12, 12, 12, 12]
});

// Slide 36: Parallel Agents with Worktrees
slide = pptx.addSlide();
slide.addText(headline('Parallel Agents + Worktrees').text, headline('Parallel Agents + Worktrees').options);
slide.addText('The optimal setup for parallel development:', {
  x: MARGIN, y: 1.4, w: CONTENT_WIDTH, h: 0.4,
  fontSize: BODY_SIZE, color: colors.subtle
});
const worktreeSetup = `# Setup worktrees
git worktree add -b auth ../myapp-auth
git worktree add -b payments ../myapp-payments

# Terminal 1 - Auth feature
cd ../myapp-auth && claude "implement OAuth"

# Terminal 2 - Payments feature
cd ../myapp-payments && claude "add Stripe"`;
slide.addText(worktreeSetup, {
  x: MARGIN, y: 1.9, w: CONTENT_WIDTH, h: 2.8,
  fontSize: CODE_SIZE, fontFace: 'Courier New', color: colors.codeText,
  fill: { color: colors.codeBg }, valign: 'top',
  margin: [12, 12, 12, 12]
});

// Slide 37: Worktree Workflow
slide = pptx.addSlide();
slide.addText(headline('Worktree Workflow').text, headline('Worktree Workflow').options);
const workflowSteps = [
  'Create worktree with feature branch',
  'Open new terminal in worktree directory',
  'Launch Claude agent for that feature',
  'Merge completed branches back to main',
  'Remove worktree after merging'
];
workflowSteps.forEach((step, i) => {
  slide.addText(`${i + 1}.  ${step}`, {
    x: MARGIN + 0.2, y: 1.6 + (i * 0.55), w: CONTENT_WIDTH - 0.2, h: 0.5,
    fontSize: BODY_SIZE, color: colors.body
  });
});

// Slide 38: Memory Section Title
slide = pptx.addSlide();
slide.addText('Memory', {
  x: MARGIN, y: 2.2, w: CONTENT_WIDTH, h: 0.8,
  fontSize: 40, bold: true, color: colors.headline,
  align: 'center'
});
slide.addText('Persistent knowledge across sessions', {
  x: MARGIN, y: 3.1, w: CONTENT_WIDTH, h: 0.5,
  fontSize: 20, color: colors.accent,
  align: 'center'
});

// Slide 39: Memory Levels
slide = pptx.addSlide();
slide.addText(headline('Memory Levels').text, headline('Memory Levels').options);
slide.addText('Claude stores learnings in two locations:', {
  x: MARGIN, y: 1.5, w: CONTENT_WIDTH, h: 0.5,
  fontSize: BODY_SIZE, color: colors.body
});
const memoryPaths = `# Global memory (all projects)
~/.claude/CLAUDE.md

# Per-project memory
~/.claude/projects/<path>/MEMORY.md`;
slide.addText(memoryPaths, {
  x: MARGIN, y: 2.1, w: CONTENT_WIDTH, h: 1.4,
  fontSize: CODE_SIZE, fontFace: 'Courier New', color: colors.codeText,
  fill: { color: colors.codeBg }, valign: 'top',
  margin: [12, 12, 12, 12]
});
const memoryFeatures = [
  'Auto-updated as Claude learns from mistakes',
  'Persists across conversations and sessions',
  'Use --resume to continue previous sessions',
  'Add custom notes to guide future behavior'
];
memoryFeatures.forEach((feat, i) => {
  slide.addText(`•  ${feat}`, {
    x: MARGIN + 0.2, y: 3.7 + (i * 0.5), w: CONTENT_WIDTH - 0.2, h: 0.45,
    fontSize: BODY_SIZE, color: colors.body
  });
});

// Slide 40: Key Takeaways
slide = pptx.addSlide();
slide.addText(headline('Key Takeaways').text, headline('Key Takeaways').options);

const takeaways = [
  'MCP servers extend Claude with external tools',
  'Skills create reusable custom commands',
  'CLAUDE.md provides persistent project context',
  'Subagents + parallel agents scale your work',
  'Git worktrees enable isolated development',
  'Memory persists learnings across sessions'
];

takeaways.forEach((item, i) => {
  slide.addText(`•  ${item}`, {
    x: MARGIN + 0.2, y: 1.6 + (i * 0.6), w: CONTENT_WIDTH - 0.2, h: 0.55,
    fontSize: BODY_SIZE, color: colors.body
  });
});

// Slide 41: Questions
slide = pptx.addSlide();
slide.addText('Questions?', {
  x: MARGIN, y: 2.3, w: CONTENT_WIDTH, h: 0.8,
  fontSize: 44, bold: true, color: colors.headline,
  align: 'center'
});
slide.addText('Built with Claude Code', {
  x: MARGIN, y: 4.5, w: CONTENT_WIDTH, h: 0.4,
  fontSize: BODY_SIZE, color: colors.subtle,
  align: 'center'
});

// Save file
pptx.writeFile({ fileName: 'presentation.pptx' })
  .then(() => console.log('PPTX created: presentation.pptx'))
  .catch(err => console.error(err));
