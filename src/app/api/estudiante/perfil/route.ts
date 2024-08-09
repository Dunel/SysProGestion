import { ProfileUpdate } from "@/controllers/profile.controller";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await ProfileUpdate(req);
}
