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

const teamMembers = [
  {
    id: 1,
    name: 'Luz',
    role: 'CS Manager',
    avatar: '/team/luz.jpg',
    initials: 'L',
    gmail: 'luz@atomik.pro',
    number: '+56 999 999 999'
  },
  {
    id: 2,
    name: 'Ana',
    role: 'Designer',
    avatar: '/team/ana.jpg',
    initials: 'A',
    gmail: 'ana@atomik.pro',
    number: '+56 988 888 888'
  },
  {
    id: 3,
    name: 'Carlos',
    role: 'Developer',
    avatar: '/team/carlos.jpg',
    initials: 'C',
    gmail: 'carlos@atomik.pro',
    number: '+56 977 777 777'
  }
];

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
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);

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
      <div
        className="px-4 pb-4 relative"
        onMouseEnter={() => setShowTeamDropdown(true)}
        onMouseLeave={() => setShowTeamDropdown(false)}>
        {/* Team Dropdown */}
        {showTeamDropdown && (
          <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 z-50">
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-200 group cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium">
                    {member.initials}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium group-hover:text-white">
                      {member.name}
                    </p>
                    <p className="text-xs text-gray-500 group-hover:text-white/80">
                      {member.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {/* Gmail Icon */}
                    <button className="w-6 h-6 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <svg
                        className="w-4 h-4 text-red-500"
                        viewBox="0 0 24 24"
                        fill="currentColor">
                        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.910 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                      </svg>
                    </button>
                    {/* WhatsApp Icon */}
                    <button className="w-6 h-6 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <svg
                        className="w-4 h-4 text-green-500"
                        viewBox="0 0 24 24"
                        fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <ul className="space-y-2">
          {bottomItems.map((item) => (
            <li key={item.name}>
              {item.name === 'Mi equipo' ? (
                <div
                  className={`flex items-center gap-3 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
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
                </div>
              ) : (
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
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
