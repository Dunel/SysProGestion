import { getAppAlcaldia, updateApplyDepend } from "@/controllers/application.controller";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await getAppAlcaldia(req);
}

export async function POST(req: NextRequest) {
    return await updateApplyDepend(req);
}