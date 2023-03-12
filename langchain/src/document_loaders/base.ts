import {
  RecursiveCharacterTextSplitter,
  TextSplitter,
} from "../text_splitter.js";
import { Document } from "../document.js";

export interface DocumentLoader {
  load(buffer?: Buffer, fileMetadata?: object): Promise<Document[]>;
  loadAndSplit(
    buffer: Buffer,
    fileMetadata?: object,
    textSplitter?: TextSplitter
  ): Promise<Document[]>;
}

export abstract class BaseDocumentLoader implements DocumentLoader {
  abstract load(buffer?: Buffer, fileMetadata?: object): Promise<Document[]>;

  async loadAndSplit(
    buffer?: Buffer,
    fileMetadata?: object,
    splitter: TextSplitter = new RecursiveCharacterTextSplitter()
  ): Promise<Document[]> {
    const docs = await this.load(buffer, fileMetadata);
    return splitter.splitDocuments(docs);
  }
}
