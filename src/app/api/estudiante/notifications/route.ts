import { getNotifications } from "@/controllers/notification.controller";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
  return await getNotifications(req);
}