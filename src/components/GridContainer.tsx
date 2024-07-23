import { ReactNode } from 'react';

export default function GridContainer({ children }: { children: ReactNode }) {
    return (
      <div className="bg-white p-6 md:p-10 rounded mb-8">
        {children}
      </div>
    );
  }