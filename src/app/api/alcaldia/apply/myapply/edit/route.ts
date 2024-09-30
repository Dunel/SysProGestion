import { getAppAlcaldiaById, updateAppAlcaldiaById } from "@/controllers/application.controller";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await getAppAlcaldiaById(req);
}

export async function PUT(req: NextRequest) {
  return await updateAppAlcaldiaById(req);
}
