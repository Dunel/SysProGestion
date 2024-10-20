import { createLog } from "@/controllers/logs.controller";
import prisma from "@/db";
import { idApplySchema } from "@/validations/application.schema";
import { cedulaSchema } from "@/validations/cedula.schema";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {
  try {
    const cedula = req.nextUrl.searchParams.get("cedula");
    const result = cedulaSchema.parse({ cedula });
    const userFound = await prisma.user.findFirst({
      where: {
        cedula: result.cedula,
        role: "estudiante",
      },
      select: {
        cedula: true,
        names: true,
        lastnames: true,
        esInfo: {
          select: {
            career: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    if (!userFound) {
      return NextResponse.json(
        { error: "Usuario no encontrado." },
        { status: 404 }
      );
    }

    const acceptFound = await prisma.applicationApproved.findFirst({
      where: {
        userCedula: result.cedula,
        status: "enproceso",
      },
    });
    if (acceptFound) {
      return NextResponse.json(
        {
          error:
            "El estudiante ya tiene una Pasantía o Servicio Comunitario activo",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(userFound, { status: 200 });
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

const fechaFinalGptWhatever = (
  dateStart: Date | null,
  dateEnd: Date | null
) => {
  const start = dateStart ? new Date(dateStart) : new Date();
  const end = dateEnd ? new Date(dateEnd) : new Date();

  const diffInMs = end.getTime() - start.getTime();

  const weeks = diffInMs / (1000 * 60 * 60 * 24 * 7);

  const totalWeeks = weeks + 2;

  const today = new Date();

  const finalDate = new Date(
    today.getTime() + totalWeeks * 7 * 24 * 60 * 60 * 1000
  );

  return finalDate;
};

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.SECRET });
    if (!token) {
      return NextResponse.json(
        { error: "No autorizado." },
        { status: 401 }
      );
    }
    const { id, cedula } = await req.json();
    const result = cedulaSchema.parse({ cedula });
    const idApp = idApplySchema.shape.idApplication.parse(id);
    const userFound = await prisma.user.findFirst({
      where: {
        cedula: result.cedula,
        role: "estudiante",
      },
      select: {
        names: true,
        lastnames: true,
        esInfo: {
          select: {
            dateEnd: true,
            dateStart: true,
          },
        },
      },
    });
    if (!userFound || !userFound.esInfo) {
      return NextResponse.json(
        { error: "Usuario no encontrado." },
        { status: 404 }
      );
    }

    const acceptFound = await prisma.applicationApproved.findFirst({
      where: {
        userCedula: result.cedula,
        status: "enproceso",
      },
    });
    if (acceptFound) {
      return NextResponse.json(
        {
          error:
            "El estudiante ya tiene una Pasantía o Servicio Comunitario activo",
        },
        { status: 400 }
      );
    }

    await prisma.apply.updateMany({
      where: {
        AND: [
          {
            userCedula: result.cedula,
          },
          {
            NOT: {
              applicationId: idApp,
            },
          },
          {
            NOT: {
              status: "rechazado",
            },
          },
        ],
      },
      data: {
        status: "declinado",
      },
    });

    await prisma.apply.upsert({
      where: {
        userCedula_applicationId: {
          userCedula: result.cedula,
          applicationId: idApp,
        },
      },
      update: {
        status: "aceptado",
        application: {
          update: {
            notification: {
              create: {
                action: "accept",
                User: {
                  connect: {
                    cedula: result.cedula,
                  },
                },
              },
            },
          },
        },
      },
      create: {
        status: "aceptado",
        userCedula: result.cedula,
        applicationId: idApp,
      },
    });

    await prisma.applicationApproved.create({
      data: {
        dateEnd: fechaFinalGptWhatever(
          userFound.esInfo.dateStart,
          userFound.esInfo.dateEnd
        ),
        application: {
          connect: {
            id: idApp,
          },
        },
        esInfo: {
          connect: {
            userCedula: result.cedula,
          },
        },
      },
    });

    createLog(
      token.cedula,
      `Estudiante Agregado a oferta: ${
        userFound.names
      } ${userFound.lastnames} con ID: #${result.cedula}`
    );

    return NextResponse.json(
      { message: "Estudiante agregado correctamente!" },
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

export async function DELETE(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.SECRET });
    if (!token) {
      return NextResponse.json(
        { error: "No autorizado." },
        { status: 401 }
      );
    }
    const { id, cedula } = await req.json();
    const result = cedulaSchema.parse({ cedula });
    const idApp = idApplySchema.shape.idApplication.parse(id);
    const userFound = await prisma.user.findFirst({
      where: {
        cedula: result.cedula,
        role: "estudiante",
      },
    });
    if (!userFound) {
      return NextResponse.json(
        { error: "Usuario no encontrado." },
        { status: 404 }
      );
    }

    const acceptFound = await prisma.applicationApproved.findFirst({
      where: {
        userCedula: result.cedula,
        status: "enproceso",
        applicationId: idApp,
      },
    });
    if (!acceptFound) {
      return NextResponse.json(
        {
          error:
            "El estudiante no tiene una Pasantía o Servicio Comunitario activo con esta oferta.",
        },
        { status: 400 }
      );
    }

    await prisma.apply.delete({
      where: {
        userCedula_applicationId: {
          userCedula: result.cedula,
          applicationId: idApp,
        },
      },
    });

    await prisma.applicationApproved.delete({
      where: {
        id: acceptFound.id,
      },
    });

    createLog(
      token.cedula,
      `Estudiante Eliminado de oferta: ${
        userFound.names
      } ${userFound.lastnames} con ID: #${result.cedula}`
    );

    return NextResponse.json(
      { message: "Estudiante eliminado correctamente!" },
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
