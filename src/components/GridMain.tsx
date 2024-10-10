import { ReactNode } from "react";

export default function GridMain({ children }: { children: ReactNode }) {
  return (
  <div className="m-0 p-0 w-[99%]">
    {children}
    </div>
    );
}
