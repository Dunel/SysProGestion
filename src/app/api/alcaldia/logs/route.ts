import { getLogs } from "@/controllers/logs.controller";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    return getLogs(req);
  }