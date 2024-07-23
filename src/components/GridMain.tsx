import { ReactNode } from "react";

export default function GridMain({ children }: { children: ReactNode }) {
  return (
  <div className="md:col-span-2">
    {children}
    </div>
    );
}
