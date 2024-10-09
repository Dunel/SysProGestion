// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { cedulaSchema, cedulaSearch } from "@/validations/cedula.schema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import { Trash2 } from "lucide-react";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Oval } from "react-loader-spinner";

// interface Internship {
//   id: number;
//   title: string;
//   description: string;
//   location: string;
//   type: "pasantia" | "servicio" | "proyecto";
//   date: Date;
//   skills: string[];
//   status: string;
//   pay: boolean | null;
//   tutor: string;
//   dependencia: {
//     name: string;
//     User: {
//       image: string;
//     };
//   };
//   apply: [
//     {
//       id: number;
//       status: string;
//       User: {
//         cedula: string;
//         names: string;
//         lastnames: string;
//         mail: string;
//         birthdate: string;
//         phone: string;
//         image: string;
//         parroquia: {
//           parroquia: string;
//         };
//         esInfo: {
//           institution: {
//             institutionCode: string;
//             name: string;
//           };
//           career: {
//             careerCode: string;
//             name: string;
//           };
//           quarter: string;
//           address: string;
//           skills: string[];
//           description: string;
//           curriculum: string;
//         };
//       };
//     }
//   ];
// }

// const skillFormated: { [key: string]: string } = {
//   resoluciondeproblemas: "Resolucion de problemas",
//   trabajoenequipo: "Trabajo en equipo",
//   adaptabilidad: "Adaptabilidad",
//   comunicacionefectiva: "Comunicación efectiva",
//   liderazgo: "Liderazgo",
//   pensamientocritico: "Pensamiento crítico",
//   orientacionaresultados: "Orientación a resultados",
//   creatividad: "Creatividad",
//   gestiondeltiempo: "Gestión del tiempo",
//   aprendizajecontinuo: "Aprendizaje continuo",
//   dondegente: "Don de gente",
//   ensenanza: "Enseñanza",
//   sociable: "Sociable",
//   salud: "Salud",
//   deportes: "Deportes",
//   logistica: "Logística",
//   expresionesartisticas: "Expresiones artísticas",
//   diseno: "Diseño",
//   musica: "Música",
//   ingles: "Inglés",
//   otrosidiomasnaturales: "Otros idiomas naturales",
//   lenguajesdeprogramacion: "Lenguajes de programación",
// };

// const ofertsType = [
//   { key: "pasantia", name: "Pasantía" },
//   { key: "servicio", name: "Servicio Comunitario" },
// ];

// const ofertsStatus = [
//   { key: "active", name: "Activa✅", color: "green" },
//   { key: "inactive", name: "Inactiva⚠️", color: "yellow" },
//   {
//     key: "aceptado",
//     name: "El estudiante ha Aceptado esta oferta🎉 Contactalo y comiencen el proceso.",
//     color: "green",
//   },
//   {
//     key: "pendiente",
//     name: "Pendiente⌚, debes Aprobar o Rechazar solicitud de estudiante",
//     color: "blue",
//   },
//   {
//     key: "aprobado",
//     name: "Haz Aprobadó a este estudiante, espera que él acepte⌚",
//     color: "blue",
//   },
//   {
//     key: "rechazado",
//     name: "Has Rechazado a este estudiente ⛔",
//     color: "red",
//   },
//   {
//     key: "declinado",
//     name: "El estudiante ha Declinado esta Oferta⛔",
//     color: "red",
//   },
// ];

// type estudSearch = {
//   cedula: string;
//   names: string;
//   lastnames: string;
//   esInfo: {
//     career: {
//       name: string;
//     };
//   };
// };

// export default function InternShipCardReceived({
//   internship,
//   getApplication,
// }: {
//   internship: Internship | undefined;
//   getApplication: () => void;
// }) {
//   const [estSearch, setEstSearch] = useState<estudSearch>();
//   const [loading, setLoading] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<cedulaSearch>({
//     resolver: zodResolver(cedulaSchema),
//     mode: "onChange",
//   });
//   const updateStatus = async (status: string, id: number) => {
//     try {
//       const res = await axios.post(`/api/alcaldia/apply/myapply/received`, {
//         id,
//         status,
//       });
//       getApplication();
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.log("error lanzado:", error.response?.data);
//       } else {
//         console.error("error:", error);
//       }
//     }
//   };
//   function calcularEdad(fechaNacimiento: string | Date): string {
//     // Convertir a objeto Date si es necesario
//     const fechaNacimientoDate =
//       typeof fechaNacimiento === "string"
//         ? new Date(fechaNacimiento)
//         : fechaNacimiento;

//     const hoy = new Date();
//     let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
//     const mes = hoy.getMonth() - fechaNacimientoDate.getMonth();

