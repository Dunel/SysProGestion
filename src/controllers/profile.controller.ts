import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { ZodError } from "zod";
import { profileDepenSchema, profileSchema } from "@/validations/profile.schema";
import { getToken } from "next-auth/jwt";

export async function ProfileEstudentUpdate(req: NextRequest) {
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
      skills,
      interests,
      description,
      dateStart,
      dateEnd,
    } = await req.json();

    const result = profileSchema.parse({
      names,
      lastnames,
      phone,
      address,
      university,
      career,
      skills,
      interests,
      description,
      dateStart,
      dateEnd,
    });
    const cedula = token.cedula;

    await prisma.estudentInfo.upsert({
      where: { userCedula: cedula },
      update: {
        university: result.university,
        career: result.career,
        skills: result.skills,
        interests: result.interests,
        description: result.description,
        address: result.address,
      },
      create: {
        userCedula: cedula,
        university: result.university,
        career: result.career,
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

export async function ProfileDependenciaUpdate(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const {
      name,
      names,
      lastnames,
      phone,
      address,
      description,
      email,
      social,
      rif
    } = await req.json();

    const result = profileDepenSchema.parse({
      name,
      names,
      lastnames,
      phone,
      address,
      description,
      email,
      social,
      rif,
    });
    const cedula = token.cedula;

    await prisma.dependenciaInfo.upsert({
      where: { userCedula: cedula },
      update: {
        name: result.name,
        description: result.description,
        address: result.address,
        phone: result.phone,
        email: result.email,
        social: result.social,
        rif: result.rif,
      },
      create: {
        userCedula: cedula,
        name: result.name,
        description: result.description,
        address: result.address,
        phone: result.phone,
        email: result.email,
        social: result.social,
        rif: result.rif,
      },
    });

    await prisma.user.update({
      where: { cedula },
      data: {
        names: result.names,
        lastnames: result.lastnames,
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

export async function ProfileEstudentGet(req: NextRequest) {
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
        skills: true,
        interests: true,
        dateStart: true,
        dateEnd: true,
        description: true,
        address: true,
        curriculum: true,
        User:{
          select:{
            names: true,
            lastnames: true,
            phone: true,
            estadoId: true,
            municipioId: true,
            parroquiaId: true,
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
      skills: profile?.skills,
      interests: profile?.interests,
      description: profile?.description,
      curriculum: profile?.curriculum,
      estadoId: profile?.User.estadoId,
      municipioId: profile?.User.municipioId,
      parroquiaId: profile?.User.parroquiaId
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

export async function ProfileDepenGet(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const cedula = token.cedula;
    const profile = await prisma.dependenciaInfo.findFirst({
      where: { userCedula: cedula },
      select: {
        name: true,
        description: true,
        address: true,
        phone: true,
        email: true,
        social: true,
        rif: true,
        User:{
          select:{
            names: true,
            lastnames: true,
          }
        }
      },
    });
    const object = {
      name: profile?.name,
      names: profile?.User.names,
      lastnames: profile?.User.lastnames,
      phone: profile?.phone,
      address: profile?.address,
      description: profile?.description,
      email: profile?.email,
      social: profile?.social,
      rif: profile?.rif,
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