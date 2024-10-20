import prisma from "@/db";
import {
  applyCreateAlcaldiaSchema,
  applyCreateSchema,
  applyUpdateSchema,
  idApplySchema,
} from "@/validations/application.schema";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { createLog } from "./logs.controller";

export async function getApplication(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const applications = await prisma.application.findMany({
      where: {
        NOT: {
          status: "closed",
        },
      },
      select: {
        id: true,
        title: true,
        type: true,
        description: true,
        skills: true,
        date: true,
        pay: true,
        tutor: true,
        location: true,
        status: true,
        dependencia: {
          select: {
            name: true,
            User: {
              select: {
                image: true,
                parroquia: {
                  select: {
                    parroquia: true,
                    municipio: {
                      select: {
                        municipio: true,
                      },
                    },
                  },
                },
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
        _count: {
          select: {
            apply: true,
          },
        },
      },
    });

    const applicationsApproved = await prisma.applicationApproved.count({
      where: {
        userCedula: token.cedula,
        status: "enproceso",
      },
    });

    return NextResponse.json(
      { applications, btn: applicationsApproved },
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
        status: true,
      },
    });
    if (!application || application?.apply?.length > 0) {
      return NextResponse.json(
        { error: "Ya has aplicado a esta oferta o no existe" },
        { status: 400 }
      );
    }
    if (application.status === "closed") {
      return NextResponse.json(
        { error: "La oferta ya está cerrada" },
        { status: 400 }
      );
    }

    const appProccessing = await prisma.applicationApproved.findFirst({
      where: {
        userCedula: token.cedula,
        status: "enproceso",
      },
    });
    if (appProccessing) {
      return NextResponse.json(
        { error: "Tienes un aplicación activa" },
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
          create: {
            userCedula: token.cedula,
            action: "apply",
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

export async function declineApply(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const { idAplication, applyId } = await req.json();
    const idapp = idApplySchema.shape.idApplication.parse(idAplication);
    const idApply = idApplySchema.shape.idApply.parse(applyId);

    const application = await prisma.application.findFirst({
      where: {
        id: idapp,
      },
      select: {
        apply: {
          where: {
            id: idApply,
            userCedula: token.cedula,
            OR: [
              {
                status: "pendiente",
              },
              {
                status: "aprobado",
              },
            ],
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
        id: idapp,
      },
      data: {
        apply: {
          update: {
            where: {
              id: idApply,
            },
            data: {
              status: "declinado",
            },
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
        pay: true,
        tutor: true,
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
                parroquia: {
                  select: {
                    parroquia: true,
                    municipio: {
                      select: {
                        municipio: true,
                      },
                    },
                  },
                },
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
        _count: {
          select: {
            apply: true,
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
          userCedula: token.cedula,
        },
      },
      orderBy: {
        date: "desc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        pay: true,
        tutor: true,
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
            status: "pendiente",
          },
        },
        _count: {
          select: {
            apply: true,
            applicationApproved: true,
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
    if (application.status === "closed") {
      return NextResponse.json(
        { error: "No puedes eliminar una oferta cerrada" },
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
        NOT: {
          status: "closed",
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        pay: true,
        location: true,
        status: true,
        type: true,
        skills: true,
        date: true,
        tutor: true,
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

export async function updateApplicationById(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const result = applyUpdateSchema.parse(await req.json());
    const {
      id,
      title,
      description,
      pay,
      location,
      type,
      skills,
      status,
      tutor,
    } = result;
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
    if (application.status === "closed") {
      return NextResponse.json(
        { error: "No puedes actualizar una oferta cerrada" },
        { status: 400 }
      );
    }

    await prisma.application.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        pay,
        tutor,
        location,
        type,
        skills,
        status,
        notification: {
          create: {
            action: "update",
            userCedula: token.cedula,
          },
        },
      },
    });
    return NextResponse.json(
      { message: "Oferta actualizada" },
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

export async function createAppDepend(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const result = applyCreateSchema.parse(await req.json());
    const { title, description, location, type, skills, status, pay, tutor } =
      result;
    await prisma.application.create({
      data: {
        title,
        description,
        location,
        type,
        skills,
        status,
        pay,
        tutor,
        dependencia: {
          connect: {
            userCedula: token.cedula,
          },
        },
        notification: {
          create: {
            action: "create",
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

export async function getApplicationDepend(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const result = idApplySchema.shape.idApplication.parse(
      req.nextUrl.searchParams.get("id")
    );
    const applications = await prisma.application.findFirst({
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
        pay: true,
        tutor: true,
        location: true,
        status: true,
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
          select: {
            id: true,
            status: true,
            User: {
              select: {
                cedula: true,
                names: true,
                lastnames: true,
                mail: true,
                birthdate: true,
                phone: true,
                image: true,
                parroquia: {
                  select: {
                    parroquia: true,
                  },
                },
                esInfo: {
                  select: {
                    institution: {
                      select: {
                        institutionCode: true,
                        name: true,
                      },
                    },
                    career: {
                      select: {
                        careerCode: true,
                        name: true,
                      },
                    },
                    address: true,
                    skills: true,
                    interests: true,
                    description: true,
                    curriculum: true,
                    bankName: true,
                    bankAccount: true,
                  },
                },
              },
            },
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

export async function updateApplyDepend(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const { id, status } = await req.json();
    const idApply = idApplySchema.shape.idApply.parse(id);
    const statusApply = idApplySchema.shape.status.parse(status);
    const apply = await prisma.apply.findFirst({
      where: {
        id: idApply,
        status: "pendiente",
        application: {
          dependencia: {
            userCedula: token.cedula,
          },
        },
      },
    });
    if (!apply) {
      return NextResponse.json(
        { error: "No se encontró la postulación" },
        { status: 404 }
      );
    }

    await prisma.apply.update({
      where: {
        id: idApply,
        application: {
          dependencia: {
            userCedula: token.cedula,
          },
        },
      },
      data: {
        status: statusApply,
        User: {
          update: {
            notification: {
              create: {
                action: statusApply === "aprobado" ? "approve" : "reject",
                application: {
                  connect: {
                    id: apply.applicationId,
                  },
                },
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Postulacion actualizada" },
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

export async function closedAppDependencia(req: NextRequest) {
  try {
    const { id } = await req.json();
    const result = idApplySchema.shape.idApplication.parse(id);
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const application = await prisma.application.findFirst({
      where: {
        id: result,
        dependencia: {
          userCedula: token.cedula,
        },
      },
      include: {
        _count: {
          select: {
            applicationApproved: true,
          },
        },
      },
    });
    if (!application || application._count.applicationApproved === 0) {
      return NextResponse.json(
        { error: "No tienes permisos para cerrar esta oferta" },
        { status: 400 }
      );
    }
    const foundActives = await prisma.apply.findMany({
      where: {
        applicationId: result,
        status: "pendiente",
      },
    });
    if (foundActives.length > 0) {
      return NextResponse.json(
        { error: "Existen postulaciones pendientes" },
        { status: 400 }
      );
    }

    await prisma.application.update({
      where: {
        id: result,
        NOT: {
          status: "closed",
        },
      },
      data: {
        status: "closed",
      },
    });
    return NextResponse.json({ message: "Ofertas cerradas" }, { status: 200 });
  } catch (error) {
    console.error("Error: ", (error as Error).message);
    return NextResponse.json(
      { error: "Error en el servidor." },
      { status: 500 }
    );
  }
}

export async function acceptApplyStudent(req: NextRequest) {
  //estudiante aceptando
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const { idApp, applyId } = await req.json();
    const idApply = idApplySchema.shape.idApply.parse(applyId);
    const idApplication = idApplySchema.shape.idApplication.parse(idApp);
    const apply = await prisma.apply.findFirst({
      where: {
        id: idApply,
        userCedula: token.cedula,
        status: "aprobado",
        application: {
          id: idApplication,
        },
      },
      select: {
        User: {
          select: {
            esInfo: {
              select: {
                dateStart: true,
                dateEnd: true,
              },
            },
          },
        },
      },
    });
    if (!apply || !apply.User.esInfo) {
      return NextResponse.json(
        { error: "No se encontró la postulación" },
        { status: 404 }
      );
    }

    await prisma.apply.updateMany({
      where: {
        AND: [
          {
            userCedula: token.cedula,
          },
          {
            NOT: {
              id: idApply,
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

    await prisma.apply.update({
      where: {
        id: idApply,
        status: "aprobado",
      },
      data: {
        status: "aceptado",
        application: {
          update: {
            notification: {
              create: {
                action: "accept",
                User: {
                  connect: {
                    cedula: token.cedula,
                  },
                },
              },
            },
          },
        },
      },
    });

    await prisma.applicationApproved.create({
      data: {
        dateEnd: fechaFinalGptWhatever(
          apply.User.esInfo.dateStart,
          apply.User.esInfo.dateEnd
        ),
        application: {
          connect: {
            id: idApplication,
          },
        },
        esInfo: {
          connect: {
            userCedula: token.cedula,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Postulacion aceptada" },
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

////////ALCALDIA
export async function closedAppAlcaldia(req: NextRequest) {
  try {
    const { id } = await req.json();
    const result = idApplySchema.shape.idApplication.parse(id);
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const application = await prisma.application.findFirst({
      where: {
        id: result,
      },
      include: {
        _count: {
          select: {
            applicationApproved: true,
          },
        },
      },
    });
    if (!application || application._count.applicationApproved === 0) {
      return NextResponse.json(
        { error: "Aplicación no encontrada." },
        { status: application?._count.applicationApproved === 0 ? 400 : 404 }
      );
    }
    const foundActives = await prisma.apply.findMany({
      where: {
        applicationId: result,
        status: "pendiente",
      },
    });
    if (foundActives.length > 0) {
      return NextResponse.json(
        { error: "Existen postulaciones pendientes" },
        { status: 400 }
      );
    }

    await prisma.application.update({
      where: {
        id: result,
        NOT: {
          status: "closed",
        },
      },
      data: {
        status: "closed",
      },
    });

    createLog(token.cedula, `${token.dataProfile.names}`, "Oferta cerrada");

    return NextResponse.json({ message: "Ofertas cerradas" }, { status: 200 });
  } catch (error) {
    console.error("Error: ", (error as Error).message);
    return NextResponse.json(
      { error: "Error en el servidor." },
      { status: 500 }
    );
  }
}

export async function getMyAppAlcaldia(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const applications = await prisma.application.findMany({
      orderBy: {
        date: "desc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        pay: true,
        tutor: true,
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
            status: "pendiente",
          },
          select: {
            status: true,
          },
        },
        _count: {
          select: {
            applicationApproved: true,
            apply: true,
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

export async function getAppAlcaldiaById(req: NextRequest) {
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
      },
      select: {
        id: true,
        title: true,
        description: true,
        pay: true,
        location: true,
        status: true,
        type: true,
        skills: true,
        date: true,
        tutor: true,
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

export async function getAppAlcaldia(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const result = idApplySchema.shape.idApplication.parse(
      req.nextUrl.searchParams.get("id")
    );
    const applications = await prisma.application.findFirst({
      where: {
        id: result,
      },
      select: {
        id: true,
        title: true,
        description: true,
        pay: true,
        tutor: true,
        location: true,
        status: true,
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
          select: {
            id: true,
            status: true,
            User: {
              select: {
                cedula: true,
                names: true,
                lastnames: true,
                mail: true,
                birthdate: true,
                phone: true,
                image: true,
                esInfo: {
                  select: {
                    institution: {
                      select: {
                        institutionCode: true,
                        name: true,
                      },
                    },
                    career: {
                      select: {
                        careerCode: true,
                        name: true,
                      },
                    },
                    address: true,
                    skills: true,
                    interests: true,
                    description: true,
                    curriculum: true,
                    bankName: true,
                    bankAccount: true,
                  },
                },
              },
            },
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

export async function updateApplyAlcaldia(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const { id, status } = await req.json();
    const idApply = idApplySchema.shape.idApply.parse(id);
    const statusApply = idApplySchema.shape.status.parse(status);
    const apply = await prisma.apply.findFirst({
      where: {
        id: idApply,
        status: "pendiente",
      },
      select: {
        applicationId: true,
        userCedula: true,
        User: {
          select: {
            esInfo: {
              select: {
                dateStart: true,
                dateEnd: true,
              },
            },
          },
        },
      },
    });
    if (!apply || !apply.User.esInfo) {
      return NextResponse.json(
        { error: "No se encontró la postulación" },
        { status: 404 }
      );
    }

    const acceptFound = await prisma.applicationApproved.findFirst({
      where: {
        userCedula: apply.userCedula,
        status: "enproceso",
      },
    });
    if (acceptFound) {
      return NextResponse.json(
        { error: "El estudiante ya tiene una aplicación activa" },
        { status: 400 }
      );
    }

    await prisma.apply.updateMany({
      where: {
        AND: [
          {
            userCedula: apply.userCedula,
          },
          {
            NOT: {
              id: idApply,
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

    await prisma.apply.update({
      where: {
        id: idApply,
      },
      data: {
        status: "aceptado",
        application: {
          update: {
            notification: {
              create: {
                action: "accept",
                User: {
                  connect: {
                    cedula: apply.userCedula,
                  },
                },
              },
            },
          },
        },
      },
    });

    await prisma.applicationApproved.create({
      data: {
        dateEnd: fechaFinalGptWhatever(
          apply.User.esInfo.dateStart,
          apply.User.esInfo.dateEnd
        ),
        application: {
          connect: {
            id: apply.applicationId,
          },
        },
        esInfo: {
          connect: {
            userCedula: apply.userCedula,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Postulacion actualizada" },
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

export async function deleteApplicationAlcaldia(req: NextRequest) {
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
    });
    if (!application) {
      return NextResponse.json(
        { error: "No se encontró la oferta" },
        { status: 404 }
      );
    }
    if (application.status === "closed") {
      return NextResponse.json(
        { error: "No puedes eliminar una oferta cerrada" },
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

export async function updateAppAlcaldiaById(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const result = applyUpdateSchema.parse(await req.json());
    const {
      id,
      title,
      description,
      pay,
      location,
      type,
      skills,
      status,
      tutor,
    } = result;
    const application = await prisma.application.findFirst({
      where: {
        id,
      },
    });
    if (!application) {
      return NextResponse.json(
        { error: "No se encontró la oferta" },
        { status: 404 }
      );
    }

    if (application.status === "closed") {
      return NextResponse.json(
        { error: "No puedes actualizar una oferta cerrada" },
        { status: 400 }
      );
    }

    await prisma.application.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        pay,
        tutor,
        location,
        type,
        skills,
        status,
        notification: {
          create: {
            action: "update",
            userCedula: token.cedula,
          },
        },
      },
    });
    return NextResponse.json(
      { message: "Oferta actualizada" },
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

export async function createAppAlcaldia(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const result = applyCreateAlcaldiaSchema.parse(await req.json());
    const {
      title,
      description,
      location,
      type,
      skills,
      status,
      pay,
      tutor,
      idDependence,
    } = result;
    await prisma.application.create({
      data: {
        title,
        description,
        location,
        type,
        skills,
        status,
        pay,
        tutor,
        dependencia: {
          connect: {
            id: idDependence,
          },
        },
        notification: {
          create: {
            action: "create",
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

// funcion kk para calcular la fecha final
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
