import * as path from "node:path";
import dotenv from "dotenv";

const envFilePath = path.resolve(process.cwd(), ".env");

function get(): boolean {
  dotenv.config({
    path: envFilePath
  });

  return !!process.env.IS_USING_OLLAMA;
}

export const ollamaHelper = {
  get
};
