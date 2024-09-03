import { getApplicationById, updateApplicationById } from "@/controllers/application.controller";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await getApplicationById(req);
}

export async function PUT(req: NextRequest) {
  return await updateApplicationById(req);
}
