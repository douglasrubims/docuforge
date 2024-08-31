import path from "node:path";

export function getDocPath(filePath: string) {
  const fileDir = path.dirname(filePath);
  const fileName = `${path.basename(filePath, path.extname(filePath))}.md`;

  const outputDir = path.join(path.dirname(""), "docs", "code", fileDir);

  return {
    path: path.join(outputDir, fileName),
    outputDir,
    fileDir,
    fileName
  };
}
