import { csvParse } from "d3-dsv";

import { TextLoader } from "./text.js";

export class CSVLoader extends TextLoader {
  constructor(filePath: string) {
    super(filePath);
  }

  protected async parse(raw: string): Promise<string[]> {
    const parsed = csvParse(raw.trim());
    return parsed.map((row) => {
      const validCols: string[] = [];
      for (const col of parsed.columns) {
        if (row[col] !== undefined) {
          validCols.push(`${col}: ${row[col] ?? "undefined"}`);
        }
      }
      return validCols.join("\n");
    });
  }
}
