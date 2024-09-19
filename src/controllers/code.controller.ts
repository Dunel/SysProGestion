import { NextRequest, NextResponse } from "next/server";
import emailService from "@/service/nodemailer/emailService";
import {
  codeSchema,
  emailRecoverySchema,
  recoveryCodeSchema,
  recoveryPasswordSchema,
  roleSchema,
} from "@/validations/code.schema";
import { ZodError } from "zod";
import prisma from "@/db";
import jwt from "jsonwebtoken";
import { env } from "process";
import bcrypt from "bcrypt";

type generateCode = {
  mail: string;
  role: string;
};

export async function createCode(req: NextRequest) {
  try {
    const { mail, role }: generateCode = await req.json();
    const email = codeSchema.shape.mail.parse(mail);
    const roles = roleSchema.shape.role.parse(role);

    const preRegisterFind = await prisma.preRegister.findFirst({
      where: {
        mail: {
          equals: email,
          mode: "insensitive",
        },
        role: roles,
      },
    });
    if (!preRegisterFind && role !== "estudiante") {
      return NextResponse.json(
        { error: "Este correo no pertenece al rol seleccionado" },
        { status: 400 }
      );
    }

    const findMail = await prisma.user.findFirst({
      where: {
        mail: {
          equals: email,
          mode: "insensitive",
        },
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
        mail: {
          equals: email,
          mode: "insensitive",
        },
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
    let codeReg;
    if (code) {
      codeReg = await prisma.coderegister.update({
        where: {
          id: code.id,
        },
        data: {
          code: newCode,
        },
      });
    } else {
      codeReg = await prisma.coderegister.create({
        data: {
          mail: email,
          code: newCode,
        },
      });
    }

    const resmail = await emailService.sendMail(
      email,
      `Tu código de registro es: ${newCode}`,
      "Codigo de registro",
      ""
    );

    const token = jwt.sign(
      { mail: email, codeId: codeReg.id, role: preRegisterFind?.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "10m",
      }
    );

    return NextResponse.json({ message: resmail, token }, { status: 200 });
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
        mail: {
          equals: result.mail,
          mode: "insensitive",
        },
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

    return NextResponse.json({ message: "Código validado" }, { status: 200 });
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

export async function deleteCode(mail: string) {
  try {
    const deleteCode = await prisma.coderegister.delete({
      where: {
        mail,
      },
    });

    return;
  } catch (error) {
    return;
  }
}

//recovery

export async function createRecovery(req: NextRequest) {
  try {
    const { email } = await req.json();
    const result = emailRecoverySchema.parse({ email });

    const userFound = await prisma.user.findFirst({
      where: {
        mail: {
          equals: result.email,
          mode: "insensitive",
        },
      },
    });
    if (!userFound) {
      return NextResponse.json(
        { error: "Este correo no se encuentra registrado." },
        { status: 404 }
      );
    }

    const recoveryFound = await prisma.recoveryPassword.findFirst({
      where: {
        email: {
          equals: result.email,
          mode: "insensitive",
        },
      },
    });
    if (recoveryFound) {
      const TWENTY_MINUTES_IN_MS = 20 * 60 * 1000;
      if (
        new Date(recoveryFound.updatedAt).getTime() + TWENTY_MINUTES_IN_MS >
        Date.now()
      ) {
        return NextResponse.json(
          { message: "Ya se ha enviado un código recientemente" },
          { status: 200 }
        );
      }
    }

    const code = await prisma.coderegister.findFirst({
      where: {
        mail: {
          equals: result.email,
          mode: "insensitive",
        },
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

    const newCode = Math.floor(100000000 + Math.random() * 900000000);
    const recoveryPass = await prisma.recoveryPassword.upsert({
      where: {
        email: result.email,
      },
      update: {
        code: newCode,
      },
      create: {
        email: result.email,
        code: newCode,
      },
    });

    const resmail = await emailService.sendMail(
      email,
      `Tu link de recuperación es:`,
      "Recuperación de contraseña",
      `${env.NEXTAUTH_URL}/recovery/newpassword?code=${newCode}&id=${recoveryPass.id}`
    );

    return NextResponse.json(
      {
        message:
          "Hemos enviado un correo a tu dirección de correo electrónico.",
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

export async function validateRecovery(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");
    const id = req.nextUrl.searchParams.get("id");
    const result = recoveryCodeSchema.parse({ code, id });

    const codeFind = await prisma.recoveryPassword.findFirst({
      where: {
        id: result.id,
        code: result.code,
      },
    });
    if (!codeFind) {
      return NextResponse.json({ error: "Link incorrecto" }, { status: 400 });
    }

    const TWENTY_MINUTES_IN_MS = 20 * 60 * 1000;
    if (
      new Date(codeFind.updatedAt).getTime() + TWENTY_MINUTES_IN_MS <
      Date.now()
    ) {
      return NextResponse.json(
        { error: "El link ha expirado", step: 0 },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Código validado" }, { status: 200 });
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

export async function passwordRecovery(req: NextRequest){
  try {
    const { id, code, password, passwordConfirmation } = await req.json();
    const result = recoveryCodeSchema.parse({ id, code });
    const passwordRecovery = recoveryPasswordSchema.parse({ password, passwordConfirmation });

    const codeFind = await prisma.recoveryPassword.findFirst({
      where: {
        id: result.id,
        code: result.code,
      },
    });
    if (!codeFind /*|| codeFind.used*/) {
      return NextResponse.json({ error: "Link incorrecto" }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        mail: {
          equals: codeFind.email,
          mode: "insensitive",
        },
      },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Link incorrecto." },
        { status: 404 }
      );
    }

    const passwordHash = await bcrypt.hash(passwordRecovery.password, 10);
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: passwordHash,
      },
    });

    await prisma.recoveryPassword.delete({
      where: {
        id: codeFind.id,
      },
    });

    return NextResponse.json({ message: "Contraseña actualizada" }, { status: 200 });
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