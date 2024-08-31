import * as prompt from "@clack/prompts";

export function cancel(message = "Operation cancelled") {
  prompt.cancel(message);

  process.exit(0);
}
