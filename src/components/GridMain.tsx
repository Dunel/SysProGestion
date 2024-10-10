import { ReactNode } from "react";

export default function GridMain({ children }: { children: ReactNode }) {
  return (
  <div className="w-[99%]">
    {children}
    </div>
    );
}
