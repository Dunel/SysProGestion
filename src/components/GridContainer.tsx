import { ReactNode } from 'react';

export default function GridContainer({ children }: { children: ReactNode }) {
    return (
      <div className="bg-white w-full md:p-4 rounded">
        {children}
      </div>
    );
  }