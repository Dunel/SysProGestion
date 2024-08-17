"use client";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { data: session, status } = useSession();
  const [navigation, setNavigation] = useState([
    { name: "PRINCIPAL", href: "/", current: false },
    { name: "INICIAR SESIÓN", href: "/login", current: false },
  ]);

  const getLinks = () => {
    if (status !== "authenticated") return;

    if (session?.user.role === "estudiante") {
      setNavigation([
        { name: "PRINCIPAL", href: "/estudiante", current: false },
        { name: "MI PERFIL", href: "/estudiante/perfil", current: false },
<<<<<<< .merge_file_IYDPer
        { name: "SOLICITUDES", href: "/estudiante/apply", current: false },
=======
        { name: "OFERTAS DE VACANTES", href: "/estudiante/apply", current: false },
>>>>>>> .merge_file_gOLhj1
        {
          name: "MIS APLICACIONES A OFERTAS",
          href: "/estudiante/apply/misaplicaciones",
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
        { name: "PRINCIPAL", href: "/alcaldia", current: false },
        { name: "SOLICITUDES", href: "/alcaldia/apply", current: false },
        {
          name: "NOTIFICACIONES",
          href: "/alcaldia/notificaciones",
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
    <Disclosure as="nav" className="bg-gray-950 w-full h-auto min-h-[8vh]">
      {({ open }) => (
        <>
          <div className="mx-auto  px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
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
                      src="/logo.png"
                      alt="Your Company"
                    />
                  </Link>
                </div>

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          pathname === item.href
                            ? "bg-gray-900 text-white"
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
                    {session && (
                      <button
                        className={
                          "text-gray-300 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        }
                        onClick={() => signOut()}
                      >
                        CERRAR SESIÓN
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
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
              {session && (
                <button
                  className={
                    "text-gray-300 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  }
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
