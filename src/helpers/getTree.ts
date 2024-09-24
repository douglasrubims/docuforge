import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { log, spinner } from "@clack/prompts";
import chalk from "chalk";

import type { TreeItem } from "../types/index.ts";
import { hasAnyFileChanged } from "./documentationMetadata.ts";
import { flattenTree } from "./flattenTree.ts";
import { shouldIgnore } from "./shouldIgnore.ts";

export async function getTree(dirPath: string) {
  const loading = spinner();

  loading.start(
    `Analyzing the file and directory tree of ${chalk.cyan(dirPath)}`
  );

  const { tree, ignored } = await getTreeFromDirPath(dirPath);

  const flattedTree = flattenTree(tree);

  if (!hasAnyFileChanged(flattedTree)) {
    loading.stop("No files were changed, no need to generate documentation");

    process.exit(0);
  }

  loading.stop(`Analysis completed for ${chalk.cyan(dirPath)}`);

  log.message(
    `${chalk.cyan(flattedTree.length)} files/directories found\n${chalk.red(
      ignored.length
    )} files/directories ignored\n${chalk.green(
      flattedTree.length - ignored.length
    )} documents to be generated`
  );

  return { items: tree, flattedTree };
}

async function getTreeFromDirPath(dirPath: string, currentPath = "") {
  const tree: TreeItem[] = [];
  const ignored = [];

  const list = await readdir(dirPath);

  const promises = list.map(async file => {
    const filePath = path.join(dirPath, file);
    const relativePath = path.join(currentPath, file);
    const stats = await stat(filePath);

    const isIgnored = shouldIgnore(relativePath);
    const isDirectory = stats.isDirectory();

    if (isIgnored) return ignored.push(relativePath);

    const item: TreeItem = {
      type: isDirectory ? "directory" : "file",
      name: file,
      path: relativePath,
      fullPath: path.resolve(filePath),
      children: isDirectory
        ? (await getTreeFromDirPath(filePath, relativePath)).tree
        : undefined
    };

    tree.push(item);
  });

  await Promise.all(promises);

  return { tree, ignored };
}
