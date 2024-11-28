export const IGNORE = [
  "node_modules",
  "bower_components",
  "vendor",

  ".git",
  ".svn",
  ".hg",
  ".idea",
  ".vscode",

  "dist",
  "build",
  "out",
  "coverage",
  ".next",
  "public",
  "build",
  ".cache",
  ".next",
  "tmp",
  "logs",
  ".husky",

  ".env",
  ".env.local",
  ".env.development",
  ".env.production",
  ".env.test",

  "test-results",
  "cypress",
  "e2e",
  ".test",
  "spec",
  "tests",

  "*.sublime-workspace",
  "*.sublime-project",
  "*.code-workspace",
  "*.vscode",
  "*.idea",
  "*.iml",
  "*.swp",
  "*.swo",
  "*.log",
  "*.tmp",
  "*.bak",
  "*.orig",
  "*.pid",
  "*.seed",

  ".npm",
  ".yarn",
  ".yarn-cache",
  ".pnpm-store",
  ".pnp",
  ".pnp.js",
  ".pnp.cjs",
  "yarn-error.log",
  "package-lock.json",
  "yarn.lock",

  ".vercel",
  ".serverless",
  ".netlify",
  ".terraform",
  "deploy",
  "deployment",

  "docs",
  "doc",
  "generated",
  "out-tsc",
  "typings",
  "tsconfig.tsbuildinfo",

  ".DS_Store",
  "Thumbs.db",
  "ehthumbs.db",
  "desktop.ini",
  "npm-debug.log",
  "yarn-debug.log",
  "yarn-error.log",
  "pnpm-debug.log",
  "lerna-debug.log",
  "tsconfig.json",
  "jsconfig.json",
  "package-lock.json",
  "yarn.lock",

  ".github",
  ".gitignore",
  ".editorconfig",
  ".eslintignore",
  ".eslintrc.json",
  "LICENSE",
  "prettier.config.js",
  "tsup.config.ts",

  "*.jpg",
  "*.jpeg",
  "*.png",
  "*.gif",
  "*.pdf",
  "*.log",
  "*.tmp",
  "*.bak",
  "*.swp",
  "*.swo",
  "*.zip",
  "*.tar",
  "*.gz",
  "*.rar",

  ".dfcignore",
  "venv"
];

export const SYSTEM_PROMPT =
  "You are a senior software engineer with decades of professional experience. You write documentation about code and structures in a simple, clear, and concise manner. Your writing tone is technical.";

export const ASK_FOR_METADATA_PROMPT = `
In addition to the title and description within the doc, add a 'title' and a 'description' at the top of the file (as metadata) - this doc will be used as a page in mintlify.

Example below:
\`\`\`
---
title: Introduction
description: 'A step-by-step guide to quickly start using the service'
---
\`\`\`

If the file name is not generic (index.ts, index.tsx, etc), you should use the file name as the title. Ex:

\`\`\`
---
title: useForm
description: '[DESCRIPTION...]'
---
\`\`\`
`.trim();

export const TREE_CONTEXT_PROMPT =
  "The folder/file structure is (Just for context): ```{{JSON}}```";

export const TREE_ITEM_DETAILS_PROMPT =
  "The structure of the item for which you should generate the doc is: ```{{JSON}}```";
