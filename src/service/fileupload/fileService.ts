import fs, { promises as fsPromises } from "fs";
import path from "path";

export const fileService = async (
  file: File,
  customFileName: string,
  dirName: string
) => {
  try {
    const uploadDir = path.resolve(process.cwd(), dirName);

    if (!fs.existsSync(uploadDir)) {
      await fsPromises.mkdir(uploadDir, { recursive: true });
    }

    if (!file) {
      throw new Error("File not uploaded");
    }

    const filePath = path.join(uploadDir, customFileName);

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await fsPromises.writeFile(filePath, fileBuffer);

    const fileUrl = dirName + customFileName;
    return fileUrl;
  } catch (error) {
    console.error("Error: ", (error as Error).message);
    throw new Error("Error en el servidor.");
  }
};
