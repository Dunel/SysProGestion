import { ProfileUpdate } from "@/controllers/profile.controller";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await ProfileUpdate(req);
}
