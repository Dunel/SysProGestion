// "use client";
// import { Disclosure } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import { signOut, useSession } from "next-auth/react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function Navbar() {
//   const { data: session, status } = useSession();
//   const [navigation, setNavigation] = useState([
//     { name: "PRINCIPAL", href: "/", current: false },
//     { name: "INICIAR SESIÓN", href: "/login", current: false },
//     { name: "REGÍSTRATE AQUÍ", href: "/register", current: false },
//   ]);

//   const getLinks = () => {
//     if (status !== "authenticated") return;

//     if (session?.user.role === "estudiante") {
//       setNavigation([
//         { name: "PRINCIPAL", href: "/estudiante", current: false },
//         { name: "MI PERFIL", href: "/estudiante/perfil", current: false },
//         {
//           name: "OFERTAS DE VACANTES",
//           href: "/estudiante/ofertas",
//           current: false,
//         },
//         {
//           name: "MIS APLICACIONES A OFERTAS",
//           href: "/estudiante/misaplicaciones",
//           current: false,
//         },
//         {
//           name: "NOTIFICACIONES",
//           href: "/estudiante/notificaciones",
//           current: false,
//         },
//       ]);
//     } else if (session?.user.role === "alcaldia") {
//       setNavigation([
//         { name: "PRINCIPAL", href: "/alcaldia", current: false },
//         { name: "MI PERFIL", href: "/alcaldia/perfil", current: false },
//         { name: "OFERTAS", href: "/alcaldia/ofertas", current: false },
//         {
//           name: "NOTIFICACIONES",
//           href: "/alcaldia/notificaciones",
//           current: false,
//         },
//         { name: "ESTUDIANTES", href: "/alcaldia/estudiantes", current: false },
//         {
//           name: "INSTITUCIONES",
//           href: "/alcaldia/instituciones",
//           current: false,
//         },
//         { name: "PREREGISTROS", href: "/alcaldia/preregister", current: false },
//         {name: "CARRERAS", href: "/alcaldia/career", current: false},
//       ]);
//     } else if (session?.user.role === "dependencia") {
//       setNavigation([
//         { name: "PRINCIPAL", href: "/dependencia", current: false },
//         { name: "MI PERFIL", href: "/dependencia/perfil", current: false },
//         {
//           name: "MIS OFERTAS",
//           href: "/dependencia/misofertas",
//           current: false,
//         },
//         {
//           name: "CREAR OFERTA",
//           href: "/dependencia/misofertas/crearoferta",
//           current: false,
//         },
//         {
//           name: "NOTIFICACIONES",
//           href: "/dependencia/notificaciones",
//           current: false,
//         },
//       ]);
//     }
//   };

"use client";

import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type NavItem = {
  name: string;
  href: string;
  current: boolean;
};

export default function Navbar() {
  const { data: session, status } = useSession();
  const [navigation, setNavigation] = useState<NavItem[]>([
    { name: "PRINCIPAL", href: "/", current: false },
    { name: "INICIAR SESIÓN", href: "/login", current: false },
    { name: "REGÍSTRATE AQUÍ", href: "/register", current: false },
  ]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getLinks = () => {
    if (status !== "authenticated") return;

    if (session?.user.role === "estudiante") {
      setNavigation([
        { name: "PRINCIPAL", href: "/estudiante", current: false },
        { name: "MI PERFIL", href: "/estudiante/perfil", current: false },
        {
          name: "OFERTAS DE VACANTES",
          href: "/estudiante/ofertas",
          current: false,
        },
        {
          name: "MIS APLICACIONES A OFERTAS",
          href: "/estudiante/misaplicaciones",
          current: false,
        },
        {
          name: "NOTIFICACIONES",
          href: "/estudiante/notificaciones",
          current: false,
        },
      ]);
    } else if (session?.user.role === "alcaldia") {
      setNavigation([
        { name: "MÉTRICAS", href: "/alcaldia", current: false },
        { name: "REPORTES", href: "/alcaldia/reportes", current: false },
        { name: "MI PERFIL", href: "/alcaldia/perfil", current: false },
        { name: "OFERTAS", href: "/alcaldia/ofertas", current: false },
        {
          name: "CREAR OFERTAS",
          href: "/alcaldia/ofertas/crearoferta",
          current: false,
        },
        {
          name: "NOTIFICACIONES",
          href: "/alcaldia/notificaciones",
          current: false,
        },
        { name: "ESTUDIANTES", href: "/alcaldia/estudiantes", current: false },
        {
          name: "INSTITUCIONES",
          href: "/alcaldia/instituciones",
          current: false,
        },
        { name: "PREREGISTROS", href: "/alcaldia/preregister", current: false },
        { name: "CARRERAS", href: "/alcaldia/career", current: false },
        { name: "LOGS", href: "/alcaldia/logs", current: false },
      ]);
    } else if (session?.user.role === "dependencia") {
      setNavigation([
        { name: "MÉTRICAS", href: "/dependencia", current: false },
        { name: "MI PERFIL", href: "/dependencia/perfil", current: false },
        {
          name: "MIS OFERTAS",
          href: "/dependencia/misofertas",
          current: false,
        },
        {
          name: "CREAR OFERTA",
          href: "/dependencia/misofertas/crearoferta",
          current: false,
        },
        {
          name: "NOTIFICACIONES",
          href: "/dependencia/notificaciones",
          current: false,
        },
      ]);
    }
  };

  useEffect(() => {
    getLinks();
  }, [status]);

  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="bg-gray-950 w-full h-auto min-h-[10%]">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* //! ICON PRINCIPAL HAMBURGUEZA Y CIERRE */}
              <div className="z-50 absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Abrir menu Principal</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <img
                      className="h-10 w-auto"
                      src="/logomaracaibo.png"
                      alt="Maracaibo"
                    />
                  </Link>
                </div>

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.slice(0, 4).map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          pathname === item.href
                            ? "bg-gray-900 text-white underline"
                            : "text-gray-300 hover:bg-gray-900 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={
                          pathname === item.href ? "page" : undefined
                        }
                      >
                        {item.name}
                      </Link>
                    ))}

                    {/* Dropdown for additional menu items */}
                    {status === "authenticated" && (
                      <div className="relative group" ref={dropdownRef}>
                        <div className="inline-flex items-center text-gray-300 hover:text-white cursor-pointer rounded-md px-3 py-2 text-sm font-medium">
                          <ChevronDownIcon className="h-5 w-5" />
                          <span className="ml-1">Más</span>
                        </div>
                        <div className="absolute right-0 z-50 hidden group-hover:block hover:block">
                          <div className="mt-2 py-2 bg-black rounded-md shadow-lg">
                            <div className="w-max">
                              {navigation.slice(4).map((item) => (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  className={classNames(
                                    pathname === item.href
                                      ? "bg-gray-900 text-white underline"
                                      : "text-gray-300 hover:bg-gray-900 hover:text-white",
                                    "block rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap"
                                  )}
                                >
                                  {item.name}
                                </Link>
                              ))}
                              <button
                                className="block w-full text-left text-gray-300 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap"
                                onClick={() => signOut()}
                              >
                                CERRAR SESIÓN
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="z-50 sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}

              {status === "authenticated" && (
                <button
                  className="w-full text-left text-gray-300 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-base font-medium"
                  onClick={() => signOut()}
                >
                  CERRAR SESIÓN
                </button>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
