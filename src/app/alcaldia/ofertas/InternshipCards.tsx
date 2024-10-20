// import { FaMoneyCheckAlt } from "react-icons/fa";
// import { cn } from "@/lib/utils";
// import { useRouter } from "next/navigation";
// import React from "react";
// import { Oval } from "react-loader-spinner";
// interface Internship {
//   handleDeleteApply: Function;
//   handleOficio: Function;
//   dependencia: {
//     name: string;
//     User: {
//       image: string;
//     };
//   };
//   id: number;
//   title: string;
//   description: string;
//   location: string;
//   type: "pasantia" | "servicio" | "proyecto";
//   imagen: string;
//   date: Date;
//   skills: string[];
//   status: string;
//   pay: boolean;
//   tutor: string;
//   loading: boolean;
//   _count: {
//     apply: number;
//     applicationApproved: number;
//   }
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

// export default function InternshipCards({
//   internships,
// }: {
//   internships: Internship[];
// }) {
//   const router = useRouter();
//   const InternshipCard: React.FC<{ internship: Internship}> = ({
//     internship,
//   }) => (
//     <div className="bg-white flex flex-col justify-center my-4 p-4 w-[98%] mx-auto shadow-md text-base text-justify rounded-lg lg:text-lg">
//       {/* //!codigo & num students que han apply  */}
//       <div className="flex flex-col lg:flex-row text-sm lg:gap-2">
//         <span className="flex mr-2 text-red-500">
//           <i>
//             Codigo de Oferta de Vacante:{" "}
//             {internship.type.substring(0, 3).toUpperCase() +
//               "-" +
//               new Date(internship.date).getFullYear() +
//               "-" +
//               internship.dependencia.name.substring(0, 3).toUpperCase() +
//               "-000" +
//               internship.id}

//           </i>
//         </span>

//         <span className="flex mr-2 gap-2 text-gray-500 lg:ml-auto">
//           {/* //! Han aplicado {internship._count.apply} 🧑🏽‍🎓 a esta Oferta de {internship.type === "pasantia" */}
//           Han aplicado {internship._count.apply} 🧑🏽‍🎓 a esta Oferta de{" "}
//           {internship.type === "pasantia"
//             ? "Pasantias"
//             : internship.type === "servicio"
//             ? "Servicio Comunitario"
//             : internship.type === "proyecto"
//             ? "Proyecto de Tesis"
//             : ""}
//         </span>
//       </div>

//       {/* //!internship.pay  */}
//       {internship.pay  && (
//         <span className="flex gap-2 mr-2 text-base font-bold text-green-500 lg:ml-auto">
//           {`Esta vacante ofrece incentivos`}
//           <FaMoneyCheckAlt style={{ color: "green" }} size={30} />
//         </span>
//       )}

//       <div className="">
//         <h3 className="text-center font-bold text-gray-800 text-lg md:text-justify sm:text-xl md:text-2xl lg:text-3xl">
//           {internship.title.toUpperCase()}
//         </h3>

//         <div className="flex flex-col items-center md:flex-row md:space-x-4">
//           {/* //! IMG */}
//           <div className="relative group m-1 p-1 mx-auto md:w-auto">
//             <img
//               className="flex h-20 w-20 rounded-full border-4 border-black-800 object-cover sm:h-40 sm:w-40"
//               src={internship.dependencia.User.image}
//               alt={`${internship.dependencia} logo`}
//             />
//           </div>

//           {/* //! INFO */}
//           <div className="m-1 p-1 word-wrap overflow-wrap w-[100%] md:w-[80%] mx-auto">
//             {/* <h3 className="text-center font-extrabold text-gray-800 mb-2 text-lg md:text-justify sm:text-xl md:text-2xl lg:text-3xl">
//                 {(internship.title).toUpperCase()}
//               </h3> */}
//             <p className="text-gray-600 mb-1 font-bold text-base sm:text-lg md:text-xl lg:text-2xl">
//               🏦 <i>{internship.dependencia.name.toUpperCase()}</i>
//             </p>
//             <p className="text-gray-600 text-justify md:text-1x1">
//               <strong>
//                 📍Ubicación de la institución a realizar la pasantia o Servicio
//                 Comunitario:
//               </strong>{" "}
//               <br />
//               {internship.location}
//             </p>
//           </div>
//         </div>

