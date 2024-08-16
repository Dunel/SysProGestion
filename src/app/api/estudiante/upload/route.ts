import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/service/firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getToken } from "next-auth/jwt";
import prisma from "@/db";

export async function POST(req: NextRequest) {
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
    const fileName = `${token.role}_${token.cedula}.png`;
    const fileRef = ref(storage, `images/${token.role}/` + fileName);
    const uploadFire = await uploadBytes(fileRef, file);
    const fileUrl = await getDownloadURL(uploadFire.ref);
    console.log("fileUrl: ", fileUrl);

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
    console.error("Error: ", (error as Error).message);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
