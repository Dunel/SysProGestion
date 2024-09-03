import { acceptApplyStudent, declineApply, getMyApplication } from "@/controllers/application.controller";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await getMyApplication(req);
}

export async function PUT(req: NextRequest) {
  return await declineApply(req);
}

export async function POST(req: NextRequest) {
  return await acceptApplyStudent(req);
}