//         {/* //! INFO */}
//         <div className="m-1 p-1 word-wrap overflow-wrap h-[60%] md:w-[80%]">
//           <div className="flex flex-col my-2 gap-2 md:flex-row">
//             <div className="w-[100%] md:w-[100%]">
//               <span className="text-lg font-medium text-gray-700 mb-2">
//                 Estado de la Oferta:
//               </span>
//               <p className={`font-bold ${internship.status === "active" ? 'text-green-500':'text-yellow-500'}`}>
//                 {internship.status === "active" ? "Activa ✅" : "Inactiva ⚠️"}
//               </p>
//             </div>
//             <div className="w-[100%] md:w-[100%]">
//               <span className="text-lg font-medium text-gray-700 mb-2">
//                 Tipo de Oferta:
//               </span>
//               <p>
//                 {internship.type === "pasantia"
//                   ? "Pasantias"
//                   : internship.type === "servicio"
//                   ? "Servicio Cominitario"
//                   : internship.type === "proyecto"
//                   ? "Proyecto de Tesis"
//                   : ""}
//               </p>
//             </div>
//             <div className="w-[100%] md:w-[100%]">
//               <span className="text-lg font-medium text-gray-700 mb-2">
//               {internship.type === "pasantia" ? 'Tutor Industrial:' : 'Responsable'}
//               </span>
//               <p>
//                 {internship.tutor?.length > 0 ? internship.tutor : "No asignado"}
//               </p>
//             </div>
//           </div>

//           {/* //! CONTAINER FLEX: OF SKILLS AND DESCRIPTION */}
//           <div className="flex flex-col justify-center gap-2 my-2 lg:flex-row">
//             <div className="m-1 w-[100%] lg:w-[40%]">
//               <h4 className="text-lg font-medium text-gray-700 mb-2">
//                 Habilidades requeridas 📝
//               </h4>
//               <ul className="list-disc list-inside">
//                 {internship.skills.map((skill, index) => (
//                   <li key={index} className="text-gray-600">
//                     {skillFormated[skill]}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="m-1 w-[100%] lg:w-[60%]">
//               <h4 className="text-lg font-medium text-gray-700 mb-2">
//                 Descripcion de la Vacante 📋
//               </h4>
//               <p>{internship.description}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* //!LA BOTONERA */}

//       <div className="flex flex-col justify-center md:flex-row">
//         <button
//           onClick={() => router.push("./ofertas/modificar/"+ internship.id)}
//           className="w-[100%] p-2 m-1 bg-green-700 hover:bg-green-800 text-white font-bold rounded transition duration-300 md:w-[50%]"
//         >
//           Modificar Oferta
//         </button>
//         <button
//           onClick={() => router.push("./ofertas/received/"+ internship.id)}
//           className="w-[100%] p-2 m-1 bg-blue-700 hover:bg-blue-900 text-white font-bold rounded transition duration-300 md:w-[50%]"
//         >
//           Solicitudes Recibidas y
//           <span className="block">Añadir o retirar Estudiante</span>
//         </button>
//         <button
//           onClick={() => internship.handleDeleteApply(internship.id, (internship.type).substring(0, 3).toUpperCase()+ "-"+ new Date(internship.date).getFullYear() +"-" +(internship.dependencia.name).substring(0, 3).toUpperCase() +"-000"+ internship.id)}
//           className="w-[100%] p-2 m-1 bg-red-500 hover:bg-red-600 text-white font-bold rounded transition duration-300 md:w-[50%]"
//         >
//           Eliminar Oferta
//         </button>
//         {!(internship._count.applicationApproved === 0) &&
//           <button
//           onClick={() => internship.handleOficio(internship.id)}
//           className={cn("w-[100%] p-1 m-1 text-white font-bold rounded transition duration-300 md:w-[50%]",
//            "bg-yellow-700 hover:bg-yellow-900")
//           }
//         >
//           Descargar Oficio
//         </button>
//         }

//       </div>

