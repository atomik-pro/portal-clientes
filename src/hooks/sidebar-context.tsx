'use client';
import React, { createContext, useContext, useState } from 'react';

export type SidebarSection =
  | 'inicio'
  | 'creativos'
  | 'reporteria'
  | 'finanzas'
  | 'acuerdos'
  | 'solicitudes'
  | 'recursos'
  | 'archivos'
  | 'ajustes'
  | 'notificaciones';

interface SidebarContextValue {
  activeSection: SidebarSection;
  setActiveSection: (section: SidebarSection) => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<SidebarSection>('inicio');
  return (
    <SidebarContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar debe usarse dentro de SidebarProvider');
  return ctx;
}
