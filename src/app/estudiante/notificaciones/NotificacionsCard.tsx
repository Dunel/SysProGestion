"use client";
import {
  FaClipboardCheck,
  FaTrashAlt,
  FaRegSadCry,
  FaRegLaughSquint,
  FaRegLaugh,
} from "react-icons/fa";

type Notificaciones = {
  action: "apply" | "reject" | "accept" | "proposal" | "delete";
  date: Date;
  application: {
    title: string;
    type: "servicio" | "pasantia" | "proyecto";
  };
};

export default function NotificationsCard(
  { noti }: { noti: Notificaciones },
  { index }: { index: number }
) {
  const actionDesc = {
    apply: "Aplicaste a",
    reject: "Rechazaron tú solicitud de",
    accept: "Tu has Aceptado la solicitud de",
    approve: "Dependencia a Aprobaron tú solicitud de",
    proposal: "Aplicaste a la propuesta de proyecto de",
    delete: "declinaste tú solicitud de",
  };

  const typeDesc = {
    servicio: "Servicio Comunitario",
    pasantia: "Pasantía",
    proyecto: "Proyecto",
  };
  
  return (
            <>
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
                                                        : <FaRegLaugh style={{ color: 'yellow' }} size={40}/> //approve
                                        }
                                </button>
                            </div>

                        </div>
               

         
            </>
  );
}
