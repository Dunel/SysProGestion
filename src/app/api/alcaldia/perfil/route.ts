import { ProfileAlcaldiaUpdate, ProfileAlcaldiaGet } from "@/controllers/profile.controller";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await ProfileAlcaldiaUpdate(req);
}

export async function GET(req: NextRequest) {
  return await ProfileAlcaldiaGet(req);
}