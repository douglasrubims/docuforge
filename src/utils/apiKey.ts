import { promises as fs } from "node:fs";
import * as path from "node:path";
import { log } from "@clack/prompts";
import chalk from "chalk";

const envFilePath = path.resolve(process.cwd(), ".env");

async function set(apiKey: string) {
  try {
    const envContent = `OPENAI_API_KEY=${apiKey}\n`;

    await fs.writeFile(envFilePath, envContent, { flag: "a" });

    log.success(`API key saved in ${chalk.cyan(envFilePath)}`);
  } catch (err) {
    log.error(
      "Error saving the API key. Contact support if the problem persists."
    );
  }
}

async function get(): Promise<string | null> {
  try {
    const data = await fs.readFile(envFilePath, "utf8");

    const match = data.match(/^OPENAI_API_KEY=(.+)$/m);

    if (match[1]) return match[1];

    log.error(`API key not found in the file ${chalk.cyan(envFilePath)}.`);

    return null;
  } catch (err) {
    return null;
  }
}

export const apiKey = {
  set,
  get
};
