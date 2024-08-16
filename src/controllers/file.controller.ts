import prisma from "@/db";
import { fileService } from "@/service/fileupload/fileService";
import { imageFileSchema } from "@/validations/files.schema";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { revalidatePath } from "next/cache";

export async function uploadImagePerfil(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }
    const customDir = `public/uploads/images/${token.role}/`;
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      throw new Error("File not uploaded");
    }
    const result = imageFileSchema.parse(file);

    const customFileName = `${token.role}_${token.cedula}.png`;
    const filedir = await fileService(file, customFileName, customDir);

    const fileUrl = `/uploads/images/${token.role}/${customFileName}`;

    const userImage = await prisma.user.update({
      where: { cedula: token.cedula },
      data: {
        image: fileUrl,
      },
    });

    await revalidatePath(`/estudiante/archivos`);
    return NextResponse.json({
      message: "Imagen cargada exitosamente",
      fileUrl,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    console.error("Error: ", (error as Error).message);
    return NextResponse.json(
      { error: "Error en el servidor." },
      { status: 500 }
    );
  }
}
