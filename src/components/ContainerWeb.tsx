import { ReactNode } from 'react';

/*interface ContainerWebProps {
  children: ReactNode;
}*/

const ContainerWeb = ({ children }: { children: ReactNode }) => {
    return (
      <main className="container mx-auto px-4 md:px-8 lg:px-20 py-8">
        {children}
      </main>
    );
  }
  
  export default ContainerWeb;
