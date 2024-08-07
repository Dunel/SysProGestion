import { ReactNode } from 'react';

/*interface ContainerWebProps {
  children: ReactNode;
}*/

const ContainerWeb = ({ children }: { children: ReactNode }) => {
    return (
      <div className="container mx-auto px-4 md:px-8 lg:px-20 py-8">
        {children}
      </div>
    );
  }
  
  export default ContainerWeb;
