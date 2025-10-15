'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import iconInicio from '@/assets/icons/Inicio.svg';
import iconReportes from '@/assets/icons/Reportes.svg';
import iconRecursos from '@/assets/icons/Recursos.svg';
import iconSolicitar from '@/assets/icons/Solicitar.svg';
import iconCreativos from '@/assets/icons/Creativos.svg';
import iconFinanzas from '@/assets/icons/Finanzas.svg';
import iconLegales from '@/assets/icons/Legales.svg';
import iconMisArchivos from '@/assets/icons/Mis archivos.svg';
import iconAjustes from '@/assets/icons/ajustes.svg';
import iconNotificaciones from '@/assets/icons/notificaciones.svg';

const menuItems = [
  { name: 'Inicio', icon: iconInicio, href: '/dashboard' },
  { name: 'Creativos', icon: iconCreativos, href: '/creativos' },
  { name: 'Reportorio', icon: iconReportes, href: '/reportes' },
  { name: 'Finanzas', icon: iconFinanzas, href: '/finanzas' },
  { name: 'Acuerdos', icon: iconLegales, href: '/legales' },
  { name: 'Solicitudes', icon: iconSolicitar, href: '/solicitar' },
  { name: 'Recursos', icon: iconRecursos, href: '/recursos' },
  { name: 'Mis archivos', icon: iconMisArchivos, href: '/archivos' }
];

const bottomItems = [
  { name: 'Mi equipo', icon: iconAjustes, href: '/ajustes' },
  { name: 'Noticias', icon: iconNotificaciones, href: '/notificaciones' }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`rounded-3xl bg-white border-r border-gray-200 flex flex-col h-full transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}>
      {/* Navigation */}
      <nav className="flex-1 pl-4 pt-3">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-l-full text-sm font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? 'bg-atomik-gradient text-white shadow-lg'
                    : 'text-[#191919] hover:text-[#8D30FF]'
                }`}>
                <div className="flex-shrink-0">
                  <Image
                    src={item.icon}
                    alt=""
                    className={`h-5 w-5 ${pathname === item.href ? 'brightness-0 invert' : 'brightness-0'}`}
                  />
                </div>
                <span
                  className={`whitespace-nowrap transition-all duration-300 ${
                    isExpanded
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-2'
                  }`}>
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Items */}
      <div className="px-4 pb-4">
        <ul className="space-y-2">
          {bottomItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? 'bg-atomik-gradient text-white shadow-lg'
                    : 'text-[#191919] hover:text-[#8D30FF]'
                }`}>
                <div className="flex-shrink-0">
                  <Image
                    src={item.icon}
                    alt=""
                    className={`h-5 w-5 ${pathname === item.href ? 'brightness-0 invert' : 'brightness-0'}`}
                  />
                </div>
                <span
                  className={`whitespace-nowrap transition-all duration-300 ${
                    isExpanded
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-2'
                  }`}>
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
