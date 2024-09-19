import { NextRequest } from "next/server";
import { createRecovery, passwordRecovery, validateRecovery } from "@/controllers/code.controller";

export async function POST(req: NextRequest) {
  return await createRecovery(req);
}

export async function GET(req: NextRequest) {
  return await validateRecovery(req);
}

export async function PUT(req: NextRequest) {
  return await passwordRecovery(req);
}