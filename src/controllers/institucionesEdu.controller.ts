// import prisma from "@/db";
// import { InstitucionesYcarrerasSchema, institucionesYcarrerasSchema
// } from "@/validations/institucionesYcarreras.schema";
// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";
// import { ZodError } from "zod";

// export async function createInstitucionesEdu(req: NextRequest) {
//     try {
//       const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//       if (!token) {
//         return NextResponse.json({ error: "No autorizado" }, { status: 401 });
//       }
//       const result = institucionesYcarrerasSchema.parse(await req.json());
//       const { codigoInstitucion, nombreInstitucion, parroquiaInstitucion } = result;
//       await prisma.institucionesEdu.create({
//         data: {
//           codigoInstitucion, nombreInstitucion, parroquiaInstitucion 
//         },
//       });
//       return NextResponse.json({ message: "Institucion Registrada" }, { status: 200 });
//     } catch (error) {
//       if (error instanceof ZodError) {
//         return NextResponse.json(
//           { error: error.issues[0].message },
//           { status: 400 }
//         );
//       }
//       console.error("Error: ", (error as Error).message);
//       return NextResponse.json(
//         { error: "Error en el servidor." },
//         { status: 500 }
//       );
//     }
//   }
  

//   export async function getinstitucionesEdu(req: NextRequest) {
//     try {
//       const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//       if (!token) {
//         return NextResponse.json({ error: "No autorizado" }, { status: 401 });
//       }
//       const institucionesEdusss = await prisma.institucionesEdu.findMany({
//         select: {
//         id: true,
//         codigoInstitucion: true,
//         nombreInstitucion: true,
//         parroquiaInstitucion: true,
//         }
//       })
//       return NextResponse.json(institucionesEdusss, { status: 200 });
//     } catch (error) {
//       if (error instanceof ZodError) {
//         return NextResponse.json(
//           { error: error.issues[0].message },
//           { status: 400 }
//         );
//       }
//       console.error("Error: ", (error as Error).message);
//       return NextResponse.json(
//         { error: "Error en el servidor DE institucionesEdusss." },
//         { status: 500 }
//       );
//     }
//   }