import fs from "node:fs";
import * as path from "node:path";

import * as Const from "../constants/index.ts";
import type { TreeItemFlatted } from "../types/index.ts";
import { getPromptResult } from "../utils/ai.ts";

type Item = TreeItemFlatted;

const generateDocThroughContext = (context: string[]) => async (item: Item) => {
  let content = "";

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
};

export function cachedGenerateDoc(tree: Item[]) {
  const context = tree.map(item => item.path);

  return generateDocThroughContext(context);
}

const getSmartContext = async (basePath: string): Promise<string[]> => {
  try {
    const regex = /import.+['"](.+)['"];?/g;

    const pathInfo = path.parse(basePath);

    const lstatResults = await fs.promises.lstat(basePath);

    if (lstatResults.isDirectory())
      return Promise.all(
        ["index.js", "index.ts"].map(file =>
          getSmartContext(path.resolve(basePath, file))
        )
      ).then(result => result.flat());

    const content = await fs.promises.readFile(basePath, "utf-8");

    const iterator = content.matchAll(regex);

    const data = Array.from(iterator);

    const paths = data
      .map(item => item[1])
      .filter(recursivePath => recursivePath.startsWith("."))
      .map(recursivePath => path.join(pathInfo.dir, recursivePath));

    const recursivePaths = await Promise.all(paths.map(getSmartContext));

    return [...paths, ...recursivePaths.flat()];
  } catch (e: unknown) {
    return [];
  }
};

export async function smartDocGeneration(item: Item) {
  const context = await getSmartContext(item.fullPath);

  return generateDocThroughContext(context)(item);
}
