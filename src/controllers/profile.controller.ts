import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { ZodError } from "zod";
import { profileSchema } from "@/validations/profile.schema";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";

export async function ProfileUpdate(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const {
      names,
      lastnames,
      phone,
      address,
      university,
      quarter,
      skills,
      interests,
      description,
    } = await req.json();
    const result = profileSchema.parse({
      names,
      lastnames,
      phone,
      address,
      university,
      quarter,
      skills,
      interests,
      description,
    });
    const cedula = parseInt(token.cedula);

    await prisma.estudentInfo.upsert({
      where: { userCedula: cedula },
      update: {
        university: result.university,
        quarter: result.quarter,
        skills: result.skills,
        interests: result.interests,
        description: result.description,
        address: result.address,
      },
      create: {
        userCedula: cedula,
        university: result.university,
        quarter: result.quarter,
        skills: result.skills,
        interests: result.interests,
        description: result.description,
        address: result.address,
      },
    });

    await prisma.user.update({
      where: { cedula },
      data: {
        names: result.names,
        lastnames: result.lastnames,
        phone: result.phone,
        profile: true,
      },
    });

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
