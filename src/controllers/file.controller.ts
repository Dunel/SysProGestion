import prisma from "@/db";
import { imageFileSchema } from "@/validations/files.schema";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/service/firebase/firebase";

export async function uploadImage(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      throw new Error("File not uploaded");
    }
    const result = imageFileSchema.parse(file);

    const fileName = `${token.role}_${token.cedula}.png`;
    const fileRef = ref(storage, `images/${token.role}/` + fileName);
    const uploadFire = await uploadBytes(fileRef, file);
    const fileUrl = await getDownloadURL(uploadFire.ref);

    const userImage = await prisma.user.update({
      where: { cedula: token.cedula },
      data: {
        image: fileUrl,
      },
    });

    return NextResponse.json(
      { message: "Imagen cargada exitosamente", fileUrl },
      { status: 200 }
    );
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
