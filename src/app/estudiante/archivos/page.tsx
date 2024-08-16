"use client";
import ContainerWeb from "@/components/ContainerWeb";
import GridContainer from "@/components/GridContainer";
import GridMain from "@/components/GridMain";
import GridSecond from "@/components/GridSecond";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function EstudianteProfil() {
  const { data: session, update } = useSession();
  const [imagePreview, setImagePreview] = useState(
    "/uploads/images/no-image.png"
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [pdfFileName, setPdfFileName] = useState("");

  const handleImageChange = async () => {
    try {
      if (selectedImage) {
        const formData = new FormData();
        formData.append("file", selectedImage);

        const response = await axios.post("/api/estudiante/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data?.fileUrl) {
          const uniqueUrl = `${
            response.data.fileUrl
          }?t=${new Date().getTime()}`;
          update({ picture: uniqueUrl });
        }
        console.log(response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error as Error);
      }
    }
  };

  const handlePdfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPdfFileName(file.name);
    }
  };

  useEffect(() => {
    if (session?.user?.picture && session.user.picture.length > 0) {
      setImagePreview(session.user.picture);
    }
  }, [session?.user?.picture]);

  return (
    <>
      <Header title={"Archivos"} subtitle={"aquí archivas cosas jjj"} />
      <ContainerWeb>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GridMain>
            <GridContainer>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  width={300}
                  height={300}
                  className="mx-auto my-4 w-[40%] h-auto md:w-[30%]"
                />
              )}
              <Label>
                Sube tu foto <mark> -Agr a la BBDD- </mark>{" "}
              </Label>
              <div className="w-[100%] m-2 dm:w-[50%] sm:w-[50%] ">
                <Input
                  type="file"
                  name="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setImagePreview(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                      setSelectedImage(file);
                    }
                  }}
                />
              </div>
              <Label>
                Sube tu currículum (Formato PDF) <mark> -Agr a la BBDD- </mark>{" "}
              </Label>
              <div className="w-[100%] m-2 dm:w-[50%] sm:w-[50%]">
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfChange}
                />
                {pdfFileName && (
                  <p className="my-4 text-center">
                    Archivo seleccionado: {pdfFileName}
                  </p>
                )}
              </div>
              <div className="w-[100%] m-2 dm:w-[50%] sm:w-[50%]">
                <button
                  className="bg-blue-500 text-white p-2 rounded-md"
                  onClick={handleImageChange}
                >
                  Subir
                </button>
              </div>
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
