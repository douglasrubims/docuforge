import { isCancel, log, text } from "@clack/prompts";
import dotenv from "dotenv";

import {
  OPENAI_API_KEY_ENV_NOT_FOUND,
  OPENAI_API_KEY_REQUIRED
} from "../constants/errors.ts";
import { apiKey } from "../utils/apiKey.ts";
import { cancel } from "../utils/prompt.ts";

export async function configApiKeyEnv(nonInteractive?: boolean) {
  const openAiApiKey = await apiKey.get();

  if (!openAiApiKey) {
    if (nonInteractive) throw new Error(OPENAI_API_KEY_ENV_NOT_FOUND);

    log.warn(OPENAI_API_KEY_REQUIRED);

    const value = await text({
      message:
        "Enter your OpenAI API key (You can generate one at https://platform.openai.com/account/api-keys): ",
      placeholder: "sk-proj-Bf4JfR45..."
    });

    if (isCancel(value)) return cancel();

    await apiKey.set(value);
  }

  dotenv.config({
    override: true,
    path: "./.env"
  });
}
