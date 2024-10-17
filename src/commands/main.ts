import path from "node:path";
import type { Command } from "commander";

import { checkForDeletedFiles } from "../helpers/documentationMetadata.ts";
import { getTree } from "../helpers/getTree.ts";
import { configApiKeyEnv } from "../helpers/validateApiKeyEnv.ts";
import { generateDocs } from "./actions/generateDocs.ts";
import { generateIntroduction } from "./actions/generateIntroduction.ts";
import { DEFAULT_OLLAMA_BASE_API_URL, DEFAULT_OLLAMA_MODEL } from "../constants/ollama.ts";
import { DEFAULT_OPENAI_MODEL } from "../constants/openai.ts";
import { log } from "@clack/prompts";
import { FULL_CONTEXT_STRATEGY_WARNING } from "../constants/warnings.ts";

interface CommandOptions {
  Path: string;
  ChunkSize: number;
  nonInteractive: boolean;
  useFullContextStrategy?: boolean;
  ollamaMode?: boolean;
  OllamaBaseUrl?: string;
  AiModel?: string;
}

export async function main(options: CommandOptions, command: Command) {
  if (!options.ollamaMode) await configApiKeyEnv(options.nonInteractive);

  const targetPath = options.Path || path.resolve();
  const chunkSize = Number(options.ChunkSize) || 25;
  process.env.AI_MODEL = options.AiModel || DEFAULT_OPENAI_MODEL;

  if (options.useFullContextStrategy) {
    log.warn(FULL_CONTEXT_STRATEGY_WARNING);
    process.env.USE_FULL_CONTEXT = String("true") || undefined;
  }

  if (options.ollamaMode) {
    process.env.IS_USING_OLLAMA = "true";
    process.env.OLLAMA_BASE_API_URL = options.OllamaBaseUrl || DEFAULT_OLLAMA_BASE_API_URL;
    process.env.AI_MODEL = options.AiModel || DEFAULT_OLLAMA_MODEL;
  }

  checkForDeletedFiles();

  const { flattedTree } = await getTree(targetPath);

  await generateIntroduction(flattedTree);

  await generateDocs(flattedTree, chunkSize);
}