//       {internship.loading && ( // Muestra el loader si está cargando
//                   <div className="flex justify-center items-center flex-col mt-4">
//                     <Oval
//                       color="#000000"
//                       secondaryColor="#FFFFFF" // Color de fondo blanco
//                       height={50}
//                       width={50}
//                       strokeWidth={5}
//                     />
//                     <br />
//                     <span>Espere por favor...</span>
//                   </div>
//       )}

//     </div>
//   );

//  return (
//     <>
//       <div className="relative z-20 mx-auto py-2 rounded shadow w-[99%]">
//         {internships.map((internship) => (
//           <InternshipCard key={internship.id} internship={internship} />
//         ))}
//       </div>
//     </>
//   );
// }

import { FaMoneyCheckAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { Oval } from "react-loader-spinner";
import { FaEllipsisV } from "react-icons/fa"; // Asegúrate de instalar react-icons

interface Internship {
  handleDeleteApply: Function;
  handleCloseStatus: Function;
  handleOficio: Function;
  handleCloseApp: Function;
  dependencia: {
    name: string;
    User: {
      image: string;
    };
  };
  id: number;
  title: string;
  description: string;
  location: string;
  type: "pasantia" | "servicio" | "proyecto";
  imagen: string;
  date: Date;
  skills: string[];
  status: string;
  pay: boolean;
  tutor: string;
  loading: boolean;
  apply: [];
  _count: {
    apply: number;
    applicationApproved: number;
  };
}

const skillFormated: { [key: string]: string } = {
  resoluciondeproblemas: "Resolucion de problemas",
  trabajoenequipo: "Trabajo en equipo",
  adaptabilidad: "Adaptabilidad",
  comunicacionefectiva: "Comunicación efectiva",
  liderazgo: "Liderazgo",
  pensamientocritico: "Pensamiento crítico",
  orientacionaresultados: "Orientación a resultados",
  creatividad: "Creatividad",
  gestiondeltiempo: "Gestión del tiempo",
  aprendizajecontinuo: "Aprendizaje continuo",
  dondegente: "Don de gente",
  ensenanza: "Enseñanza",
  sociable: "Sociable",
  salud: "Salud",
  deportes: "Deportes",
  logistica: "Logística",
  expresionesartisticas: "Expresiones artísticas",
  diseno: "Diseño",
  musica: "Música",
  ingles: "Inglés",
  otrosidiomasnaturales: "Otros idiomas naturales",
  lenguajesdeprogramacion: "Lenguajes de programación",
};

export default function InternshipCards({
  internships,
}: {
  internships: Internship[];
}) {
  const router = useRouter();

  const InternshipCard: React.FC<{ internship: Internship }> = ({
    internship,
  }) => {
    const [menuOpen, setMenuOpen] = useState(false); // Estado para manejar la apertura del menú

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    const menuRef = useRef<HTMLDivElement>(null); // Crear un ref para el menú
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          setMenuOpen(false); // Cerrar el menú si se hace clic fuera
        }
      };

      // Agregar el listener
      document.addEventListener("mousedown", handleClickOutside);

      // Limpiar el listener al desmontar
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div className="bg-white flex flex-col justify-center my-4 p-4 w-[98%] mx-auto shadow-md text-base text-justify rounded-lg lg:text-lg md:p-10">
        {/* //!codigo & num students que han apply */}

        {/* BOTONERA + CODE + STUDENTS + PAY */}
        <div className="w-[100%] flex flex-row gap-2 text-sm">
          {/* CODE + STUDENTS + PAY  */}
          <div className="w-[80%] flex flex-col text-sm my-4">
            <span className="flex text-red-500">
              <i>
                Codigo de Oferta de Vacante:{" "}
                {internship.type.substring(0, 3).toUpperCase() +
                  "-" +
                  new Date(internship.date).getFullYear() +
                  "-" +
                  internship.dependencia.name.substring(0, 3).toUpperCase() +
                  "-000" +
                  internship.id}
              </i>
            </span>

            <span className="flex text-gray-500">
              Han aplicado {internship._count.apply} 🧑🏽‍🎓 a esta Oferta de{" "}
              {internship.type === "pasantia"
                ? "Pasantias"
                : internship.type === "servicio"
                ? "Servicio Comunitario"
                : internship.type === "proyecto"
                ? "Proyecto de Tesis"
                : ""}
            </span>
            {/* //!internship.pay */}
            {internship.pay && (
              <span className="flex text-base font-bold text-green-500">
                {`Esta vacante ofrece incentivos`}
                <FaMoneyCheckAlt style={{ color: "green" }} size={30} />
              </span>
            )}
          </div>

          {/* BOTONETA */}
          <div className="ml-auto p-2" ref={menuRef}>
            {" "}
            {/* Menú de opciones (hamburguesa vertical) */}
            <div className="relative">
              {/* Botón del menú */}
              <button
                onClick={toggleMenu}
                className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
              >
                <FaEllipsisV className="text-gray-700" />
              </button>

              {/* Menú desplegable */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-[30vw] bg-white border rounded shadow-lg z-10">
                  <ul className="flex flex-col">
                    <li>
                      <button
                        onClick={() => {
                          router.push("./ofertas/received/" + internship.id);
                          setMenuOpen(false);
                        }}
                        className="w-full text-left p-2 hover:bg-gray-100"
                      >
                        Solicitudes Recibidas y Añadir o retirar Estudiante
                      </button>
                    </li>

                    {!(internship.status === "closed") && (
                      <>
                        <li>
                          <button
                            onClick={() => {
                              router.push(
                                "./ofertas/modificar/" + internship.id
                              );
                              setMenuOpen(false);
                            }}
                            className="w-full text-left p-2 hover:bg-gray-100"
                          >
                            Modificar Oferta
                          </button>
                        </li>

                        <li>
                          <button
                            onClick={() => {
                              internship.handleDeleteApply(
                                internship.id,
                                internship.type.substring(0, 3).toUpperCase() +
                                  "-" +
                                  new Date(internship.date).getFullYear() +
                                  "-" +
                                  internship.dependencia.name
                                    .substring(0, 3)
                                    .toUpperCase() +
                                  "-000" +
                                  internship.id
                              );
                              setMenuOpen(false);
                            }}
                            className="w-full text-left p-2 hover:bg-gray-100 text-red-600"
                          >
                            Eliminar Oferta
                          </button>
                        </li>

                        {internship._count.applicationApproved !== 0 && (
                          <li>
                            <button
                              onClick={() => {
                                internship.handleOficio(internship.id);
                                setMenuOpen(false);
                              }}
                              className="w-full text-left p-2 hover:bg-gray-100 text-yellow-600"
                            >
                              Descargar Oficio
                            </button>
                          </li>
                        )}
             
                        { (!(internship.apply.length > 0) && !(internship._count.applicationApproved === 0))
                
                        &&
                        
                        <li>
                          <button
                            onClick={() => 
                              //internship.handleDeleteApply()
                              internship.handleCloseStatus(
                                internship.id, 
                                internship.type.substring(0, 3).toUpperCase() +
                                "-" +
                                new Date(internship.date).getFullYear() +
                                "-" +
                                internship.dependencia.name
                                  .substring(0, 3)
                                  .toUpperCase() +
                                "-000" +
                                internship.id
                              )
                              //TODO: ESTABLECER <MODAL QUE PREGUNTE SI ESTA SEGURO DE QUERER CERRAR ESTA OFERTA
                            }
                            className="w-full text-left p-2 hover:bg-gray-100 text-red-600"
                          >
                            Cerrar Oferta
                          </button>
                        </li>
                        
                        
                        }
                        
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="">
          <h3 className="text-center font-bold text-gray-800 text-lg md:text-justify sm:text-xl md:text-2xl lg:text-3xl">
            {internship.title.toUpperCase()}
          </h3>

          <div className="flex flex-col items-center md:flex-row md:space-x-4">
            {/* //! IMG */}
            <div className="relative group m-1 p-1 mx-auto md:w-auto">
              <img
                className="flex h-20 w-20 rounded-full border-4 border-black-800 object-cover sm:h-40 sm:w-40"
                src={internship.dependencia.User.image}
                alt={`${internship.dependencia} logo`}
              />
            </div>

            {/* //! INFO */}
            <div className="m-1 p-1 word-wrap overflow-wrap w-[100%] md:w-[80%] mx-auto">
              <p className="text-gray-600 mb-1 font-bold text-base sm:text-lg md:text-xl lg:text-2xl">
                🏦 <i>{internship.dependencia.name.toUpperCase()}</i>
              </p>
              <p className="text-gray-600 text-justify md:text-1x1">
                <strong>
                  📍Ubicación de la institución a realizar la pasantia o
                  Servicio Comunitario:
                </strong>{" "}
                <br />
                {internship.location}
              </p>
            </div>
          </div>

          {/* //! INFO */}
          <div className="m-1 p-1 word-wrap overflow-wrap h-[60%] md:w-[80%]">
            <div className="flex flex-col my-2 gap-2 md:flex-row">
              <div className="w-[100%] md:w-[100%]">
                <span className="text-lg font-medium text-gray-700 mb-2">
                  Estado de la Oferta:
                </span>
                <p
                  className={`font-bold ${
                    internship.status === "active"
                      ? "text-green-500"
                      : internship.status === "inactive"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {internship.status === "active"
                    ? "Activa ✅"
                    : internship.status === "closed"
                    ? "Cerrada 🚫"
                    : "Inactiva ⚠️"}
                </p>
              </div>
              <div className="w-[100%] md:w-[100%]">
                <span className="text-lg font-medium text-gray-700 mb-2">
                  Tipo de Oferta:
                </span>
                <p>
                  {internship.type === "pasantia"
                    ? "Pasantias"
                    : internship.type === "servicio"
                    ? "Servicio Comunitario"
                    : internship.type === "proyecto"
                    ? "Proyecto de Tesis"
                    : ""}
                </p>
              </div>
              <div className="w-[100%] md:w-[100%]">
                <span className="text-lg font-medium text-gray-700 mb-2">
                  {internship.type === "pasantia"
                    ? "Tutor Industrial:"
                    : "Responsable del Serv. Comunitario"}
                </span>
                <p>
                  {internship.tutor?.length > 0
                    ? internship.tutor
                    : "No asignado"}
                </p>
              </div>
            </div>

            {/* //! CONTAINER FLEX: OF SKILLS AND DESCRIPTION */}
            <div className="flex flex-col justify-center gap-2 my-2 lg:flex-row">
              <div className="m-1 w-[100%] lg:w-[40%]">
                <h4 className="text-lg font-medium text-gray-700 mb-2">
                  Habilidades requeridas 📝
                </h4>
                <ul className="list-disc list-inside">
                  {internship.skills.map((skill, index) => (
                    <li key={index} className="text-gray-600">
                      {skillFormated[skill]}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="m-1 w-[100%] lg:w-[60%]">
                <h4 className="text-lg font-medium text-gray-700 mb-2">
                  Descripción de la Vacante 📋
                </h4>
                <p>{internship.description}</p>
              </div>
            </div>
          </div>

       
            {(((internship.apply.length > 0)  || (internship._count.applicationApproved === 0)) && !(internship.status === 'closed'))
            &&
              
              <>
              <p>
              Para poder cambiar el estado de esta oferta a <span className="font-bold italic text-red-500"> "Cerrada"</span>,  
              al menos un estudiante debe haber iniciado (con aceptación del estudiante) o culminado el proceso de 
              pasantías o servicio comunitario. Además, debes haber gestionado todas las solicitudes que los 
              estudiantes hayan hecho para esta oferta. Es decir, debes 
              <span className="font-bold italic"> Aprobarlas, Rechazarlas</span> o si están 
              pendientes de aceptación por parte de los estudiantes, esperar a que todos respondan antes de 
              poder cerrarla.
              </p>
              </>
              }

          {/* Loader si está cargando */}
          {internship.loading && (
            <div className="flex justify-center items-center flex-col mt-4">
              <Oval
                color="#000000"
                secondaryColor="#FFFFFF" // Color de fondo blanco
                height={50}
                width={50}
                strokeWidth={5}
              />
              <br />
              <span>Espere por favor...</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="relative z-20 mx-auto py-2 rounded shadow w-[99%]">
        {internships.map((internship) => (
          <InternshipCard key={internship.id} internship={internship} />
        ))}
      </div>
    </>
  );
}
