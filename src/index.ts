#! /usr/bin/env node

import { Command } from "commander";

import pkg from "../package.json" assert { type: "json" };
import { main } from "./commands/main.ts";
import {
  DEFAULT_OLLAMA_BASE_API_URL,
  DEFAULT_OLLAMA_MODEL
} from "./constants/ollama.ts";
import { DEFAULT_OPENAI_MODEL } from "./constants/openai.ts";
import { withErrorCatcher } from "./middlewares/errorCatcher.ts";

const program = new Command();

program
  .name("docuforge")
  .version(
    pkg.version,
    "-v, --version",
    "Display the current version of the CLI"
  )
  .option("-p, ---path <path>")
  .option("-n, --non-interactive", "Run the command in non-interactive mode")
  .option("-c, ---chunk-size <chunk_size>")
  .option(
    "-o, --ollama-mode",
    "Specify if you want to use Ollama instead of OpenAI. Defaults to false."
  )
  .option(
    "-b, ---ollama-base-url <ollama_base_url>",
    `Specify Ollama base API URL (endpoint prefix). Defaults to "${DEFAULT_OLLAMA_BASE_API_URL}"`
  )
  .option(
    "-m, ---ai-model <ai_model>",
    `Specify which model you want to use. Defaults to "${DEFAULT_OPENAI_MODEL}" if using OpenAI or "${DEFAULT_OLLAMA_MODEL}" if using Ollama.`
  )
  .option(
    "-f, --use-full-context-strategy",
    "Disable smart context strategy, defaults to false."
  )
  .action(withErrorCatcher(main));

program.parse(process.argv);
