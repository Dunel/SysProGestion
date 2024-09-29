import { NextRequest, NextResponse } from "next/server";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import fs from "fs";
import path from "path";
import { idApplySchema } from "@/validations/application.schema";
import prisma from "@/db";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    const result = idApplySchema.shape.idApplication.parse(id);

    const application = await prisma.application.findFirst({
      where: {
        id: result,
      },
      select: {
        id: true,
        date: true,
        dependencia: {
          select: {
            name: true,
            career: {
              select: {
                short: true,
              },
            },
            User: {
              select: {
                names: true,
                lastnames: true,
              },
            },
          },
        },
        apply: {
          where: {
            status: "aceptado",
          },
          select: {
            User: {
              select: {
                names: true,
                lastnames: true,
                cedula: true,
                esInfo: {
                  select: {
                    career: {
                      select: {
                        name: true,
                      },
                    },
                    institution: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!application || !application.apply.length || !application.dependencia) {
      return NextResponse.json(
        { error: "Datos incompletos o incorrectos." },
        { status: 400 }
      );
    }

    const templatePath = path.resolve(process.cwd(), "src", "postulacion.docx");
    if (!fs.existsSync(templatePath)) {
      return NextResponse.json(
        { error: "La plantilla .docx no se encontró." },
        { status: 500 }
      );
    }

    const content = fs.readFileSync(templatePath, "binary");
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    const objecData = {
      numeroOficio: `${application?.id}-${new Date().getFullYear()}`,
      fecha: new Date().toLocaleDateString(),
      repreDependencia:
        application?.dependencia.career?.short +
        ". " +
        application?.dependencia.User.names +
        " " +
        application?.dependencia.User.lastnames,
      dependName: application?.dependencia.name,
      estudiantes: application?.apply.map((student) => ({
        name: student.User.names,
        apellido: student.User.lastnames,
        cedula: student.User.cedula,
        career: student.User.esInfo?.career?.name,
        institution: student.User?.esInfo?.institution?.name,
      })),
    };
    doc.render(objecData);

    const buf = doc.getZip().generate({ type: "nodebuffer" });
    return new NextResponse(buf, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": "attachment; filename=oficio_modificado.docx",
      },
    });
  } catch (error: any) {
    console.error("Error generando el DOCX:", error.message || error);

    return NextResponse.json(
      { error: "Error en el servidor al generar el DOCX." },
      { status: 500 }
    );
  }
}
