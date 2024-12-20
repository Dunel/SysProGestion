import prisma from "@/db";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function getStatsDepend(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const students = await prisma.applicationApproved.count({
      where: {
        application: {
          dependencia: {
            userCedula: token.cedula,
          },
        },
        dateEnd: {
          gte: new Date(),
        },
      },
    });
    const internshipsCompleted = await prisma.applicationApproved.count({
      where: {
        application: {
          type: "pasantia",
          dependencia: {
            userCedula: token.cedula,
          },
        },
        dateEnd: {
          lt: new Date(),
        },
      },
    });
    const serviceCompleted = await prisma.applicationApproved.count({
      where: {
        application: {
          type: "servicio",
          dependencia: {
            userCedula: token.cedula,
          },
        },
        dateEnd: {
          lt: new Date(),
        },
      },
    });
    const pending = await prisma.apply.count({
      where: {
        application: {
          dependencia: {
            userCedula: token.cedula,
          },
        },
        status: "pendiente",
      },
    });
    const pendingList = await prisma.apply.findMany({
      where: {
        application: {
          dependencia: {
            userCedula: token.cedula,
          },
        },
        status: "pendiente",
      },
      select: {
        User: {
          select: {
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
        },
        application: {
          select: {
            title: true,
          },
        },
      },
      take: 5,
    });

    const stats = {
      students,
      internshipsCompleted,
      serviceCompleted,
      pending,
      pendingList,
    };

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error("Error: ", (error as Error).message);
    return NextResponse.json(
      { error: "Error en el servidor." },
      { status: 500 }
    );
  }
}

export async function getStatsAlcaldia(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const processing = await prisma.applicationApproved.count({
      where: {
        dateEnd: {
          gte: new Date(),
        },
      },
    });
    const internshipsCompleted = await prisma.applicationApproved.count({
      where: {
        application: {
          type: "pasantia",
        },
        dateEnd: {
          lt: new Date(),
        },
      },
    });
    const serviceCompleted = await prisma.applicationApproved.count({
      where: {
        application: {
          type: "servicio",
        },
        dateEnd: {
          lt: new Date(),
        },
      },
    });
    const pending = await prisma.apply.count({
      where: {
        status: "pendiente",
      },
    });
    const pendingList = await prisma.apply.findMany({
      where: {
        status: "pendiente",
      },
      select: {
        User: {
          select: {
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
        },
        application: {
          select: {
            title: true,
            dependencia: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      take: 5,
    });

    const stats = {
      processing,
      internshipsCompleted,
      serviceCompleted,
      pending,
      pendingList,
    };

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error("Error: ", (error as Error).message);
    return NextResponse.json(
      { error: "Error en el servidor." },
      { status: 500 }
    );
  }
}

export async function getStudents(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const students = await prisma.applicationApproved.findMany({
      where: {
        status: "enproceso",
      },
      select: {
        date: true,
        dateEnd: true,
        application: {
          select: {
            tutor: true,
            type: true,
            date: true,
            dependencia: {
              select: {
                name: true,
              },
            },
          },
        },
        esInfo: {
          select: {
            gender: true,
            bankName: true,
            bankAccount: true,
            cneRegister: true,
            cneCentroName: true,
            cneParroquia: true,
            institution: {
              select: {
                name: true,
                type: true,
              },
            },
            career: {
              select: {
                name: true,
              },
            },
            address: true,
            User: {
              select: {
                names: true,
                lastnames: true,
                cedula: true,
                mail: true,
                birthdate: true,
                phone: true,
                estado: {
                  select: {
                    estado: true,
                  },
                },
                municipio: {
                  select: {
                    municipio: true,
                  },
                },
                parroquia: {
                  select: {
                    parroquia: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return NextResponse.json(students, { status: 200 });
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
