import { NextRequest, NextResponse } from "next/server";
import { validCodeMail } from "@/service/register_code/validCode";
import { ZodError } from "zod";
import { userSchema } from "@/validations/user.schema";
import { createUser } from "@/controllers/user.controller";

export async function POST(req: NextRequest) {
  try {
    const { idCode, code, data } = await req.json();
    const result = userSchema.parse({ ...data, idCode, code });
    const mail = await validCodeMail(result.code, result.idCode);
    const user = await createUser({data:{ ...result, mail }});

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
