import React, { ReactNode, useEffect, useState } from "react";
import { Info } from 'lucide-react';
import { useNavBar } from '@/context/NavBarContext';
import { useSession } from "next-auth/react";

interface InformativeHeaderProps {
  title: ReactNode;
  children: ReactNode;
}

export default function InformativeHeader({ title, children }: InformativeHeaderProps) {
  const [isSticky, setIsSticky] = useState(false);
  const threshold = 10;
  const { toggleNavBar, closeNavBar } = useNavBar();
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isSticky) closeNavBar();
  }, [isSticky, closeNavBar]);

  return (
    <header className={`w-full sticky top-0 transition-all ${
      isSticky ? 'z-30 shadow-md bg-white' : 'bg-gray-100'
    }`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 ${
        isSticky ? 'flex items-center justify-between' : 'space-y-4'
      }`}>
        <div className={`flex items-center ${isSticky ? 'w-auto' : 'w-full justify-between'}`}>
          {isSticky && (
            <button
              onClick={toggleNavBar}
              className="mr-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
          <h1 className={`font-bold tracking-tight text-gray-900 ${
            isSticky ? 'text-xl' : 'text-3xl'
          }`}>
            {typeof title === 'string' ? title.toUpperCase() : title}
          </h1>
          {isSticky && session?.user.picture && (
            <img
              src={session.user.picture}
              alt="User avatar"
              className="w-8 h-8 rounded-full ml-4"
            />
          )}
        </div>
        
        {!isSticky && (
          <div className="bg-white border-l-4 border-yellow-500 p-4 rounded-r-lg shadow-md">
            <div className="flex items-center mb-2">
              <Info className="text-yellow-500 mr-2" size={24} />
              <h2 className="text-lg font-semibold text-gray-800">Información Importante</h2>
            </div>
            <div className="text-gray-700 leading-relaxed">
              {children}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}