import { Embeddings } from "../embeddings/base.js";
import { Document } from "../document.js";

export abstract class VectorStore {
  embeddings: Embeddings;

  constructor(embeddings: Embeddings) {
    this.embeddings = embeddings;
  }

  abstract addVectors(
    vectors: number[][],
    documents: Document[]
  ): Promise<void | string[]>;

  abstract addDocuments(documents: Document[]): Promise<void | string[]>;

  abstract similaritySearchVectorWithScore(
    query: number[],
    k: number
  ): Promise<[Document, number][]>;

  async similaritySearch(query: string, k = 4): Promise<Document[]> {
    const results = await this.similaritySearchVectorWithScore(
      await this.embeddings.embedQuery(query),
      k
    );

    return results.map((result) => result[0]);
  }

  async similaritySearchWithScore(
    query: string,
    k = 4
  ): Promise<[object, number][]> {
    return this.similaritySearchVectorWithScore(
      await this.embeddings.embedQuery(query),
      k
    );
  }

  static fromTexts(
    _texts: string[],
    _metadatas: object[],
    _embeddings: Embeddings,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _dbConfig: Record<string, any>
  ): Promise<VectorStore> {
    throw new Error(
      "the Langchain vectorstore implementation you are using forgot to override this, please report a bug"
    );
  }
}

export abstract class SaveableVectorStore extends VectorStore {
  abstract save(directory: string): Promise<void>;

  static load(
    _directory: string,
    _embeddings: Embeddings
  ): Promise<SaveableVectorStore> {
    throw new Error("Not implemented");
  }
}
