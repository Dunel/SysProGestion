import { ReactNode } from "react";

export default function GridSecond({ children }: { children: ReactNode }) {
    return (
      <div className="md:col-span-1">
          {children}
      </div>
    );
  }