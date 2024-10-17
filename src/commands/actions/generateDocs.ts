import { spinner } from "@clack/prompts";

import {
  needsDocumentation,
  updateMetadata
} from "../../helpers/documentationMetadata.ts";
import { cachedGenerateDoc, smartDocGeneration } from "../../helpers/generateDoc.ts";
import { saveDocForFile } from "../../helpers/saveDocForFile.ts";
import type { TreeItemFlatted } from "../../types/index.ts";

function makeChunks<T>(arr: T[], chunkSize: number): T[][] {
  let matrix: T[][] = [];
  let counter = -1;

  arr.forEach((item, i) => {
    if (i % chunkSize == 0) {
      counter += 1;
      return matrix.push([item]);
    }

    matrix[counter].push(item);
  });

  return matrix;
}

export async function generateDocs(
  flattedTree: TreeItemFlatted[],
  chunkSize: number
) {
  const loading = spinner();

  loading.start("Generating documentation")

  const totalItems = flattedTree.length

  const handleLoading = (i: number, postMessage?: string) => {
    let message = `Documents generated: ${i + 1}/${totalItems}.`

    if(postMessage) {
      message += " " + postMessage;
    }

    loading.stop(message)
  }

  const chunks = makeChunks(flattedTree, chunkSize);

  const fullContextDocGeneration = cachedGenerateDoc(flattedTree);
  const strategyKey = process.env.USE_FULL_CONTEXT ? "Full Context Doc Generation" : "Smart Doc Generation";

  loading.stop("Picked strategy: " + strategyKey);

  loading.start("")
  loading.stop("Parallel Info: Using chunk size of " + chunkSize);

  const strategies = {
    "Full Context Doc Generation": fullContextDocGeneration,
    "Smart Doc Generation": smartDocGeneration
  }

  const docsGenerationStrategy = strategies[strategyKey];

  const recursivePromise = (chunk: TreeItemFlatted[], i: number) => {
    let promise = Promise.all(chunk.map(async item => {
      loading.start("Generating docs for " + item.fullPath);
      if (needsDocumentation(item)) {
        const doc = await docsGenerationStrategy(item);

        await saveDocForFile(item.path, doc);

        updateMetadata(item);

        handleLoading(i, "Succesfully generated doc for " + item.fullPath)
      } else {
        handleLoading(i, "Skipped " + item.fullPath)
      }
    }))

    if (i < chunks.length - 1) {
      return promise.then(() => recursivePromise(chunks[i + 1], i + 1))
    }

    return promise;
  }

  recursivePromise(chunks[0], 0);
}
