import { getApplicationDepend, updateApplyDepend } from "@/controllers/application.controller";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await getApplicationDepend(req);
}

export async function POST(req: NextRequest) {
    return await updateApplyDepend(req);
}