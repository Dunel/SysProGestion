"use client";
import ContainerWeb from "@/components/ContainerWeb";
import GridContainer from "@/components/GridContainer";
import GridMain from "@/components/GridMain";
import GridSecond from "@/components/GridSecond";
import Header from "@/components/Header";


export default function RegisterForm({
  inputLabel,
  title,
  titleButton,
  setMailFunc,
  sendMailFunc,
}: {
  inputLabel: string;
  title: string;
  titleButton: string;
  setMailFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sendMailFunc: () => void;
}) {

  return (
    <>
      <Header title={title} />
      <ContainerWeb>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GridMain>
            <GridContainer>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                {inputLabel}
              </label>

              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={setMailFunc}
              />
              <button
                className="bg-gray-800 text-white text-sm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-4"
                onClick={sendMailFunc}
              >
                {titleButton}
              </button>

            </GridContainer>
          </GridMain>
          <GridSecond>
            <GridContainer>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere
              rem dolores porro illum, necessitatibus ratione veniam
              exercitationem excepturi voluptatem totam ipsam eveniet
              consequatur incidunt quidem repellendus error accusantium nulla ea
              similique sint dicta quis blanditiis, voluptate vero! Recusandae
              eaque laudantium ad nulla expedita saepe ex animi doloribus, aut
              dicta odit tenetur? Maxime magnam maiores aliquid iure laudantium
              in obcaecati earum.
            </GridContainer>
          </GridSecond>
        </div>
      </ContainerWeb>
    </>
  );
}
