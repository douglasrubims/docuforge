import fs from "node:fs";

import { IGNORE } from "../constants/index.ts";

export function shouldIgnore(path: string): boolean {
  const dcfIgnorePatterns = loadDcfIgnore();
  const allIgnorePatterns = [...IGNORE, ...dcfIgnorePatterns];

  return allIgnorePatterns.some(pattern => {
    if (pattern.endsWith("/")) pattern += "*";

    const regexPattern = pattern
      .replace(/\./g, "\\.")
      .replace(/\*/g, ".*")
      .replace(/\/$/, "/.*");

    const regex = new RegExp(`^${regexPattern}`);

    return regex.test(path);
  });
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
