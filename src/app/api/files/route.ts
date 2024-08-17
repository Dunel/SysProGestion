import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import fs, { promises as fsPromises } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }
    const customDir = `public/uploads/images/`;
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      throw new Error("File not uploaded");
    }
    //const result = imageFileSchema.parse(file);

    const customFileName = `${token.role}_${token.cedula}.png`;
    const uploadDir = path.resolve(process.cwd(), customDir);

    if (!fs.existsSync(uploadDir)) {
      await fsPromises.mkdir(uploadDir, { recursive: true });
    }

    if (!file) {
      throw new Error("File not uploaded");
    }

    const filePath = path.join(uploadDir, customFileName);

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await fsPromises.writeFile(filePath, fileBuffer);

    const fileUrl = "/uploads/images/" + customFileName;
    return NextResponse.json({ message: "prueba", fileUrl }, { status: 200 });
  } catch (error) {
    console.error("Error: ", (error as Error).message);
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}
