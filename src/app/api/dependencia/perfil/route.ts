import { ProfileDepenGet, ProfileDependenciaUpdate } from "@/controllers/profile.controller";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await ProfileDependenciaUpdate(req);
}

export async function GET(req: NextRequest) {
  return await ProfileDepenGet(req);
}