"use client";
import ContainerWeb from "@/components/ContainerWeb";
import GridContainer from "@/components/GridContainer";
import GridMain from "@/components/GridMain";
import GridSecond from "@/components/GridSecond";
import Header from "@/components/Header";
import { useSession, signOut } from "next-auth/react";

export default function Register() {
  const { data: session } = useSession();

  return (
    <>
      <Header title={"alcaldia"} />
      <ContainerWeb>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GridMain>
            <GridContainer>dashboard</GridContainer>
          </GridMain>
          <GridSecond>
            <GridContainer>
              {session?.user?.email}
              <button
                className="w-full bg-gray-950 text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </GridContainer>
          </GridSecond>
        </div>
      </ContainerWeb>
    </>
  );
}
