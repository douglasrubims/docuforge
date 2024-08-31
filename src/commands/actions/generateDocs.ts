import { spinner } from "@clack/prompts";
import chalk from "chalk";

import {
  needsDocumentation,
  updateMetadata
} from "../../helpers/documentationMetadata.ts";
import { generateDoc } from "../../helpers/generateDoc.ts";
import { saveDocForFile } from "../../helpers/saveDocForFile.ts";
import type { TreeItemFlatted } from "../../types/index.ts";

export async function generateDocs(flattedTree: TreeItemFlatted[]) {
  const loading = spinner();

  for (const item of flattedTree) {
    if (needsDocumentation(item)) {
      loading.start(`Generating documentation for ${chalk.cyan(item.path)}`);

      const doc = await generateDoc(item, flattedTree);

      await saveDocForFile(item.path, doc);

      updateMetadata(item);

      loading.stop(`Documentation generated for ${chalk.cyan(item.path)}`);
    }
  }
}
