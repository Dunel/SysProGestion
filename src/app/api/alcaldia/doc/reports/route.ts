import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import path from "path";

type Students = {
  date: string;
  application: {
    tutor: string;
    dependencia: {
      name: string;
    };
  };
  esInfo: {
    gender: "M" | "F";
    bankName: string;
    bankAccount: string;
    cneRegister: boolean;
    cneCentroName: string;
    cneParroquia: string;
    institution: {
      name: string;
    };
    career: {
      name: string;
    };
    address: string;
    User: {
      names: string;
      lastnames: string;
      cedula: number;
      mail: string;
      birthdate: string;
      phone: string;
      estado: {
        estado: string;
      };
      municipio: {
        municipio: string;
      };
      parroquia: {
        parroquia: string;
      };
    };
  };
};

export async function POST(req: NextRequest) {
  try {
    const { students } = await req.json();

    if (!students || !Array.isArray(students)) {
      return NextResponse.json(
        { message: "Invalid students data" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "src", "report_details.xlsx");

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet("Hoja1");

    if (!worksheet) {
      return NextResponse.json(
        { error: "Worksheet 'Hoja1' not found" },
        { status: 400 }
      );
    }

    const startRow = 8; // inicio de la tabla de estudiantes

    students.forEach((student: Students, index) => {
      const row = worksheet.getRow(startRow + index);
      if (row) {
        row.getCell(1).value = index + 1; // No.
        row.getCell(2).value = student.esInfo.User.parroquia.parroquia; // Parroquia
        row.getCell(3).value = student.esInfo.institution.name; // Institución
        row.getCell(
          4
        ).value = `${student.esInfo.User.names} ${student.esInfo.User.lastnames}`; // Nombres y apellidos
        row.getCell(5).value = student.esInfo.User.cedula; // Cédula
        row.getCell(6).value = student.esInfo.career.name; // Carrera
        row.getCell(7).value = calcularEdad(student.esInfo.User.birthdate); // Edad
        row.getCell(8).value = student.esInfo.address; // Dirección
        row.getCell(9).value = student.esInfo.User.mail; // Correo
        row.getCell(10).value = student.esInfo.User.phone; // Teléfono
        row.getCell(11).value = new Date(student.esInfo.User.birthdate).toLocaleDateString(); // Fecha de nacimiento
        row.getCell(12).value = student.application.tutor; // Tutor
        row.getCell(13).value = student.esInfo.gender; // Sexo
        row.getCell(14).value = student.esInfo.bankAccount; // Número de cuenta bancaria
        row.getCell(15).value = student.esInfo.bankName; // Nombre del banco
        row.getCell(16).value = ""; // observación
        row.getCell(17).value = student.application.dependencia.name; // Campo 1
        row.getCell(18).value = student.esInfo.cneRegister ? "Si" : "No"; // vota? 2
        row.getCell(19).value = student.esInfo.cneCentroName; // centro de votacion 3
        row.getCell(20).value = student.esInfo.cneParroquia; // parroquia centro de votacion 4
        row.commit();
      }
    });

    const headerRow = 7;
    const columnCount = 20;

    const headersRow = worksheet.getRow(headerRow);
    const headers =
      headersRow?.values && Array.isArray(headersRow.values)
        ? headersRow.values.slice(1, columnCount + 1)
        : [];

    if (!headers || headers.length === 0) {
      return NextResponse.json(
        { message: "No valid headers found" },
        { status: 400 }
      );
    }

    worksheet.addTable({
      name: "TablaEstudiantes",
      ref: `A${headerRow}`, // Inicio de la tabla
      headerRow: true,
      totalsRow: false,
      columns: headers.map((header) => ({
        name: header ? header.toString() : "",
      })),
      rows:
        worksheet
          .getRows(startRow, students.length) // fila inicio
          ?.map((row) =>
            row?.values && Array.isArray(row.values)
              ? row.values.slice(1, columnCount + 1)
              : []
          ) ?? [],
    });

    //tamaño aki
    worksheet.columns.forEach((column) => {
      column.width = 20;
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename=reporte_modificado.xlsx`,
      },
    });
  } catch (error) {
    console.error("Error processing the Excel file:", error);
    return NextResponse.json(
      { message: "Failed to process the Excel file" },
      { status: 500 }
    );
  }
}

function calcularEdad(birthdate: string): number {
  const fechaNacimiento = new Date(birthdate);
  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const mes = hoy.getMonth() - fechaNacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }

  return edad;
}
