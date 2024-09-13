import bcrypt from "bcrypt";
import prisma from "@/db";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { userSchema } from "@/validations/user.schema";
import { deleteCode } from "./code.controller";
import { getToken } from "next-auth/jwt";
import { profileSchemaEdit } from "@/validations/profile.schema";

interface DecodedToken {
  codeId: string;
  [key: string]: any;
}

export async function createUser(req: NextRequest) {
  try {
    const { code, data, token } = await req.json();
    const result = userSchema.parse({ ...data, code });

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;
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

    if (error instanceof jwt.JsonWebTokenError) {
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
    const cedula = userSchema.shape.cedula.parse(
      req.nextUrl.searchParams.get("ci")
    );
    const user = await prisma.user.findFirst({
      where: { cedula: cedula, role: "estudiante" },
      select: {
        cedula: true,
        names: true,
        lastnames: true,
        phone: true,
        birthdate: true,
        mail: true,
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
        esInfo: {
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
          },
        },
      },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado." },
        { status: 404 }
      );
    }
    const object = {
      cedula: user.cedula,
      names: user.names,
      lastnames: user.lastnames,
      phone: user.phone,
      address: user.esInfo?.address,
      institution: user.esInfo?.institution,
      career: user.esInfo?.career,
      skills: user.esInfo?.skills,
      interests: user.esInfo?.interests,
      description: user.esInfo?.description,
      curriculum: user.esInfo?.curriculum,
      estadoId: user.estado?.id,
      estado: user.estado?.estado,
      municipioId: user.municipio?.id,
      municipio: user.municipio?.municipio,
      parroquiaId: user.parroquia?.id,
      parroquia: user.parroquia?.parroquia,
      dateStart: user.esInfo?.dateStart,
      dateEnd: user.esInfo?.dateEnd,
      birthdate: user.birthdate,
      mail: user.mail,
    };
    return NextResponse.json(object, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    if (error instanceof jwt.JsonWebTokenError) {
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

export async function updateUser(req: NextRequest) {
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
      institutionId,
      careerId,
      skills,
      interests,
      description,
      dateStart,
      dateEnd,
      estadoId,
      municipioId,
      parroquiaId,
      mail,
      birthdate,
      cedula,
    } = await req.json();
    const result = profileSchemaEdit.parse({
      names,
      lastnames,
      phone,
      address,
      institutionId,
      careerId,
      skills,
      interests,
      description,
      dateStart,
      dateEnd,
      estadoId,
      municipioId,
      parroquiaId,
      mail,
      birthdate,
      cedula,
    });

    const userFound = await prisma.user.findFirst({
      where: { cedula: result.cedula, role: "estudiante" },
    });

    if (!userFound) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    await prisma.estudentInfo.upsert({
      where: { userCedula: result.cedula },
      update: {
        institutionId: result.institutionId,
        careerId: result.careerId,
        skills: result.skills,
        interests: result.interests,
        description: result.description,
        address: result.address,
        dateStart: result.dateStart,
        dateEnd: result.dateEnd,
      },
      create: {
        userCedula: result.cedula,
        institutionId: result.institutionId,
        careerId: result.careerId,
        skills: result.skills,
        interests: result.interests,
        description: result.description,
        address: result.address,
        dateStart: result.dateStart,
        dateEnd: result.dateEnd,
      },
    });

    await prisma.user.update({
      where: { cedula: result.cedula, role: "estudiante" },
      data: {
        names: result.names,
        lastnames: result.lastnames,
        phone: result.phone,
        profile: true,
        estadoId: result.estadoId,
        municipioId: result.municipioId,
        parroquiaId: result.parroquiaId,
        mail: result.mail,
        birthdate: result.birthdate,
      },
    });

    return NextResponse.json(
      { message: "Perfil actualizado" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    if (error instanceof jwt.JsonWebTokenError) {
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

export async function createUserAlcaldia(req: NextRequest) {
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
      institutionId,
      careerId,
      skills,
      interests,
      description,
      dateStart,
      dateEnd,
      estadoId,
      municipioId,
      parroquiaId,
      mail,
      birthdate,
      cedula,
    } = await req.json();
    const result = profileSchemaEdit.parse({
      names,
      lastnames,
      phone,
      address,
      institutionId,
      careerId,
      skills,
      interests,
      description,
      dateStart,
      dateEnd,
      estadoId,
      municipioId,
      parroquiaId,
      mail,
      birthdate,
      cedula,
    });

    const userFound = await prisma.user.findFirst({
      where: {
        OR: [{ cedula: result.cedula }, { mail: result.mail }],
      },
      select: {
        cedula: true,
      },
    });
    if (userFound) {
      return NextResponse.json(
        {
          error:
            result.cedula === userFound.cedula
              ? "La cédula se encuentra registrada."
              : "El correo electronico se encuentra registrado.",
        },
        { status: 401 }
      );
    }

    await prisma.estudentInfo.upsert({
      where: { userCedula: result.cedula },
      update: {
        institutionId: result.institutionId,
        careerId: result.careerId,
        skills: result.skills,
        interests: result.interests,
        description: result.description,
        address: result.address,
        dateStart: result.dateStart,
        dateEnd: result.dateEnd,
      },
      create: {
        userCedula: result.cedula,
        institutionId: result.institutionId,
        careerId: result.careerId,
        skills: result.skills,
        interests: result.interests,
        description: result.description,
        address: result.address,
        dateStart: result.dateStart,
        dateEnd: result.dateEnd,
      },
    });

    await prisma.user.update({
      where: { cedula: result.cedula, role: "estudiante" },
      data: {
        names: result.names,
        lastnames: result.lastnames,
        phone: result.phone,
        profile: true,
        estadoId: result.estadoId,
        municipioId: result.municipioId,
        parroquiaId: result.parroquiaId,
        mail: result.mail,
        birthdate: result.birthdate,
      },
    });

    return NextResponse.json(
      { message: "Perfil actualizado" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    if (error instanceof jwt.JsonWebTokenError) {
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
