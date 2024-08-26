import { ProfileEstudentGet, ProfileEstudentUpdate } from "@/controllers/profile.controller";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await ProfileEstudentUpdate(req);
}

export async function GET(req: NextRequest) {
  return await ProfileEstudentGet(req);
}