import prisma from "@/db";
import { idApplySchema } from "@/validations/application.schema";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function getApplication(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const applications = await prisma.application.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        location: true,
        status: true,
        apply: {
          where: {
            userCedula: token.cedula,
          },
          select: {
            id: true,
          },
        },
      },
    });
    return NextResponse.json({ applications }, { status: 200 });
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

export async function apply(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const { id } = await req.json();
    const result = idApplySchema.parse({ id });
    const application = await prisma.application.findFirst({
      where: {
        id: result.id,
      },
      select: {
        apply: {
          where: {
            userCedula: token.cedula,
          },
        },
      },
    });
    if (application?.apply.length) {
      return NextResponse.json(
        { error: "Ya has aplicado a esta oferta" },
        { status: 400 }
      );
    }
    await prisma.application.update({
      where: {
        id,
      },
      data: {
        apply: {
          create: {
            userCedula: token.cedula,
          },
        },
      },
    });
    return NextResponse.json({ message: "Solicitud enviada" }, { status: 200 });
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

export async function deleteApply(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const { idAplication, applyId } = await req.json();
    const applicationId = idApplySchema.parse({ id: idAplication });
    const idApply = idApplySchema.parse({ id: applyId });

    const application = await prisma.application.findFirst({
      where: {
        id: applicationId.id,
      },
      select: {
        apply: {
          where: {
            id: idApply.id,
            userCedula: token.cedula,
          },
        },
      },
    });
    if (!application?.apply.length) {
      return NextResponse.json(
        { error: "No has aplicado a esta oferta" },
        { status: 400 }
      );
    }
    await prisma.application.update({
      where: {
        id: applicationId.id,
      },
      data: {
        apply: {
          delete: {
            id: idApply.id,
          },
        },
      },
    });
    return NextResponse.json(
      { message: "Solicitud eliminada" },
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

export async function getMyApplication(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const applications = await prisma.application.findMany({
      where: {
        apply: {
          some: {
            userCedula: token.cedula,
          }
        }
      },
      select: {
        id: true,
        title: true,
        description: true,
        location: true,
        status: true,
        apply: {
          where: {
            userCedula: token.cedula,
          },
          select: {
            id: true,
          },
        },
      },
    });
    return NextResponse.json({ applications }, { status: 200 });
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