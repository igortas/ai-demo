const pptxgen = require("pptxgenjs");

// Create presentation
const pptx = new pptxgen();
pptx.layout = "LAYOUT_16x9";
pptx.title = "AI-Assisted Development with Claude";
pptx.author = "Claude Code";

// Color scheme
const colors = {
  dark: "1a1a2e",
  darker: "0f0f23",
  accent: "00d4ff",
  purple: "7c3aed",
  white: "eaeaea",
  code: "2d2d44",
};

// Helper for title slides
function addTitleSlide(title, subtitle = "") {
  const slide = pptx.addSlide();
  slide.background = { color: colors.darker };
  slide.addText(title, {
    x: 0.5,
    y: 2.5,
    w: "90%",
    fontSize: 44,
    bold: true,
    color: colors.accent,
    align: "center",
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.5,
      y: 3.5,
      w: "90%",
      fontSize: 24,
      color: colors.white,
      align: "center",
    });
  }
  return slide;
}

// Helper for content slides
function addContentSlide(title, content) {
  const slide = pptx.addSlide();
  slide.background = { color: colors.dark };
  slide.addText(title, {
    x: 0.5,
    y: 0.3,
    w: "90%",
    fontSize: 32,
    bold: true,
    color: colors.accent,
  });

  let yPos = 1.2;
  content.forEach((item) => {
    if (item.type === "text") {
      slide.addText(item.value, {
        x: 0.5,
        y: yPos,
        w: "90%",
        fontSize: item.size || 18,
        color: item.color || colors.white,
        bold: item.bold || false,
      });
      yPos += item.spacing || 0.5;
    } else if (item.type === "bullet") {
      slide.addText(item.items.map(i => ({ text: i, options: { bullet: true } })), {
        x: 0.5,
        y: yPos,
        w: "90%",
        fontSize: 18,
        color: colors.white,
      });
      yPos += item.items.length * 0.4;
    } else if (item.type === "code") {
      slide.addText(item.value, {
        x: 0.5,
        y: yPos,
        w: "90%",
        fontSize: 14,
        fontFace: "Courier New",
        color: colors.accent,
        fill: { color: colors.code },
      });
      yPos += item.spacing || 1.5;
    } else if (item.type === "table") {
      slide.addTable(item.rows, {
        x: 0.5,
        y: yPos,
        w: 9,
        fontSize: 14,
        color: colors.white,
        fill: { color: colors.code },
        border: { pt: 1, color: colors.purple },
      });
      yPos += item.spacing || 2;
    }
  });
  return slide;
}

// Slide 1: Title
addTitleSlide(
  "AI-Assisted Development with Claude",
  "Automating Code Review & Development Workflows"
);

// Slide 2: What We'll Cover
addContentSlide("What We'll Cover", [
  { type: "text", value: "Part 1: AI-Demo Project", bold: true, color: colors.purple, spacing: 0.4 },
  { type: "bullet", items: [
    "Project architecture and core functions",
    "GitHub Actions automation",
    "Live bug detection demo",
  ]},
  { type: "text", value: "Part 2: Claude Code CLI", bold: true, color: colors.purple, spacing: 0.6 },
  { type: "bullet", items: [
    "Essential commands and workflows",
    "Best practices for AI-assisted coding",
  ]},
]);

// Slide 3: Part 1 Title
addTitleSlide("Part 1", "The AI-Demo Project");

// Slide 4: Project Overview
addContentSlide("Project Overview", [
  { type: "text", value: "A Node.js demo showcasing Claude AI + GitHub Actions", spacing: 0.6 },
  { type: "text", value: "Key Capabilities:", bold: true, color: colors.purple, spacing: 0.4 },
  { type: "bullet", items: [
    "Automatic PR code review on feature branches",
    "Interactive @claude commands in PR/Issue comments",
    "Test-driven development with AI assistance",
    "Git operations automation",
  ]},
]);

// Slide 5: Core Functions
addContentSlide("Core Functions", [
  { type: "code", value: `// Greeting function with personalization
function greetUser(name) {
  return \`Hello, \${name}! Welcome to our application.\`;
}

// Date formatting utility
function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric',
    month: 'long', day: 'numeric'
  });
}`, spacing: 2.8 },
  { type: "text", value: "✅ Both functions have comprehensive test coverage", color: "00ff00" },
]);

// Slide 6: GitHub Workflows
addContentSlide("GitHub Workflows", [
  { type: "table", rows: [
    [{ text: "Workflow", options: { fill: colors.purple, bold: true } },
     { text: "Trigger", options: { fill: colors.purple, bold: true } },
     { text: "Action", options: { fill: colors.purple, bold: true } }],
    ["claude.yml", "@claude comment", "Makes code changes, runs tests, commits"],
    ["claude-pr-review.yml", "PR opened/updated", "Automatic code review"],
  ], spacing: 1.8 },
  { type: "text", value: "Workflow Features:", bold: true, color: colors.purple, spacing: 0.4 },
  { type: "bullet", items: [
    "Runs on feature/* and bugfix/* branches",
    "Executes tests before and after changes",
    "Posts structured review comments",
  ]},
]);

// Slide 7: Live Demo - Banner Bug
addContentSlide("Live Demo: The Banner Bug", [
  { type: "text", value: "Current feature/banner branch has intentional issues:", spacing: 0.5 },
  { type: "code", value: `function printBaner(mesage) {  // ❌ Typos!
  let length = 0;
  for (let i = 0; i < mesage.length; i++) {
    length++;  // ❌ Overcomplicated!
  }
  retrun mesage;  // ❌ Syntax error!
}`, spacing: 2 },
  { type: "text", value: "Claude will detect: typos, inefficient code, missing tests", bold: true, color: colors.accent },
]);

