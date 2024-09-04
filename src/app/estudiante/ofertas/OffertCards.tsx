import React, { useState } from "react";

type Internship = {
  handleApply:Function,
  id: number;
  title: string;
  type: "pasantia" | "servicio" | "proyecto";
  description: string;
  skills: string[];
  date: Date;
  location: string;
  status: string;
  dependencia: {
    name: string;
    User: {
      image: string;
    };
  };
  apply: [
    {
      id: number;
      status: string;
    }
  ];
  _count: {
    apply: number;
  };
};

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

const statusFormated: { [key: string]: string } = {
  pendiente: "Pendiente",
  aceptado: "Aceptado",
  rechazado: "Rechazado",
  declinado: "Declinado",
  aprobado: "Aprobado",
};

const colorStatys = (status:string) => {

    let colorText =  status === "inactive" 
                      ? 'text-yellow-500'
                      : status === "active"
                          ? 'text-green-500'
                          : status === "close" ? 'inactive: "text-red-500': '';

  return colorText;
}
function formatearFechaYHora(fecha:Date) {
  const date = new Date(fecha);
  
  const año = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
  const dia = String(date.getDate()).padStart(2, '0');
  
  return `${año}/${mes}/${dia}`;
}

export default function InternshipCards({
  internships,
}: {
  internships: Internship[];
}) {
  const InternshipCard: React.FC<{ internship: Internship }> = ({
    internship,
  }) => (
    <div className="flex flex-col justify-center bg-white rounded-lg shadow-md m-4 mb-8 p-2 w-[90%] mx-auto my-5">
      <div className="flex">
        {/* //!ESTE CODE DEBERIA VENIR DE UN CAPO DE LA TABLA "ofertas" CUYA NOMENCLATURA SE CREA DE SEGUN EL TIPO DE OFERTA + ANO + ID   */}
       
        <span className="flex ml-2 p-1"> 
          <i>
            {internship.apply.length > 0 ? 'YA HAS APLICADO A ESTA OFERTA': null}
            {internship.apply[0].status === 'decline' ? 'HAS DECLINADO ESTA OFERTA': null}
          </i> 
       </span>

        <span className="flex  ml-auto p-1 text-red-500">
          Codigo de Oferta de Vacante: {"P-2024-000" + internship.id}
        </span>
      </div>
      
      <div className="flex mr-2">
        <span className="flex ml-auto p-1 text-red-500">
        Han aplicado: {internship._count.apply} estudiantes a esta Oferta de {internship.type}
        </span> 
      </div>

      <div className="flex flex-col items-center md:flex-row md:space-x-4">
        {/* //! IMG */}
        <div className="flex m-1 p-1 mx-auto h-[40%] md:w-[30%] lg:w-[20%]">
          <img
            src={internship.dependencia.User.image}
            alt={`${internship.dependencia} logo`}
            className="mx-auto w-60 h-60 object-cover rounded-full border-4 border-black-800 md:w-40 md:h-40"
          />
        </div>

        {/* //! INFO */}
        <div className="m-1 p-1 word-wrap overflow-wrap h-[60%] md:w-[80%]">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {internship.title}
          </h3>
          <p className="text-lg text-gray-600 mb-1">
            {" "}
            <i>{internship.dependencia.name}</i>
          </p>
          <p className="text-sm text-gray-500">📍{internship.location}</p>

          <div className="flex my-2 gap-2">
            <div className="w-[33%]">
                <span className="text-lg font-medium text-gray-700 mb-2">
                  Fecha de la Oferta:
                </span>
                <p>{ formatearFechaYHora(internship.date)}</p>
            </div>

            <div className="w-[33%]">
              <span className="text-lg font-medium text-gray-700 mb-2">
                Estado de la Oferta:
              </span>
              <p className={colorStatys(internship.status)} > <b> {internship.status}</b></p>
            </div>
            
            <div className="w-[33%]">
              <span className="text-lg font-medium text-gray-700 mb-2">
                Tipo de Oferta:
              </span>
              {/* //! ASI QUE NO DEBERIA SER {internship.type} DADO QUE EL TYPO DEL PROCEDIMIENTO LO DEFINE LA OFERTA NO EL QUE UN ESTUDIANTE APLIQUE A ELLA */}
              {/* //! PROYECTO DE TESIS DEBERIA ESTAR EN OFERTAS? NO LO CREO */}
              <p>
                {internship.type === "pasantia"
                  ? "Pasantias"
                  : internship.type === "servicio"
                  ? "Servicio Cominitario"
                  : internship.type === "proyecto"
                  ? "Proyecto de Tesis"
                  : ""}
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
                Descripcion de la Vacante 📋
              </h4>
              <p>{internship.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 w-[100%]">  
                      {internship.apply.length > 0 
                        ? null
                        : internship.status !== "inactive" && (
                     
                            <button
                              className="w-full bg-green-500 hover:bg-green-800 text-white  font-bold py-2 px-4 rounded md:w-[50%]"
                              onClick={() => internship.handleApply(internship.id)}
                              >   
                            Aplica a esta Oferta !!
                            </button>
                      
                          )
                                                
                        }
          </div>
    </div>
  );
  return (
    <>
      <div className="relative z-20 mx-auto py-2 rounded shadow w-[90%]">
        {internships.map((internship) => (
          <InternshipCard key={internship.id} internship={internship} />
        ))}
      </div>
    </>
  );
}
