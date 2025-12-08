import { readFileSync } from "fs";

export const readCode = (path: string) => {
  const fileContent = readFileSync(path, "utf-8");
  return fileContent;
};