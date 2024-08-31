import fs from "node:fs";

import * as Const from "../constants/index.ts";
import type { TreeItemFlatted } from "../types/index.ts";
import { getPromptResult } from "../utils/ai.ts";

type Item = TreeItemFlatted;

export async function generateDoc(item: Item, tree: Item[]) {
  let content = "";
  const context = tree.map(item => item.path);

  if (item.type === "file")
    content = await fs.promises.readFile(item.fullPath, "utf-8");

  const prompt = [
    "Based on the provided folder/file content, generate documentation in Markdown format.",
    Const.ASK_FOR_METADATA_PROMPT,
    Const.TREE_CONTEXT_PROMPT.replace("{{JSON}}", JSON.stringify(context)),
    Const.TREE_ITEM_DETAILS_PROMPT.replace("{{JSON}}", JSON.stringify(item)),
    `File content: ${content || "Not available (It's a folder)"}`,
    "Documentation (No need to wrap the response inside backticks '```'):"
  ].join("\n");

  const { text } = await getPromptResult(prompt);

  return text;
}
