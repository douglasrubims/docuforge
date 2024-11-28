import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import type { TreeItemFlatted } from "../types/index.ts";
import { getDocPath } from "./getDocPath.ts";

interface DocumentationMetadata {
  [filePath: string]: {
    hash: string;
  };
}

const metadataFilePath = path.join(process.cwd(), "docs", "metadata.json");

export function loadMetadata(): DocumentationMetadata {
  if (!fs.existsSync(metadataFilePath)) return {};

  const data = fs.readFileSync(metadataFilePath, "utf-8");

  return JSON.parse(data);
}

export function saveMetadata(metadata: DocumentationMetadata): void {
  const dirPath = path.dirname(metadataFilePath);

  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

  fs.writeFileSync(metadataFilePath, JSON.stringify(metadata, null, 2));
}

export function updateMetadata(item: TreeItemFlatted): void {
  const metadata = loadMetadata();

  const content =
    item.type === "file"
      ? fs.readFileSync(item.fullPath, "utf-8")
      : fs.readdirSync(item.fullPath).join(",");

  const hash = crypto.createHash("sha256").update(content).digest("hex");

  metadata[item.path] = { hash };

  saveMetadata(metadata);
}

export function checkForDeletedFiles(): void {
  const metadata = loadMetadata();

  for (const filePath of Object.keys(metadata))
    if (!fs.existsSync(filePath)) deleteDocumentation(filePath);
}

export function deleteDocumentation(filePath: string): void {
  const metadata = loadMetadata();

  const docPath = getDocPath(filePath).path;

  if (fs.existsSync(docPath)) fs.unlinkSync(docPath);

  delete metadata[filePath];

  saveMetadata(metadata);
}

export function needsDocumentation(item: TreeItemFlatted): boolean {
  const metadata = loadMetadata();

  const fileInfo = metadata[item.path];

  if (!fileInfo) return true;

  const content =
    item.type === "file"
      ? fs.readFileSync(item.fullPath, "utf-8")
      : fs.readdirSync(item.fullPath).join(",");

  const currentHash = crypto.createHash("sha256").update(content).digest("hex");

  return currentHash !== fileInfo.hash;
}

export function hasAnyFileChanged(tree: TreeItemFlatted[]): boolean {
  const metadata = loadMetadata();

  for (const item of tree) {
    if (item.type !== "file") continue;

    const fileInfo = metadata[item.path];

    if (!fileInfo) return true;

    const content = fs.readFileSync(item.fullPath, "utf-8");

    const currentHash = crypto
      .createHash("sha256")
      .update(content)
      .digest("hex");

    if (currentHash !== fileInfo.hash) return true;
  }

  return false;
}
