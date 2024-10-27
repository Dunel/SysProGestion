import prisma from "@/db";
import { imageFileSchema, pdfFileSchema } from "@/validations/files.schema";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/service/firebase/firebase";
import { supabase } from "@/service/supabase/client";

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
    const filePath = `images/${token.role}/${fileName}`;

    await supabase.storage.from("sysprogestion").remove([filePath]);

    const { data, error } = await supabase.storage
      .from("sysprogestion")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading to Supabase: ", error.message);
      throw new Error("Error uploading file to Supabase.");
    }

    const { data: publicUrlData } = supabase.storage
      .from("sysprogestion")
      .getPublicUrl(filePath);

    const fileUrl = publicUrlData.publicUrl;

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

export async function uploadPdf(req: NextRequest) {
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

    pdfFileSchema.parse(file);

    const fileName = `${token.role}_${token.cedula}.pdf`;
    const filePath = `curriculum/${token.role}/${fileName}`;

    await supabase.storage.from("sysprogestion").remove([filePath]);

    const { data, error } = await supabase.storage
      .from("sysprogestion")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading to Supabase: ", error.message);
      throw new Error("Error uploading file to Supabase.");
    }

    const { data: publicUrlData } = supabase.storage
      .from("sysprogestion")
      .getPublicUrl(filePath);

    const fileUrl = publicUrlData.publicUrl;

    await prisma.estudentInfo.update({
      where: { userCedula: token.cedula },
      data: {
        curriculum: fileUrl,
      },
    });

    return NextResponse.json(
      { message: "Archivo cargado exitosamente", fileUrl },
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

export async function uploadTest(req: NextRequest) {
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
    const filePath = `images/${token.role}/${fileName}`;

    await supabase.storage.from("sysprogestion").remove([filePath]);

    const { data, error } = await supabase.storage
      .from("sysprogestion")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading to Supabase: ", error.message);
      throw new Error("Error uploading file to Supabase.");
    }

    const { data: publicUrlData } = supabase.storage
      .from("sysprogestion")
      .getPublicUrl(filePath);

    const fileUrl = publicUrlData.publicUrl;

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
