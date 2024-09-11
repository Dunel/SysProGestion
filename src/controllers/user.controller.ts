import bcrypt from "bcrypt";
import prisma from "@/db";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { userSchema } from "@/validations/user.schema";
import { deleteCode } from "./code.controller";
import { getToken } from "next-auth/jwt";

interface DecodedToken {
  codeId: string;
  [key: string]: any;
}

export async function createUser(req: NextRequest) {
  try {
    const { code, data, token } = await req.json();
    const result = userSchema.parse({ ...data, code });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    if (!decoded) {
      return NextResponse.json(
        { error: "Acceso no autorizado", step: 0 },
        { status: 400 }
      );
    }

    const codeFind = await prisma.coderegister.findFirst({
      where: {
        id: decoded.codeId,
        code: result.code,
      },
    });
    if (!codeFind) {
      return NextResponse.json({ error: "Código no valido" }, { status: 400 });
    }

    const TEN_MINUTES_IN_MS = 10 * 60 * 1000;
    if (
      new Date(codeFind.updatedAt).getTime() + TEN_MINUTES_IN_MS <
      Date.now()
    ) {
      return NextResponse.json(
        { error: "El registro ha expirado", step: 0 },
        { status: 400 }
      );
    }

    const userFound = await prisma.user.findFirst({
      where: {
        OR: [
          {
            cedula: result.cedula,
          },
          {
            mail: {
              equals: codeFind.mail,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    if (userFound) {
      return NextResponse.json(
        { error: "El usuario se encuentra registrado" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(result.password, 10);

    const user = await prisma.user.create({
      data: {
        mail: codeFind.mail,
        cedula: result.cedula,
        password: hashedPassword,
        names: result.nombre,
        lastnames: result.apellido,
        phone: result.telefono,
        birthdate: result.birthdate,
        role: decoded.role,
      },
    });

    await deleteCode(codeFind.mail);

    return NextResponse.json({ message: "Registro exitoso" }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    if(error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { error: "El registro ha expirado", step: 0 },
        { status: 401 }
      );
    }

    console.error("Error: ", (error as Error).message);
    return NextResponse.json(
      { error: "Error en el servidor." },
      { status: 500 }
    );
  }
}

export async function getUser(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const cedula = userSchema.shape.cedula.parse(req.nextUrl.searchParams.get("ci"))
    const profile = await prisma.estudentInfo.findFirst({
      where: { userCedula: cedula },
      select: {
        institution: {
          select: {
            id: true,
            institutionCode: true,
            name: true,
          },
        },
        career: {
          select: {
            id: true,
            careerCode: true,
            name: true,
          },
        },
        skills: true,
        interests: true,
        dateStart: true,
        dateEnd: true,
        description: true,
        address: true,
        curriculum: true,
        User: {
          select: {
            names: true,
            lastnames: true,
            phone: true,
            birthdate: true,
            estado: {
              select: {
                id: true,
                estado: true,
              },
            },
            municipio: {
              select: {
                id: true,
                municipio: true,
              },
            },
            parroquia: {
              select: {
                id: true,
                parroquia: true,
              },
            },
          },
        },
      },
    });
    const object = {
      names: profile?.User.names,
      lastnames: profile?.User.lastnames,
      phone: profile?.User.phone,
      address: profile?.address,
      institution: profile?.institution,
      career: profile?.career,
      skills: profile?.skills,
      interests: profile?.interests,
      description: profile?.description,
      curriculum: profile?.curriculum,
      estadoId: profile?.User.estado?.id,
      estado: profile?.User.estado?.estado,
      municipioId: profile?.User.municipio?.id,
      municipio: profile?.User.municipio?.municipio,
      parroquiaId: profile?.User.parroquia?.id,
      parroquia: profile?.User.parroquia?.parroquia,
      dateStart: profile?.dateStart,
      dateEnd: profile?.dateEnd,
      birthdate: profile?.User.birthdate,
    };
    return NextResponse.json({ object }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    if(error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { error: "El registro ha expirado", step: 0 },
        { status: 401 }
      );
    }

    console.error("Error: ", (error as Error).message);
    return NextResponse.json(
      { error: "Error en el servidor." },
      { status: 500 }
    );
  }
}