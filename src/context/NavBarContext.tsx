"use client"
import React, { createContext, useState, useContext } from 'react';

interface NavBarContextType {
  isOpen: boolean;
  toggleNavBar: () => void;
  closeNavBar: () => void;
}

const NavBarContext = createContext<NavBarContextType | undefined>(undefined);

export const NavBarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavBar = () => setIsOpen(prev => !prev);
  let closeNavBar = () => setIsOpen(false);

  return (
    <NavBarContext.Provider value={{ isOpen, toggleNavBar, closeNavBar }}>
      {children}
    </NavBarContext.Provider>
  );
};

export const useNavBar = () => {
  const context = useContext(NavBarContext);
  
  if (context === undefined) {
    throw new Error('useNavBar must be used within a NavBarProvider');
  }
  return context;
};