// Slide 8: Part 2 Title
addTitleSlide("Part 2", "Claude Code CLI");

// Slide 9: What is Claude Code
addContentSlide("What is Claude Code?", [
  { type: "text", value: "An AI-powered command-line interface for software development", spacing: 0.6 },
  { type: "text", value: "Capabilities:", bold: true, color: colors.purple, spacing: 0.4 },
  { type: "bullet", items: [
    "Read, write, and edit code",
    "Run terminal commands",
    "Search and navigate codebases",
    "Create commits and pull requests",
    "Multi-file refactoring",
  ]},
  { type: "code", value: "# Start Claude Code\nclaude", spacing: 1 },
]);

// Slide 10: Essential Commands
addContentSlide("Essential Commands", [
  { type: "table", rows: [
    [{ text: "Command", options: { fill: colors.purple, bold: true } },
     { text: "Purpose", options: { fill: colors.purple, bold: true } }],
    ["/continue", "Resume most recent session"],
    ["/resume", "Pick from all past sessions"],
    ["/clear", "Reset context between tasks"],
    ["/compact", "Compress context manually"],
    ["/context", "Check context usage"],
    ["/init", "Generate CLAUDE.md for project"],
  ], spacing: 3 },
]);

// Slide 11: Permission Modes
addContentSlide("Permission Modes", [
  { type: "text", value: "Press Shift+Tab to cycle through modes:", spacing: 0.5 },
  { type: "table", rows: [
    [{ text: "Mode", options: { fill: colors.purple, bold: true } },
     { text: "Behavior", options: { fill: colors.purple, bold: true } }],
    ["Normal", "Claude asks before changes"],
    ["Auto-Accept", "File edits auto-approved"],
    ["Plan Mode", "Read-only, creates plans"],
  ], spacing: 1.8 },
  { type: "text", value: "Keyboard Shortcuts:", bold: true, color: colors.purple, spacing: 0.4 },
  { type: "bullet", items: [
    "Esc - Stop Claude mid-action",
    "Esc + Esc - Open rewind menu",
    "Ctrl+R - Command history search",
  ]},
]);

// Slide 12: Best Practices
addContentSlide("Best Practices", [
  { type: "text", value: "The Golden Rule:", bold: true, color: colors.purple, spacing: 0.4 },
  { type: "text", value: "\"Give Claude something to verify its work against\"", size: 20, spacing: 0.5 },
  { type: "bullet", items: [
    "Tests, screenshots, expected outputs",
    "Without verification → plausible code",
    "With verification → Claude self-corrects",
  ]},
  { type: "text", value: "The Workflow:", bold: true, color: colors.purple, spacing: 0.5 },
  { type: "bullet", items: [
    "1. Explore (Plan Mode) → Read & understand",
    "2. Plan (Plan Mode) → Design approach",
    "3. Implement (Normal Mode) → Code with tests",
  ]},
]);

// Slide 13: Session Management
addContentSlide("Session Management", [
  { type: "code", value: `# Resume sessions
claude --continue         # Most recent
claude --resume           # Interactive picker

# In-session
/rename oauth-migration   # Name for easy finding
/clear                    # Fresh context`, spacing: 2 },
  { type: "text", value: "Pro Tips:", bold: true, color: colors.purple, spacing: 0.4 },
  { type: "bullet", items: [
    "Name sessions descriptively",
    "Use /clear between unrelated tasks",
    "Context is your most precious resource",
  ]},
]);

// Slide 14: Pro Tips
addContentSlide("Pro Tips", [
  { type: "text", value: "Subagents", bold: true, color: colors.purple, spacing: 0.3 },
  { type: "text", value: "Use Task tool for complex research - runs in separate context", spacing: 0.5 },
  { type: "text", value: "Skills", bold: true, color: colors.purple, spacing: 0.3 },
  { type: "text", value: "Create reusable workflows in ~/.claude/skills/", spacing: 0.5 },
  { type: "text", value: "Headless Mode", bold: true, color: colors.purple, spacing: 0.3 },
  { type: "code", value: `# One-off queries
claude -p "Explain this code"

# Pipe data through Claude
cat error.log | claude -p "Explain this error"`, spacing: 1.5 },
]);

// Slide 15: Key Takeaways
addContentSlide("Key Takeaways", [
  { type: "bullet", items: [
    "1. Verification is essential - Give Claude tests or expected outputs",
    "2. Manage context aggressively - Use /clear between tasks",
    "3. Explore before implementing - Plan Mode for understanding",
    "4. Name your sessions - Makes resuming easy",
    "5. Automate with workflows - GitHub Actions + Claude = powerful",
  ]},
]);

// Slide 16: Resources
addContentSlide("Resources", [
  { type: "text", value: "Documentation", bold: true, color: colors.purple, spacing: 0.4 },
  { type: "bullet", items: [
    "Claude Code Docs: docs.anthropic.com/claude-code",
    "GitHub Actions: docs.github.com/en/actions",
  ]},
  { type: "text", value: "This Project", bold: true, color: colors.purple, spacing: 0.5 },
  { type: "bullet", items: [
    "Repository: ai-demo",
    "Branch: feature/banner (with intentional bugs)",
  ]},
  { type: "text", value: "Get Help", bold: true, color: colors.purple, spacing: 0.5 },
  { type: "bullet", items: [
    "/help in Claude Code",
    "GitHub Issues: github.com/anthropics/claude-code/issues",
  ]},
]);

// Slide 17: Thank You
addTitleSlide("Thank You!", "Questions?\n\nclaude --continue");

// Save
pptx.writeFile({ fileName: "presentation.pptx" })
  .then(() => console.log("✅ Created presentation.pptx"))
  .catch(err => console.error("Error:", err));
