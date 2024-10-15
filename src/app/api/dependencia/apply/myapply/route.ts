import { deleteApplicationDepend, getMyApplicationDepend, createAppDepend, closedAppDependencia } from "@/controllers/application.controller";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await getMyApplicationDepend(req);
}

export async function DELETE(req: NextRequest) {
  return await deleteApplicationDepend(req);
}

export async function POST(req: NextRequest) {
  return await createAppDepend(req);
}

export async function PUT(req: NextRequest) {
  return await closedAppDependencia(req);
}