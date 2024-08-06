import { ReactNode } from "react";

export default function Header({ title }: { title: ReactNode }) {
  return (
    <header className="shadow min-w-[100vw]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-20">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-justify">
          <i>{title}</i>
        </h1>
      </div>
    </header>
  );
}
