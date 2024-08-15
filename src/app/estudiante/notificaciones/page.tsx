"use client";
import ContainerWeb from "@/components/ContainerWeb";
import GridContainer from "@/components/GridContainer";
import GridMain from "@/components/GridMain";
import GridSecond from "@/components/GridSecond";
import Header from "@/components/Header";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

type Notificaciones = {
  action: "apply" | "reject" | "accept" | "proposal" | "delete";
  date: Date;
  application: {
    title: string;
    type: "servicio" | "pasantia" | "proyecto";
  };
};

export default function Page() {
  const { data: session } = useSession();
  const [notificaciones, setNotifcaciones] = useState<Notificaciones[]>();

  const getNotificaciones = async () => {
    try {
      const res = await axios.get("/api/estudiante/notifications");
      setNotifcaciones(res.data.notifications);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    }
  };
  useEffect(() => {
    getNotificaciones();
  }, []);

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
      <Header title={"NOTIFICACIONES"} subtitle={"aquí notifican cosas jjj"} />
      <ContainerWeb>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GridMain>
            <GridContainer>
              {notificaciones && notificaciones.length > 0 ? (
                notificaciones.map((noti, index) => (
                  <div key={index}>
                    <p>
                      {actionDesc[noti.action]}
                      <strong>
                        {" "}
                        {typeDesc[noti.application.type]}
                      </strong> de <strong>{noti.application.title}</strong>
                    </p>
                    <p>Fecha: {new Date(noti.date).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <GridContainer>
                  <p>No hay notificaciones disponibles</p>
                </GridContainer>
              )}
            </GridContainer>
          </GridMain>

          <GridSecond>
            <GridContainer>{session?.user?.email}</GridContainer>
          </GridSecond>
        </div>
      </ContainerWeb>
    </>
  );
}