//     // Ajustar la edad si el mes o el día actual es anterior al de nacimiento
//     if (
//       mes < 0 ||
//       (mes === 0 && hoy.getDate() < fechaNacimientoDate.getDate())
//     ) {
//       edad--;
//     }

//     return edad.toString() + " años";
//   }

//   const handleSearch = async (data: cedulaSearch) => {
//     try {
//       setLoading(true);
//       setEstSearch(undefined);
//       const res = await axios.get(`/api/alcaldia/apply/myapply/addEst`, {
//         params: { cedula: data.cedula },
//       });
//       setEstSearch(res.data);
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         alert(error.response?.data?.error);
//       } else {
//         console.error("error:", error);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAcc = async () => {
//     try {
//       setLoading(true);
//       if (!estSearch || !internship) {
//         return;
//       }
//       const res = await axios.post(`/api/alcaldia/apply/myapply/addEst`, {
//         cedula: estSearch?.cedula,
//         id: internship?.id,
//       });
//       res.data.message && alert(res.data.message);
//       getApplication();
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         alert(error.response?.data?.error);
//       } else {
//         console.error("error:", error);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBorrar = async (cedula: string) => {
//     try {
//       setLoading(true);
//       const res = await axios.delete(`/api/alcaldia/apply/myapply/addEst`, {
//         data: { cedula, id: internship?.id },
//       });
//       res.data.message && alert(res.data.message);
//       getApplication();
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         alert(error.response?.data?.error);
//       } else {
//         console.error("error:", error);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {internship ? (
//         <>
//           <div
//             className="bg-white flex flex-col my-2 p-2 border-2 border-gray-300 rounded-lg 
//                 h-autotext-lg justify-center mb-8 w-[90%] mx-auto text-sm md:text-base lg:text-lg"
//           >
//             <div className="flex">
//               <span className="flex  ml-auto p-1 text-red-500">
//                 Codigo de Oferta de Vacante: {"P-2024-000" + internship.id}
//               </span>
//             </div>

//             <h2 className="font-bold text-gray-800 mb-2 text-center text-2xl md:text-3xl lg:text-4xl">
//               {internship.title.toUpperCase()}
//             </h2>

//             <div className="flex flex-col items-center md:flex-row md:space-x-4">
//               <div className="w-[95%] m-1 p-1 word-wrap overflow-wrap">
//                 <div className="flex flex-col gap-2 mx-auto md:flex-row md:justify-start">
//                   {/* lado izquierdo - La foto */}
//                   <div className="relative group m-1 p-1 mx-auto md:w-auto">
//                     <img
//                       src={internship.dependencia.User.image}
//                       alt={`${internship.dependencia} logo`}
//                       className="flex h-40 w-40 rounded-full border-4 border-black-800 object-cover sm:h-50 sm:w-50"
//                     />
//                   </div>

//                   {/* lado derecho foto */}
//                   <div className="w-[100%] m-1 p-1 md:w-[70%]">
//                     <p className="text-gray-600 mb-1 font-bold text-lg md:text-xl lg:text-2xl">
//                       {" "}
//                       <i>{internship.dependencia.name}</i>
//                     </p>

//                     <p className="text-gray-500">📍{internship.location}</p>
//                     <p className="text-gray-500">
//                       {" "}
//                       tutor o responsable:{" "}
//                       {internship.tutor ? internship.tutor : "No asignado"}
//                     </p>
//                     <p className="text-gray-500">
//                       {" "}
//                       🤑 {internship.pay ? "si" : "no"}
//                     </p>

//                     <div className="flex flex-col my-2 gap-2 sm:flex-row">
//                       <div className="w-[50%]">
//                         <span className="font-medium text-gray-700 mb-2 text-sm md:text-lg">
//                           Estado de la Solicitud:
//                         </span>
//                         <p
//                           className={`text-${
//                             ofertsStatus.find(
//                               (e) => e.key === internship.status
//                             )?.color
//                           }-500 font-extrabold p-2`}
//                         >
//                           {
//                             ofertsStatus.find(
//                               (e) => e.key === internship.status
//                             )?.name
//                           }
//                         </p>
//                       </div>

