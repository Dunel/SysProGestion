import prisma from "@/db";
import {
  fullSchema,
  idSchema,
  preRegisterSchema,
} from "@/validations/preregister.schema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const { mail, cedula } = await req.json();
    const result = preRegisterSchema.parse({ mail, cedula });

    const preRegisterFind = await prisma.preRegister.findFirst({
      where: {
        OR: [
          {
            mail: {
              equals: result.mail,
              mode: "insensitive",
            },
          },
          {
            cedula: result.cedula,
          },
        ],
      },
    });
    if (preRegisterFind) {
      return NextResponse.json(
        {
          error: `Est${
            preRegisterFind.cedula === result.cedula ? "a cedula" : "e correo"
          } se encuentra en el Pre-registro.`,
        },
        { status: 400 }
      );
    }

    await prisma.preRegister.create({
      data: {
        mail: result.mail,
        cedula: result.cedula,
      },
    });

    return NextResponse.json({ message: "Pre-registro creado con exito." });
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

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    const result = idSchema.parse({ id });
    const preRegisterFind = await prisma.preRegister.findFirst({
      where: {
        id: result.id,
      },
    });
    if (!preRegisterFind) {
      return NextResponse.json(
        { error: "Pre-registro no encontrado." },
        { status: 404 }
      );
    }

    await prisma.preRegister.delete({
      where: {
        id: result.id,
      },
    });

    return NextResponse.json({ message: "Pre-registro eliminado con exito." });
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

export async function GET(req: NextRequest) {
  try {
    const preRegisters = await prisma.preRegister.findMany({
      select: {
        id: true,
        mail: true,
        cedula: true,
      },
    });

    return NextResponse.json(preRegisters, { status: 200 });
  } catch (error) {
    console.error("Error: ", (error as Error).message);
    return NextResponse.json(
      { error: "Error en el servidor." },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { mail, id, cedula } = await req.json();
    const result = fullSchema.parse({ mail, id, cedula });

    const preRegisterFind = await prisma.preRegister.findFirst({
      where: {
        id: result.id,
      },
    });
    if (!preRegisterFind) {
      return NextResponse.json(
        { error: "Preregistro no encontrado." },
        { status: 404 }
      );
    }

    const userFound = await prisma.preRegister.findFirst({
      where: {
        OR: [{ cedula: result.cedula }, { mail: result.mail }],
        NOT: {
          id: result.id,
        },
      },
    });
    if (userFound) {
      return NextResponse.json(
        {
          error: `${
            userFound.mail === result.mail ? "El correo" : "La cedula"
          } se encuentra en el registro.`,
        },
        { status: 400 }
      );
    }

    await prisma.preRegister.update({
      where: {
        id: result.id,
      },
      data: {
        cedula: result.cedula,
        mail: result.mail,
      },
    });

    return NextResponse.json(
      {
        message: "Pre-registro actualizado con exito.",
      },
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