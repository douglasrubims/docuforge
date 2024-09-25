import fs from "node:fs";

import { IGNORE } from "../constants/index.ts";
import ignore from "ignore";

export function shouldIgnore(path: string): boolean {
  const dcfIgnorePatterns = loadDcfIgnore();
  const allIgnorePatterns = [...IGNORE, ...dcfIgnorePatterns];
  const ig = ignore().add(allIgnorePatterns);

  return ig.ignores(path);
}

function loadDcfIgnore(): string[] {
  const ignoreFilePath = ".dcfignore";

  if (fs.existsSync(ignoreFilePath)) {
    const data = fs.readFileSync(ignoreFilePath, "utf-8");
    return data
      .split("\n")
      .map(line => line.trim())
      .filter(line => line && !line.startsWith("#"));
  }

  return [];
}