//                       <div className="w-[50%]">
//                         <span className="font-medium text-gray-700 mb-2 text-sm md:text-lg">
//                           Tipo de Oferta:
//                         </span>
//                         <p>
//                           {
//                             ofertsType.find(
//                               (type) => type.key === internship.type
//                             )?.name
//                           }
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col justify-center gap-2 my-2 lg:flex-row">
//                   <div className="m-1 w-[100%] lg:w-[40%]">
//                     <h4 className="text-lg font-medium text-gray-700 mb-2">
//                       Habilidades requeridas 📝
//                     </h4>
//                     <ul className="list-disc list-inside">
//                       {internship.skills.map((skill, index) => (
//                         <li key={index} className="text-gray-600">
//                           {skillFormated[skill]}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                   <div className="m-1 w-[100%] lg:w-[60%]">
//                     <h4 className="text-lg font-medium text-gray-700 mb-2">
//                       Descripcion de la Vacante 📋
//                     </h4>
//                     <p>{internship.description}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div
//             className="bg-white flex flex-col my-2 p-2 border-2 border-gray-300 rounded-lg 
//                 h-autotext-lg justify-center mb-8 w-[90%] mx-auto text-sm md:text-base lg:text-lg"
//           >
//             <h3 className="font-bold text-gray-800 mb-4 text-xl text-center underline md:text-2xl lg:text-3xl">
//               AGREGAR ESTUDIANTE
//             </h3>
//             <div className="flex space-x-2 py-4 my-2 p-2">
//               <div className="flex flex-col items-center gap-2">
//                 <Input
//                   {...register("cedula")}
//                   name="cedula"
//                   placeholder="Cedula"
//                   type={"text"}
//                 />
//                 {errors.cedula && (
//                   <p className="text-red-500 text-xs">
//                     {errors.cedula.message}
//                   </p>
//                 )}
//               </div>
//               <Button
//                 className="inline-flex items-center justify-center rounded-md px-6 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//                 onClick={handleSubmit(handleSearch)}
//               >
//                 BUSCAR
//               </Button>
//             </div>
//             {loading && (
//               <div className="flex justify-center items-center flex-col mt-10">
//                 <Oval
//                   color="#000000"
//                   secondaryColor="#FFFFFF"
//                   height={50}
//                   width={50}
//                   strokeWidth={5}
//                 />
//                 <br />
//                 <span>Espere por favor...</span>
//               </div>
//             )}
//             <ul className="space-y-2">
//               {estSearch && (
//                 <li className="flex justify-between items-center p-2 bg-gray-100 rounded">
//                   <span>{estSearch.cedula}</span>
//                   <span>{`${estSearch.names} ${estSearch.lastnames}`}</span>
//                   <span>{estSearch.esInfo.career.name}</span>
//                   <button
//                     className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//                     onClick={() => handleAcc()}
//                   >
//                     Añadir
//                   </button>
//                 </li>
//               )}
//             </ul>



//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Nombre</TableHead>
//                   <TableHead>Cédula</TableHead>
//                   <TableHead>Carrera</TableHead>
//                   <TableHead>Acciones</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {internship.apply.map(
//                   (apply, index) =>
//                     apply.status === "aceptado" && (
//                       <TableRow key={index}>
//                         <TableCell>
//                           {apply.User.names} {apply.User.lastnames}
//                         </TableCell>
//                         <TableCell>{apply.User.cedula}</TableCell>
//                         <TableCell>{apply.User.esInfo.career.name}</TableCell>
//                         <TableCell>
//                           <Button
//                             variant="outline"
//                             size="icon"
//                             onClick={() => handleBorrar(apply.User.cedula)}
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     )
//                 )}
//               </TableBody>
//             </Table>
//           </div>



//           <div className="flex flex-col items-center gap-1">
//             <h3 className="font-bold text-gray-800 mb-4 text-xl underline md:text-2xl lg:text-3xl">
//               {internship.apply.length > 0
//                 ? "SOLICITUDES RECIBIDAS"
//                 : "NO HAS RECIBIDO SOLICITUDES"}
//             </h3>

//                 {/* //! ESTO ES LAS CARD POR ESTUDIANTEeeeeeeeeeeeeeeee */}
//             {internship.apply.map((apply, index) => (
//               <div
//                 key={index}
//                 className="bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.5)] flex flex-col w-full my-2 p-2 border-2 border-gray-300 rounded-lg 
//                 h-autotext-lg sm:sticky sm:top-[-45vh] text-sm md:text-base lg:text-lg"
//               >
//                 <h2
//                   className={`text-xl font-bold text-gray-800 text-center sm:text-2xl md:text-3xl lg:text-4xl`}
//                 >
//                   {apply.User.names} {apply.User.lastnames}
//                 </h2>

//                 {/* //!foto + info personal */}
//                 <div className="flex flex-col items-center md:flex-row md:space-x-4">
//                   {/* Foto del Estudiante */}
//                   <div className="relative group m-1 p-1 mx-auto md:w-auto">
//                     <img
//                       className="flex h-40 w-40 rounded-full border-4 border-black-800 object-cover sm:h-60 sm:w-60"
//                       src={apply.User.image || "/images/no-image.png"}
//                       alt="Foto del estudiante"
//                     />
//                   </div>

