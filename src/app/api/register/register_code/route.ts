import { NextRequest, NextResponse } from "next/server";
import { validateCode } from "@/controllers/code.controller";
import { codeSchema } from "@/validations/code.schema";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  return await validateCode(req);
}
