"use client";
import { FaClipboardCheck, FaTrashAlt, FaRegSadCry, FaRegLaughSquint } from 'react-icons/fa';

type Notificaciones = {
    action: "apply" | "reject" | "accept" | "proposal" | "delete";
    date: Date;
    application: {
      title: string;
      type: "servicio" | "pasantia" | "proyecto";
    };
  };

export default function NotificationsCard({noti}: {noti: Notificaciones}, {index}:{index: number}) {
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
                        <div className="flex flex-row">

                            <div className="flex-col w-[80%]">
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


                            <div className="flex justify-center w-[20%]">
                                <button
                                    className="m-2 text-white hover:text-red-300">
                                        {
                                            noti.action === 'delete' 
                                            ? <FaTrashAlt style={{ color: 'red' }} size={40}/>
                                            : noti.action === 'apply' 
                                                ? <FaClipboardCheck style={{ color: 'green' }} size={40}/>
                                                : noti.action === 'accept' 
                                                    ? <FaRegLaughSquint style={{ color: 'green' }} size={40}/> 
                                                    :noti.action === 'reject' 
                                                        ? <FaRegSadCry style={{ color: 'red' }} size={40}/> 
                                                        :''
                                        }
                                </button>
                            </div>

                        </div>
                    </div>
                   
                

        {/* </div> */}

         
    </>
  );
}
