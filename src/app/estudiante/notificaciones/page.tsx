"use client";
import GridContainer from "@/components/GridContainer";
import Header from "@/components/Header";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import NotificationsCard from "./NotificacionsCard";
import Skeleton from "@/components/ui/SkeletonComponentLines";

type Notificaciones = {
  action: "apply" | "reject" | "accept" | "proposal" | "delete";
  date: Date;
  application: {
    title: string;
    type: "servicio" | "pasantia" | "proyecto";
  };
};

export default function Page() {
  const [squeleton, setSqueleton] = useState(true);
  const [notificaciones, setNotifcaciones] = useState<Notificaciones[]>();

  const getNotificaciones = async () => {
    try {
      setSqueleton(true);
      const res = await axios.get("/api/estudiante/notifications");
      setNotifcaciones(res.data.notifications);
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

      {squeleton && <Skeleton />}
      <div className="flex flex-col items-center bg-white rounded-lg shadow-md m-4 mb-8 p-2 w-[90%] mx-auto my-5">
        {notificaciones && notificaciones.length > 0 ? (
          notificaciones.map((noti) => <NotificationsCard noti={noti} />)
        ) : (
          <GridContainer>
            <p>No hay notificaciones disponibles</p>
          </GridContainer>
        )}
      </div>
    </>
  );
}
