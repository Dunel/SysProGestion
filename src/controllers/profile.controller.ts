import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { ZodError } from "zod";
import { profileSchema } from "@/validations/profile.schema";
import { getToken } from "next-auth/jwt";

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
      career,
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
      career,
      quarter,
      skills,
      interests,
      description,
    });
    const cedula = token.cedula;

    await prisma.estudentInfo.upsert({
      where: { userCedula: cedula },
      update: {
        university: result.university,
        career: result.career,
        quarter: result.quarter,
        skills: result.skills,
        interests: result.interests,
        description: result.description,
        address: result.address,
      },
      create: {
        userCedula: cedula,
        university: result.university,
        career: result.career,
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

    return NextResponse.json({ message: "Perfil actualizado" }, { status: 200 });
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

export async function ProfileGet(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const cedula = token.cedula;
    const profile = await prisma.estudentInfo.findFirst({
      where: { userCedula: cedula },
      select: {
        university: true,
        career: true,
        quarter: true,
        skills: true,
        interests: true,
        description: true,
        address: true,
        curriculum: true,
        User:{
          select:{
            names: true,
            lastnames: true,
            phone: true,
          }
        }
      },
    });
    const object = {
      names: profile?.User.names,
      lastnames: profile?.User.lastnames,
      phone: profile?.User.phone,
      address: profile?.address,
      university: profile?.university,
      career: profile?.career,
      quarter: profile?.quarter,
      skills: profile?.skills,
      interests: profile?.interests,
      description: profile?.description,
      curriculum: profile?.curriculum,
    };
    return NextResponse.json({ object }, { status: 200 });
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
