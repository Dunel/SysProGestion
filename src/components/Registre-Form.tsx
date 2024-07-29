"use client";
import GridContainer from "@/components/GridContainer";

export default function RegisterForm({
  inputLabel,
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
          
  );
}
