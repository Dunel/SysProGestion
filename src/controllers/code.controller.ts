import { NextRequest, NextResponse } from "next/server";
import emailService from "@/service/nodemailer/emailService";
import { codeSchema } from "@/validations/code.schema";
import { ZodError } from "zod";
import prisma from "@/db";

export async function createCode(req: NextRequest) {
  try {
    const { mail }: { mail: string } = await req.json();
    const result = codeSchema.shape.mail.parse(mail);

    const findMail = await prisma.user.findFirst({
      where: {
        mail: result,
      },
    });
    if (findMail) {
      return NextResponse.json(
        { error: "El correo se encuentra registrado" },
        { status: 400 }
      );
    }

    const code = await prisma.coderegister.findFirst({
      where: {
        mail: result,
      },
    });

    const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;
    if (
      code &&
      new Date(code.updatedAt).getTime() + FIVE_MINUTES_IN_MS > Date.now()
    ) {
      return NextResponse.json(
        { message: "Ya se ha enviado un código recientemente" },
        { status: 200 }
      );
    }

    const newCode = Math.floor(100000 + Math.random() * 900000);

    if (code) {
      await prisma.coderegister.update({
        where: {
          id: code.id,
        },
        data: {
          code: newCode,
        },
      });
    } else {
      await prisma.coderegister.create({
        data: {
          mail: result,
          code: newCode,
        },
      });
    }

    const resmail = await emailService.sendMail(
      result,
      `Tu código de registro es: ${newCode}`,
      "Codigo de registro"
    );

    return NextResponse.json({ message: resmail }, { status: 200 });
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

export async function validateCode(req: NextRequest) {
  try {
    const { code, mail } = await req.json();
    const result = codeSchema.parse({ code, mail });

    const codeFind = await prisma.coderegister.findFirst({
      where: {
        mail: result.mail,
        code: result.code,
      },
    });
    if (!codeFind) {
      return NextResponse.json({ error: "Código incorrecto" }, { status: 400 });
    }

    const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;
    if (
      new Date(codeFind.updatedAt).getTime() + FIVE_MINUTES_IN_MS <
      Date.now()
    ) {
      return NextResponse.json(
        { error: "El código ha expirado", step: 0 },
        { status: 400 }
      );
    }

    return NextResponse.json({ id: codeFind.id }, { status: 200 });
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
