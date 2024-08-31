import fs from "node:fs";
import { spinner } from "@clack/prompts";
import chalk from "chalk";

import {
  ASK_FOR_METADATA_PROMPT,
  SYSTEM_PROMPT,
  TREE_CONTEXT_PROMPT
} from "../../constants/index.ts";
import { saveDocForFile } from "../../helpers/saveDocForFile.ts";
import type { TreeItemFlatted } from "../../types/index.ts";
import { createPromptAbility } from "../../utils/ai.ts";

export async function generateIntroduction(itemsList: TreeItemFlatted[]) {
  const context = itemsList.map(item => item.path);

  const loading = spinner();

  loading.start("Generating documentation introduction");

  const packageJson = itemsList.find(i => i.name === "package.json");
  const readme = itemsList.find(i => i.name.toLowerCase() === "readme.md");

  const packageJsonContent = packageJson
    ? await fs.promises.readFile(packageJson?.fullPath, "utf-8")
    : "not found";

  const readmeContent = readme
    ? await fs.promises.readFile(readme?.fullPath, "utf-8")
    : "not found";

  const prompt = [
    "Based on the provided folder/file structure, generate a general introduction in Markdown format.",
    "The introduction should contain all parts of the project overview, what the project is about, how to run the project, requirements, etc.",
    ASK_FOR_METADATA_PROMPT,
    TREE_CONTEXT_PROMPT.replace("{{JSON}}", JSON.stringify(context)),
    `package.json: \`\`\`${packageJsonContent}\`\`\``,
    `README: \`\`\`${readmeContent}\`\`\``,
    "Introduction (It's not necessary to wrap the response with backticks '```'):"
  ].join("\n");

  const { text } = await createPromptAbility(SYSTEM_PROMPT).getResult(prompt);

  const { path } = await saveDocForFile("introduction", text);

  loading.stop(`Introduction generated and saved in ${chalk.cyan(path)}`);
}
