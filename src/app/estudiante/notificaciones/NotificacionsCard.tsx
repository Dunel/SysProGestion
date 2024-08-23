"use client";
import GridContainer from "@/components/GridContainer";
export default function NotificationsCard({noti}: {noti: any}, {index}:{index: any}) {
    const actionDesc = {
        apply: "Aplicaste a",
        reject: "Rechazaron tú solicitud de",
        accept: "Aceptaron tú solicitud de",
        proposal: "Aplicaste a la propuesta de proyecto de",
        delete: "Eliminaste tú solicitud de",
      };
    
      const typeDesc = {
        servicio: "Servicio Comunitario",
        pasantia: "Pasantía",
        proyecto: "Proyecto",
      };
  return (
    <>
                    <div key={index} className="w-full flex flex-col justify-center m-2 p-2 bg-[#c2dded62] shadow-md md:w-[80%]">
                        <div className="flex flex-col">
                            <p className="text-lg text-gray-600 mb-1">
                                {actionDesc[noti.action as keyof typeof actionDesc]}
                                <strong>{" "}{typeDesc[noti.application.type as keyof typeof typeDesc]}</strong> de <i>{noti.application.title}</i>
                            </p>
                           
                        </div>
                        <div className="flex flex-col">
                        <p className="text-lg text-gray-600 mb-1">En fecha: {new Date(noti.date).toLocaleString()}</p>
                        </div>
                    </div>
                   
                

        {/* </div> */}

         
    </>
  );
}
