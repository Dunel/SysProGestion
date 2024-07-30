import { NextRequest, NextResponse } from "next/server";
import emailService from "@/service/register_code/emailService";
import { codeSchema } from "@/validations/code.schema";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const { mail }: { mail: string } = await req.json();
    
    const result = codeSchema.shape.mail.safeParse(mail);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const resmail = await emailService.sendMail(mail, "Codigo de registro");

    return NextResponse.json({ message: resmail }, { status: 200 });
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
