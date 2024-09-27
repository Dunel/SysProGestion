"use client";
import {
  FaClipboardCheck,
  FaTrashAlt,
  FaRegSadCry,
  FaRegLaughSquint,
  FaRegLaugh
} from "react-icons/fa";

type Notificaciones = {
  application: { title: string; type: "servicio" | "pasantia" | "proyecto" };
  action: string;
  date: Date;
  userCedula: string;
};

export default function NotificationsCard({
  notificaciones,
}: {
  notificaciones: Notificaciones[];
}) {
  const actionDesc: { [key: string]: string } = {
    apply: "Aplicó a",
    reject: "le Rechazaste su solicitud de",
    accept: "Aceptó la solicitud de",
    approve: "Aprobaste la solicitud de",
    proposal: "propuesta de proyecto de",
    delete: "declinó la solicitud de",
  };

  const typeDesc: { [key: string]: string } = {
    servicio: "Servicio Comunitario",
    pasantia: "Pasantía",
    proyecto: "Proyecto",
  };
  return (
    <div className="flex flex-col justify-center items-center">
      {notificaciones.map((noti, index) => (
        <div
          key={index}
          className="w-full flex flex-col justify-center m-2 p-2 bg-[#c2dded62] shadow-md md:w-[80%]"
        >
          <div className="flex flex-row">
            <div className="flex-col w-[80%]">
              <div className="flex flex-col">

                                  <p className="text-lg text-gray-600 mb-1">
                                  <span>{`${noti.action === 'create' 
                                          ? '' 
                                          : noti.action === 'update' 
                                          ? '' 
                                          : noti.action === 'update' 
                                          ?'' 
                                          : noti.action === 'reject' 
                                          ?`A el estudiante con Cedula de Identidad No. ${noti.userCedula}`
                                          : noti.action === 'approve' 
                                          ?''  
                                          : `El estudiante con Cedula de Identidad No. ${noti.userCedula}`}`
                                          }
                                  </span>{' '}
                                        {actionDesc[noti.action as keyof typeof actionDesc]}
                                        {`${noti.action === 'create' 
                                          ? 'Creaste' 
                                          : noti.action === 'update' ?'Actualizaste oferta de' 
                                          : ''}`}
                                      
                                         <strong> {' '}{typeDesc[noti.application.type as keyof typeof typeDesc]} </strong> nombrada: <i className="text-green-800 font-bold">{noti.application.title}.</i>
                                    </p>
              </div>
              <div className="flex flex-col">
                <p className="text-lg text-gray-600 mb-1">
                  En fecha: {new Date(noti.date).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex justify-center w-[20%]">
              <button className="m-2 text-white hover:text-red-300">
                {noti.action === "delete" ? (
                  <FaRegSadCry style={{ color: "red" }} size={40} />
                ) : noti.action === "apply" ? (
                  <FaClipboardCheck style={{ color: "green" }} size={40} />
                ) : noti.action === "accept" ? (
                  <FaRegLaughSquint style={{ color: "green" }} size={40} />
                ) : noti.action === "reject" ? (
                  <FaTrashAlt style={{ color: "red" }} size={40} />
                ) : (
                  <FaRegLaugh style={{ color: "green" }} size={40} /> //approve
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
