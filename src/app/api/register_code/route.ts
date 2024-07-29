import { NextRequest, NextResponse } from "next/server";
import { validateCode } from "@/service/register_code/validCode";
import { codeSchema } from "@/validations/code.schema";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const { code, mail } = await req.json();

    const result = codeSchema.safeParse({ code, mail });
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const validCode = await validateCode(result.data.code, result.data.mail);

    return NextResponse.json({ message: validCode }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 500 }
      );
    }
    //console.error("Error al enviar el correo:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
