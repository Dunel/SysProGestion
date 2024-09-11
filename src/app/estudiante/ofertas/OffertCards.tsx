import React, { useState } from "react";
import {
  FaExclamation,
  FaFire,
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaMoneyCheckAlt 
} from "react-icons/fa";

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
    <div className="flex flex-col justify-center bg-white m-4 mb-8 mx-6 p-8 w-[90%] mx-auto my-5 shadow-md text-1xl text-justify rounded-lg lg:text-2xl">
      
      <div className="flex flex-col lg:flex-row mt-6 text-lg lg:gap-2">    
          <span className="flex mr-2 text-red-500">
             <i>
            Codigo de Oferta de Vacante: {(internship.type).substring(0, 3).toUpperCase()+ "-"+ new Date(internship.date).getFullYear() +"-" +(internship.dependencia.name).substring(0, 3).toUpperCase() +"-000"+ internship.id}
            </i> 
          </span>   
        { //!internship.pay
          true &&
            <span className="flex gap-2 mr-2 font-bold text-green-500 lg:ml-auto">
            Esta vacante ofrece incentivos
            <FaMoneyCheckAlt  style={{ color: 'green' }} size={30}/>  
          </span>
        }
      </div>

      <div className="flex ">
        <span className="flex mr-2 text-gray-500 text-lg lg:ml-auto">
        Han aplicado {internship._count.apply} 🧑🏽‍🎓 a esta Oferta de {internship.type === "pasantia"
                  ? "Pasantias"
                  : internship.type === "servicio"
                  ? "Servicio Comunitario"
                  : internship.type === "proyecto"
                  ? "Proyecto de Tesis"
                  : ""}
        </span> 
      </div>


      <div className="flex flex-col items-center md:flex-row md:space-x-4">
        
        {/* //! IMG */}
        <div className="flex m-1 md:w-[30%] lg:w-[20%]">
          <img
            src={internship.dependencia.User.image}
            alt={`${internship.dependencia} logo`}
            className="mx-auto w-60 h-60 object-cover rounded-full border-4 border-black-800 md:w-40 md:h-40"
          />
        </div>

        {/* //! INFO */}
        <div className="m-1 p-1 word-wrap overflow-wrap h-[60%] md:w-[80%]">
          <h3 className="text-xl text-center font-extrabold text-gray-800 mb-2 md:text-justify">
            {internship.title}
          </h3>
          <p className="text-2xl text-gray-600 mb-1 font-bold"> 
            {" "}
            <i>{internship.dependencia.name}</i>
          </p>
          <p className="text-xl text-gray-500">📍{internship.location}</p>

         
         
          <div className="flex flex-col my-2 gap-2 lg:flex-row">
           
            <div className="w-[100%] lg:w-[33%]">
                <span className="text-xl font-bold text-gray-700 mb-2">
                  Fecha de la Oferta:
                </span>
                <p>{ formatearFechaYHora(internship.date)}</p>
            </div>

            <div className="w-[100%] lg:w-[33%]">
              <span className="text-xl font-bold text-gray-700 mb-2">
                Estado de la Oferta:
              </span>
              <p className={colorStatys(internship.status)} > 
                <b> {
                    internship.status === "active" ? 'Activa ✅' 
                      : internship.status === "inactive" ? 'Inactiva ⚠️' : 'Cerrada ⛔'

                    }</b>
              </p>
            </div>
            
            <div className="w-[100%] md:w-[33%]">
              <span className="text-xl font-bold text-gray-700 mb-2">
                Tipo de Oferta:
              </span>
              {/* //! ASI QUE NO DEBERIA SER {internship.type} DADO QUE EL TYPO DEL PROCEDIMIENTO LO DEFINE LA OFERTA NO EL QUE UN ESTUDIANTE APLIQUE A ELLA */}
              {/* //! PROYECTO DE TESIS DEBERIA ESTAR EN OFERTAS? NO LO CREO */}
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
          </div>



          {/* //! CONTAINER FLEX: OF SKILLS AND DESCRIPTION */}
          <div className="flex flex-col justify-center gap-2 my-2 lg:flex-row">
            <div className="m-1 w-[100%] lg:w-[40%]">
              <span className="text-xl font-bold text-gray-700 mb-2">
                🤹🏽 Habilidades requeridas
              </span>   
              <ul className="list-disc list-inside">
                {internship.skills.map((skill, index) => (
                  <li key={index} className="text-gray-700">
                    {skillFormated[skill]}
                  </li>
                ))}
              </ul>
            </div>


            <div className="m-1 w-[100%] lg:w-[60%]">
              <span className="text-xl font-bold text-gray-700 mb-2">
              📋Descripcion de la Vacante 
              </span> 
              <p>{internship.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center p-2 mt-4 w-[100%]">  
                      
                      {internship.apply.length > 0 
                        ? <button
                        className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded  md:w-[50%]"
                        disabled>  
                          { internship.status === "inactive" 
                          ? <div className="flex gap-2 justify-center">
                          <span>OFERTA INACTIVA</span>
                          <FaExclamation  style={{ color: 'white' }} size={30}/>  
                        </div> 
                           : internship.apply.length > 0 && internship.apply[0]?.status != 'declinado'  
                                      ?  <div className="flex gap-2 justify-center">
                                      <span>YA HAS APLICADO A ESTA OFERTA</span>
                                      <FaRegThumbsUp style={{ color: 'white' }} size={30}/>  
                                    </div>
                                      :internship.apply[0]?.status === 'declinado' 
                                        ?   <div className="flex gap-2 justify-center">
                                              <span>HAS DECLINADO ESTA OFERTA</span>
                                              <FaRegThumbsDown style={{ color: 'white' }} size={30}/>  
                                            </div>
                                        :null                       
                            } 
                          
                         
                          </button>
                        : internship.status !== "inactive" 
                        ? (
                            <button
                              className="bg-green-400 relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] lg:w-[50%]"
                              onClick={() => internship.handleApply(internship.id)}
                              >   
                            
                                <div className="flex gap-2 justify-center">
                                  <span>APLICA A ESTA OFERTA!!</span>
                                  <FaFire style={{ color: 'white' }} size={30}/>  
                                </div>
                    
                                <BottomGradient />
                            </button>
              
                          )
                          :  internship.status === "inactive" && (
                     
                            <button
                              className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded md:w-[50%]"
                              disabled
                              >   
                                <div className="flex gap-2 justify-center">
                                  <span>OFERTA INACTIVA</span>
                                  <FaExclamation  style={{ color: 'white' }} size={30}/>  
                                </div>
                             
                            </button>
                      
                          )
                        }
          </div>
    </div>
  );
  return (
    <>
      <div className="flex-col justify-center items-center relative z-20 mx-auto py-2 rounded shadow w-[90%]">
        {internships.map((internship) => (
          <InternshipCard key={internship.id} internship={internship} />
        ))}
      </div>
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};


// w-full bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded md:w-[50%]