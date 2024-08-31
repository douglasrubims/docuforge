import fs from "node:fs";
import path from "node:path";
import type { TreeItemFlatted } from "../types/index.ts";

interface DocumentationMetadata {
  [filePath: string]: {
    lastDocumented: number;
    lastModified: number;
  };
}

const metadataFilePath = path.join(process.cwd(), "docs", "metadata.json");

export function loadMetadata(): DocumentationMetadata {
  if (fs.existsSync(metadataFilePath)) {
    const data = fs.readFileSync(metadataFilePath, "utf-8");

    return JSON.parse(data);
  }

  return {};
}

export function saveMetadata(metadata: DocumentationMetadata): void {
  const dirPath = path.dirname(metadataFilePath);

  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

  fs.writeFileSync(metadataFilePath, JSON.stringify(metadata, null, 2));
}

export function updateMetadata(item: TreeItemFlatted): void {
  const metadata = loadMetadata();

  metadata[item.path] = {
    lastDocumented: Date.now(),
    lastModified: fs.statSync(item.fullPath).mtimeMs
  };

  saveMetadata(metadata);
}

export function needsDocumentation(item: TreeItemFlatted): boolean {
  const metadata = loadMetadata();

  const fileInfo = metadata[item.path];

  if (!fileInfo) return true;

  const currentModifiedTime = fs.statSync(item.fullPath).mtimeMs;

  return currentModifiedTime > fileInfo.lastModified;
}

export function hasAnyFileChanged(tree: TreeItemFlatted[]): boolean {
  const metadata = loadMetadata();

  for (const item of tree) {
    if (item.type !== "file") continue;

    const fileInfo = metadata[item.path];

    if (!fileInfo) return true;

    const currentModifiedTime = fs.statSync(item.fullPath).mtimeMs;

    if (currentModifiedTime > fileInfo.lastModified) return true;
  }

  return false;
}
