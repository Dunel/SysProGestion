import bcrypt from "bcrypt";
import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { userSchema } from "@/validations/user.schema";

export async function createUser(req: NextRequest) {
  try {
    const { idCode, code, data } = await req.json();
    const result = userSchema.parse({ ...data, idCode, code });
    
    const codeFind = await prisma.coderegister.findFirst({
      where: {
        id: result.idCode,
        code: result.code,
      },
    });
    if (!codeFind) {
      return NextResponse.json(
        { error: "Código no valido" },
        { status: 400 }
      );
    }

    const TEN_MINUTES_IN_MS = 10 * 60 * 1000;
    if (
      new Date(codeFind.updatedAt).getTime() + TEN_MINUTES_IN_MS <
      Date.now()
    ) {
      return NextResponse.json(
        { error: "El código ha expirado", step: 0 },
        { status: 400 }
      );
    }

    const userfound = await prisma.user.findFirst({
      where: {
        OR: [
          {
            cedula: result.cedula,
          },
          {
            mail: codeFind.mail,
          },
        ],
      },
    });
    if (userfound) {
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
      },
    });

    return NextResponse.json({ user }, { status: 200 });
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
