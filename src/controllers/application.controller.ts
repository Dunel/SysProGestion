import prisma from "@/db";
import { applyCreateSchema, applyUpdateSchema, idApplySchema } from "@/validations/application.schema";
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
        type: true,
        description: true,
        skills: true,
        date: true,
        location: true,
        status: true,
        dependencia: {
          select: {
            name: true,
            User: {
              select: {
                image: true,
              },
            },
          },
        },
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
    return NextResponse.json(applications, { status: 200 });
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
    const result = idApplySchema.shape.idApplication.parse(id);
    const application = await prisma.application.findFirst({
      where: {
        id: result,
      },
      select: {
        apply: {
          where: {
            userCedula: token.cedula,
          },
        },
      },
    });
    if (application?.apply.length || !application) {
      return NextResponse.json(
        { error: "Ya has aplicado a esta oferta o no existe" },
        { status: 400 }
      );
    }

    await prisma.application.update({
      where: {
        id: result,
      },
      data: {
        apply: {
          create: {
            userCedula: token.cedula,
          },
        },
        notification: {
          createMany: {
            data: [
              {
                userCedula: token.cedula,
                action: "apply",
              },
            ],
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
    const result = idApplySchema.parse({
      idApplication: idAplication,
      idApply: applyId,
    });

    const application = await prisma.application.findFirst({
      where: {
        id: result.idApplication,
      },
      select: {
        apply: {
          where: {
            id: result.idApply,
            userCedula: token.cedula,
          },
        },
      },
    });
    if (!application || !application?.apply.length) {
      return NextResponse.json(
        { error: "No has aplicado a esta oferta" },
        { status: 400 }
      );
    }
    await prisma.application.update({
      where: {
        id: result.idApplication,
      },
      data: {
        apply: {
          delete: {
            id: result.idApply,
          },
        },
        notification: {
          createMany: {
            data: [
              {
                userCedula: token.cedula,
                action: "delete",
              },
            ],
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
          },
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        location: true,
        status: true,
        imagen: true,
        type: true,
        skills: true,
        date: true,
        dependencia: {
          select: {
            name: true,
            User: {
              select: {
                image: true,
              },
            },
          },
        },
        apply: {
          where: {
            userCedula: token.cedula,
          },
          select: {
            id: true,
            status: true,
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

export async function getMyApplicationDepend(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const applications = await prisma.application.findMany({
      where: {
        dependencia: {
          userCedula: {
            equals: token.cedula,
          },
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        location: true,
        status: true,
        imagen: true,
        type: true,
        skills: true,
        date: true,
        dependencia: {
          select: {
            name: true,
            User: {
              select: {
                image: true,
              },
            },
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

export async function deleteApplicationDepend(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const { id } = await req.json();
    const result = idApplySchema.shape.idApplication.parse(id);
    const application = await prisma.application.findFirst({
      where: {
        id: result,
        dependencia: {
          userCedula: token.cedula,
        },
      },
    });
    if (!application) {
      return NextResponse.json(
        { error: "No tienes permisos para eliminar esta oferta" },
        { status: 400 }
      );
    }

    await prisma.application.delete({
      where: {
        id: result,
      },
    });
    return NextResponse.json({ message: "Oferta eliminada" }, { status: 200 });
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

export async function getApplicationById(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const result = idApplySchema.shape.idApplication.parse(
      req.nextUrl.searchParams.get("id")
    );
    const application = await prisma.application.findFirst({
      where: {
        id: result,
        dependencia: {
          userCedula: token.cedula,
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        location: true,
        status: true,
        type: true,
        skills: true,
        date: true,
      },
    });
    if (!application) {
      return NextResponse.json(
        { error: "No se encontró la oferta" },
        { status: 404 }
      );
    }
    return NextResponse.json(application, { status: 200 });
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

export async function updateApplicationById(req: NextRequest){
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const result = applyUpdateSchema.parse(await req.json());
    const { id, title, description, location, type, skills, status } = result;
    const application = await prisma.application.findFirst({
      where: {
        id,
        dependencia: {
          userCedula: token.cedula,
        },
      },
    });
    if (!application) {
      return NextResponse.json(
        { error: "No se encontró la oferta" },
        { status: 404 }
      );
    }
    await prisma.application.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        location,
        type,
        skills,
        status,
      },
    });
    return NextResponse.json({ message: "Oferta actualizada" }, { status: 200 });
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

export async function createAppDepend(req: NextRequest){
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const result = applyCreateSchema.parse(await req.json());
    const { title, description, location, type, skills, status } = result;
    await prisma.application.create({
      data: {
        title,
        description,
        location,
        type,
        skills,
        status,
        dependencia: {
          connect: {
            userCedula: token.cedula,
          },
        },
      },
    });
    return NextResponse.json({ message: "Oferta creada" }, { status: 200 });
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