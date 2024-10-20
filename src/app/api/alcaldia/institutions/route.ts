import { createIntitution, deleteInstitution, getInstitutions, updateInstitution } from "@/controllers/institution.controller";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return getInstitutions(req);
}

export async function PUT(req: NextRequest) {
  return updateInstitution(req);
}

export async function POST(req: NextRequest) {
  return createIntitution(req);
}

export async function DELETE(req: NextRequest) {
  return deleteInstitution(req);
}