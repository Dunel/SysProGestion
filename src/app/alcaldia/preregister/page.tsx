"use client";
import { useState } from "react";
import Header from "@/components/Header";
import ContainerWeb from "@/components/ContainerWeb";
import { useRouter } from "next/navigation";
import GridMain from "@/components/GridMain";
import GridSecond from "@/components/GridSecond";
import GridContainer from "@/components/GridContainer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Plus, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ListPreRegister from "@/components/ListPreRegister";

export default function EstudentManagement() {
  const router = useRouter();
  return (
    <>
      <Header
        title={"Gestion de Estudiantes"}
        subtitle={"Registrar, editar, borrar"}
      />
      <ContainerWeb>
        <div className="grid grid-cols-1 gap-2 items-start">
          <GridMain>
            <GridContainer>
              <ListPreRegister/>
            </GridContainer>
          </GridMain>
        </div>
      </ContainerWeb>
    </>
  );
}
