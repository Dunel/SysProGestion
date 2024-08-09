import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { ZodError } from "zod";
import { profileSchema } from "@/validations/profile.schema";
import { getToken } from "next-auth/jwt";

export async function ProfileUpdate(req: NextRequest) {
  try {
    const token = getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const {
      nombres,
      apellidos,
      telefono,
      direccion,
      universidad,
      trimestre,
      habilidades,
      intereses,
      descriccion,
    } = await req.json();
    const result = profileSchema.parse({
      cedula: token.cedula,
      nombres,
      apellidos,
      telefono,
      direccion,
      universidad,
      trimestre,
      habilidades,
      intereses,
      descriccion,
    });

    await prisma.estudentInfo.upsert({
      where: { userCedula: result.cedula },
      update: {
        university: result.universidad,
        quarter: result.trimestre,
        skills: result.habilidades,
        interests: result.intereses,
        description: result.descriccion,
        address: result.direccion,
      },
      create: {
        userCedula: result.cedula,
        university: result.universidad,
        quarter: result.trimestre,
        skills: result.habilidades,
        interests: result.intereses,
        description: result.descriccion,
        address: result.direccion,
      },
    });

    await prisma.user.update({
        where: { cedula: result.cedula },
        data: {
            names: result.nombres,
            lastnames: result.apellidos,
            phone: result.telefono,
            profile: true,
        },
    })
    
    return NextResponse.json({ message: "Perfil actualizado" });
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
