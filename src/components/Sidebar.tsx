'use client';

import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { useState } from 'react';
import { useSidebar } from '@/hooks/sidebar-context';
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
    avatar: '/team/equipo-cs.png',
    initials: 'CS',
    gmail: 'cs@atomik.pro',
    number: '+56 999 999 999'
  },
  {
    id: 2,
    name: 'Milaura',
    role: 'Country Manager',
    avatar: '/team/equipo-sales.png',
    initials: 'SM',
    gmail: 'sales@atomik.pro',
    number: '+56 988 888 888'
  },
  {
    id: 3,
    name: 'Génesis',
    role: 'Finance Manager',
    avatar: '/team/equipo-finance.png',
    initials: 'FM',
    gmail: 'finance@atomik.pro',
    number: '+56 977 777 777'
  }
];

type MenuItem = {
  name: string;
  icon: StaticImageData | string;
  key: import('@/hooks/sidebar-context').SidebarSection;
};
const menuItems: MenuItem[] = [
  { name: 'Inicio', icon: iconInicio, key: 'inicio' },
  { name: 'Creativos', icon: iconCreativos, key: 'creativos' },
  { name: 'Reportorio', icon: iconReportes, key: 'reporteria' },
  { name: 'Finanzas', icon: iconFinanzas, key: 'finanzas' },
  { name: 'Acuerdos', icon: iconLegales, key: 'acuerdos' },
  { name: 'Solicitudes', icon: iconSolicitar, key: 'solicitudes' },
  { name: 'Recursos', icon: iconRecursos, key: 'recursos' },
  { name: 'Mis archivos', icon: iconMisArchivos, key: 'archivos' }
];

const bottomItems: MenuItem[] = [
  { name: 'Mi equipo', icon: iconAjustes, key: 'ajustes' },
  { name: 'Noticias', icon: iconNotificaciones, key: 'notificaciones' }
];

export default function Sidebar() {
  const { activeSection, setActiveSection } = useSidebar();
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
              <button
                type="button"
                onClick={() => setActiveSection(item.key)}
                className={`flex w-full items-center gap-3 px-3 py-2 rounded-l-full text-sm font-medium transition-all duration-200 ${
                  activeSection === item.key
                    ? 'bg-atomik-gradient text-white shadow-lg'
                    : 'text-[#191919] hover:text-[#8D30FF]'
                }`}>
                <div className="flex-shrink-0">
                  <Image
                    src={item.icon}
                    alt=""
                    className={`h-5 w-5 ${activeSection === item.key ? 'brightness-0 invert' : 'brightness-0'}`}
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
              </button>
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
        <div
          className={`absolute bottom-full left-4 mb-2 bg-transparent  transition-all duration-300 ease-in-out ${
            showTeamDropdown && isExpanded
              ? 'opacity-100 visible translate-y-0'
              : 'opacity-0 invisible translate-y-2'
          }`}
          style={{ width: '240px', minHeight: '161px' }}>
          <div className="p-4 space-y-3">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className={`group relative flex items-center gap-3 transition-all duration-300 rounded-lg p-2 cursor-pointer overflow-hidden ${
                  showTeamDropdown ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  transitionDelay: showTeamDropdown
                    ? `${index * 100}ms`
                    : '0ms',
                  transform: showTeamDropdown
                    ? 'translateY(0)'
                    : 'translateY(10px)'
                }}>
                {/* Background gradient for hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#8D30FF] to-[#551D99] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out rounded-lg transform scale-95 group-hover:scale-100" />

                <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 relative z-10">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={37}
                    height={37}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 relative z-10">
                  <p className="text-xs font-medium text-[#191919] group-hover:text-white transition-colors duration-500 ease-out truncate">
                    {member.name}
                  </p>
                  <p className="text-xs text-gray-500 group-hover:text-white/80 transition-colors duration-500 ease-out truncate">
                    {member.role}
                  </p>
                </div>

                {/* Contact Icons - appear on hover */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-x-4 group-hover:translate-x-0 relative z-10">
                  {/* Gmail Icon */}
                  <button
                    className="w-6 h-6 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 ease-out shadow-sm hover:shadow-md"
                    style={{ transitionDelay: '100ms' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`mailto:${member.gmail}`, '_blank');
                    }}
                    title={`Enviar email a ${member.gmail}`}>
                    <svg
                      className="w-3 h-3 text-red-500 transition-colors duration-300"
                      viewBox="0 0 24 24"
                      fill="currentColor">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.910 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                    </svg>
                  </button>

                  {/* WhatsApp Icon */}
                  <button
                    className="w-6 h-6 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 ease-out shadow-sm hover:shadow-md"
                    style={{ transitionDelay: '200ms' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(
                        `https://wa.me/${member.number.replace(/\s+/g, '')}`,
                        '_blank'
                      );
                    }}
                    title={`Enviar WhatsApp a ${member.number}`}>
                    <svg
                      className="w-3 h-3 text-green-500 transition-colors duration-300"
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

        <ul className="space-y-2">
          {bottomItems.map((item) => (
            <li key={item.name}>
              {item.name === 'Mi equipo' ? (
                <div
                  className={`group flex items-center gap-3 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer relative ${
                    activeSection === item.key
                      ? 'bg-atomik-gradient text-white shadow-lg'
                      : 'text-[#191919] hover:text-white'
                  }`}>
                  {/* Background gradient for hover */}
                  <div
                    className={`absolute inset-0 rounded-full transition-all duration-200 ${
                      activeSection !== item.key
                        ? 'bg-gradient-to-r from-[#8D30FF] to-[#551D99] opacity-0 group-hover:opacity-100'
                        : ''
                    }`}
                    style={{ borderRadius: '25px' }}
                  />

                  <div className="flex-shrink-0 relative z-10">
                    <Image
                      src={item.icon}
                      alt=""
                      className={`h-5 w-5 transition-all duration-200 ${
                        activeSection === item.key
                          ? 'brightness-0 invert'
                          : 'brightness-0 group-hover:brightness-0 group-hover:invert'
                      }`}
                    />
                  </div>
                  <span
                    className={`whitespace-nowrap transition-all duration-300 relative z-10 ${
                      isExpanded
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-2'
                    } ${
                      activeSection === item.key
                        ? 'font-bold'
                        : 'font-medium group-hover:font-bold'
                    }`}>
                    {item.name}
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveSection(item.key)}
                  className={`flex w-full items-center gap-3 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeSection === item.key
                      ? 'bg-atomik-gradient text-white shadow-lg'
                      : 'text-[#191919] hover:text-[#8D30FF]'
                  }`}>
                  <div className="flex-shrink-0">
                    <Image
                      src={item.icon}
                      alt=""
                      className={`h-5 w-5 ${activeSection === item.key ? 'brightness-0 invert' : 'brightness-0'}`}
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
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
