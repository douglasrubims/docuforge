import path from "node:path";
import type { Command } from "commander";

import { getTree } from "../helpers/getTree.ts";
import { configApiKeyEnv } from "../helpers/validateApiKeyEnv.ts";
import { generateDocs } from "./actions/generateDocs.ts";
import { generateIntroduction } from "./actions/generateIntroduction.ts";

interface CommandOptions {
  Path: string;
}

export async function main(options: CommandOptions, command: Command) {
  await configApiKeyEnv();

  const targetPath = options.Path || path.resolve();

  const { flattedTree } = await getTree(targetPath);

  await generateIntroduction(flattedTree);

  await generateDocs(flattedTree);
}
