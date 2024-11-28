#! /usr/bin/env node

import { Command } from "commander";

import pkg from "../package.json" assert { type: "json" };
import { main } from "./commands/main.ts";
import { withErrorCatcher } from "./middlewares/errorCatcher.ts";
import { DEFAULT_OLLAMA_BASE_API_URL, DEFAULT_OLLAMA_MODEL } from "./constants/ollama.ts";
import { DEFAULT_OPENAI_MODEL } from "./constants/openai.ts";

const program = new Command();

program
  .version(
    pkg.version,
    "-v, --version",
    "Display the current version of the CLI"
  )
  .name("docuforge")
  .option("-p, ---path <path>")
  .option("-n, --non-interactive", "Run the command in non-interactive mode")
  .option("-c, ---chunk-size <chunkSize>")
  .option("-O, --ollama-mode", "Specify if you want to use Ollama instead of OpenAI. Defaults to false.")
  .option("-e, ---ollama-base-url <ollamaBaseUrl>", `Specify Ollama base API URL (endpoint prefix). Defaults to "${DEFAULT_OLLAMA_BASE_API_URL}"`)
  .option("-M, ---ai-model <aiModel>", `Specify which model you want to use. Defaults to "${DEFAULT_OPENAI_MODEL}" if using OpenAI or "${DEFAULT_OLLAMA_MODEL}" if using Ollama.`)
  .option("-F, --use-full-context-strategy", `Disable smart context strategy, defaults to false.`)
  .action(withErrorCatcher(main));

program.parse(process.argv);
