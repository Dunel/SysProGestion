import { ReactNode } from "react";

/*interface ContainerWebProps {
  children: ReactNode;
}*/

const ContainerWeb = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-[99%] mx-auto px-2 py-8">
      {children}
    </div>
  );
};

export default ContainerWeb;
