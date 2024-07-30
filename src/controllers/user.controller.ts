import bcrypt from "bcrypt";
import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { userSchema } from "@/validations/user.schema";
import { validCodeMail } from "@/controllers/code.controller";

interface User {
  mail: string;
  cedula: number;
  password: string;
  nombre: string;
  apellido: string;
  telefono: string;
}

export async function createUser(req: NextRequest) {
  try {
    const { idCode, code, data } = await req.json();
    const result = userSchema.parse({ ...data, idCode, code });
    const mail = await validCodeMail(result.code, result.idCode);

    const userfound = await prisma.user.findFirst({
      where: {
        OR: [
          {
            cedula: result.cedula,
          },
          {
            mail: mail,
          },
        ],
      },
    });
    if (userfound) {
      throw new Error("Usuario ya registrado");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        mail: data.mail,
        cedula: data.cedula,
        password: hashedPassword,
        names: data.nombre,
        lastnames: data.apellido,
        phone: data.telefono,
      },
    });

    //const user = await createUser({data:{ ...result, mail }});

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    //console.error("Error al enviar el correo:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