//                   {/* !Información del Estudiente */}
//                   {/* //! parrokia */}
//                   <div className="m-1 p-1 word-wrap overflow-wrap w-[100%] md:w-[80%] mx-auto">
//                     <p className="text-gray-600 md:text-1x1">
//                       <strong>🪪 Cedula de identidad:</strong>{" "}
//                       {apply.User.cedula}
//                     </p>
//                     <p className="text-gray-600 md:text-1x1">
//                       <strong>📲 Teléfono:</strong> {apply.User.phone}
//                     </p>
//                     <p className="text-gray-600 md:text-1x1">
//                       <strong>📧 Correo:</strong> {apply.User.mail}
//                     </p>
//                     <p className="text-gray-600 md:text-1x1">
//                       <strong>📍 Domicilio:</strong> <br />
//                       Parroquia: {apply.User.parroquia?.parroquia}.{" "}
//                       {apply.User.esInfo.address}.
//                     </p>
//                     <p className="text-gray-600 md:text-1x1">
//                       <strong>🗓️ Fecha de nacimiento:</strong>{" "}
//                       {new Date(apply.User.birthdate).toLocaleDateString()}
//                     </p>
//                     <p className="text-gray-600 md:text-1x1">
//                       <strong>✔️Edad:</strong>{" "}
//                       {apply.User.birthdate &&
//                         calcularEdad(apply.User.birthdate)}
//                     </p>
//                   </div>
//                 </div>

//                 <div>
//                   <h2 className="font-bold text-gray-700 mb-1 text-center text-lg md:xl lg:text-2xl">
//                     INFORMACION ACADEMICA 📚
//                   </h2>

//                   <div className="flex flex-col p-2 gap-5 lg:flex-row">
//                     {/* lado izquierdo */}
//                     <div className="w-[100%] lg:w-[50%]">
//                       <p>
//                         <span className="font-semibold">
//                           Institución Educativa 🏛️{" "}
//                         </span>
//                         <br />
//                         <span className="">
//                           {apply.User.esInfo.institution.name}
//                         </span>
//                       </p>

//                       <div>
//                         <p className="font-semibold">Carrera 🧑🏽‍🎓 </p>
//                         <p className="font-bold text-white">
//                           <span className="bg-black">
//                             {apply.User.esInfo.career.name}
//                           </span>
//                         </p>
//                       </div>

//                       <h4 className="text-lg font-medium text-gray-700 mb-1">
//                         Habilidades 📝
//                       </h4>
//                       <ul className="list-disc list-inside">
//                         {apply.User.esInfo.skills.map((skill, index) => (
//                           <li key={index} className="text-gray-600">
//                             {skillFormated[skill]}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>

//                     {/* lado derecho */}
//                     <div className="w-[100%] lg:w-[50%]">
//                       <h4 className="text-lg font-medium text-gray-700 mb-1">
//                         Descripcion 📋
//                       </h4>
//                       <p className="text-justify">
//                         {apply.User.esInfo.description}
//                       </p>
//                       <h4 className="text-lg font-medium text-gray-700 mb-1">
//                         Curriculum 📄
//                       </h4>
//                       <a
//                         href={apply.User.esInfo.curriculum}
//                         target="_blank"
//                         className="text-blue-500"
//                       >
//                         Ver Curriculum
//                       </a>
//                     </div>
//                   </div>
//                 </div>

//                 <div
//                   className={`p-2 m-2 text-center mx-auto bg-${
//                     ofertsStatus.find((e) => e.key === apply.status)?.color
//                   }-100 w-[100%]`}
//                 >
//                   <p
//                     className={`text-${
//                       ofertsStatus.find((e) => e.key === apply.status)?.color
//                     }-500 font-extrabold p-2`}
//                   >
//                     {"Estado de la Oferta: "}
//                     {ofertsStatus.find((e) => e.key === apply.status)?.name}
//                   </p>
//                 </div>

//                 {/* //!BOTONES  */}

//                 <div className="flex flex-row items-center gap-2">
//                   {apply.status === "pendiente" ? (
//                     <>
//                       <button
//                         className="w-[100%] bg-green-600 hover:bg-green-900 text-white font-extrabold p-4 rounded-lg md:w-[50%]"
//                         onClick={() => updateStatus("aprobado", apply.id)}
//                       >
//                         Aprobar Solicitud
//                       </button>

//                       <button
//                         className="w-[100%] bg-red-600 hover:bg-red-900 text-white font-extrabold p-4 rounded-lg md:w-[50%]"
//                         onClick={() => updateStatus("rechazado", apply.id)}
//                       >
//                         Rechazar Solicitud
//                       </button>
//                     </>
//                   ) : (
//                     ""
//                   )}
//                 </div>
//               </div>
//             ))}





//           </div>
//         </>
//       ) : (
//         "No existe la oferta"
//       )}
//     </>
//   );
// }
