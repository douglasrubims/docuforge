import { spinner } from "@clack/prompts";

import {
  needsDocumentation,
  updateMetadata
} from "../../helpers/documentationMetadata.ts";
import { generateDoc } from "../../helpers/generateDoc.ts";
import { saveDocForFile } from "../../helpers/saveDocForFile.ts";
import type { TreeItemFlatted } from "../../types/index.ts";

export async function generateDocs(
  flattedTree: TreeItemFlatted[],
  chunkSize: number
) {
  const loading = spinner();

  let chunkIndex = 0;

  while (chunkIndex < flattedTree.length) {
    loading.start("Generating documentation");
    await Promise.all(
      flattedTree.slice(chunkIndex, chunkIndex + chunkSize).map(async item => {
        if (needsDocumentation(item)) {
          const doc = await generateDoc(item, flattedTree);

          await saveDocForFile(item.path, doc);

          updateMetadata(item);
        }
      })
    );
    chunkIndex += chunkSize;
    loading.stop(
      `Documents generated: ${chunkIndex > flattedTree.length ? flattedTree.length : chunkIndex}/${flattedTree.length}`
    );
  }
}
