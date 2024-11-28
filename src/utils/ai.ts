import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { createOllama } from "ollama-ai-provider";

import { SYSTEM_PROMPT } from "../constants/index.ts";
import { ollamaHelper } from "./ollamaHelper.ts";

const modelProxy = () => {
  if (ollamaHelper.get())
    return createOllama({
      baseURL: process.env.OLLAMA_BASE_API_URL
    })(process.env.AI_MODEL);

  return openai(process.env.AI_MODEL);
};

export function createPromptAbility(system: string) {
  async function getResult(prompt: string) {
    const result = await generateText({
      model: modelProxy(),
      system,
      prompt
    });

    return result;
  }

  return { getResult };
}

export async function getPromptResult(prompt: string) {
  const result = await generateText({
    model: modelProxy(),
    system: SYSTEM_PROMPT,
    maxRetries: 5,
    prompt
  });

  return result;
}
