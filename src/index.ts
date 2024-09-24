#! /usr/bin/env node

import { Command } from "commander";

import pkg from "../package.json" assert { type: "json" };
import { main } from "./commands/main.ts";
import { withErrorCatcher } from "./middlewares/errorCatcher.ts";

const program = new Command();

program
  .version(
    pkg.version,
    "-v, --version",
    "Display the current version of the CLI"
  )
  .name("docuforge")
  .option("-p, ---path <path>")
  .option("-c, ---chunkSize <chunkSize>")
  .action(withErrorCatcher(main));

program.parse(process.argv);
