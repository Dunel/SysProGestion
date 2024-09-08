import bcrypt from "bcrypt";
import prisma from "@/db";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { userSchema } from "@/validations/user.schema";
import { deleteCode } from "./code.controller";

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
