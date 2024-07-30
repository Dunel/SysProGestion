import { NextRequest } from "next/server";
import { createCode } from "@/controllers/code.controller";

export async function POST(req: NextRequest) {
  return await createCode(req);
}
