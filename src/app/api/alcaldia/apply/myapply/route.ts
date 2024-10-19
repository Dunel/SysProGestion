import { closedAppAlcaldia, deleteApplicationAlcaldia, getMyAppAlcaldia } from "@/controllers/application.controller";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await getMyAppAlcaldia(req);
}

export async function DELETE(req: NextRequest) {
  return await deleteApplicationAlcaldia(req);
}

export async function PUT(req: NextRequest) {
  return await closedAppAlcaldia(req);
}

//export async function POST(req: NextRequest) {