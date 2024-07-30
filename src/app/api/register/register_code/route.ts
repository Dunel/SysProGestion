import { NextRequest, NextResponse } from "next/server";
import { validateCode } from "@/controllers/code.controller";

export async function POST(req: NextRequest) {
  return await validateCode(req);
}
