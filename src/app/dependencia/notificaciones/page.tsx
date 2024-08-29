"use client";
import GridContainer from "@/components/GridContainer";
import Header from "@/components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import NotificationsCard from "./NotificacionsCard";
import Skeleton from "@/components/ui/SkeletonComponentLines";
import ContainerWeb from "@/components/ContainerWeb";
import GridMain from "@/components/GridMain";

type Notificaciones = {
  application: { title: string; type: "servicio" | "pasantia" | "proyecto" };
  action: string;
  date: Date;
  userCedula: string;
};

export default function Page() {
  const [squeleton, setSqueleton] = useState(true);
  const [notificaciones, setNotifcaciones] = useState<Notificaciones[]>();

  const getNotificaciones = async () => {
    try {
      setSqueleton(true);
      const res = await axios.get("/api/dependencia/notifications");
      //console.log("res:", res.data);
      setNotifcaciones(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    } finally {
      setSqueleton(false);
    }
  };

  useEffect(() => {
    getNotificaciones();
  }, []);

  return (
    <>
      <Header
        title={"NOTIFICACIONES"}
        subtitle={
          "Aqui podras visualizar todas las notificaciones relacionadas con los procesos a los que aplicaste y eres parte interesada. Mantente informado!"
        }
      />
      <ContainerWeb>
        <GridMain>
          <GridContainer>
            {squeleton && <Skeleton />}
            {notificaciones && notificaciones.length > 0 ? (
              <NotificationsCard notificaciones={notificaciones} />
            ) : (
              !squeleton && <p>No hay notificaciones disponibles</p>
            )}
          </GridContainer>
        </GridMain>
      </ContainerWeb>
    </>
  );
}
