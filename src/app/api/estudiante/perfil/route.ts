import { ProfileGet, ProfileUpdate } from "@/controllers/profile.controller";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await ProfileUpdate(req);
}

export async function GET(req: NextRequest) {
  return await ProfileGet(req);
}