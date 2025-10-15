'use client';

import { signOut } from 'next-auth/react';
import notificationIcon from '@/assets/icons/notificaciones.svg';
import ajustesIcon from '@/assets/icons/ajustes.svg';
import userIcon from '@/assets/icons/icon-user.svg';
import logoVioleta from '@/assets/logos/logo-violeta.svg';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white px-6 py-4 mb-2">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex-1">
          <Image src={logoVioleta} alt="Atomik" className="h-8 w-auto" />
        </div>
        {/* Search Bar */}
        <div className="flex-1 flex justify-center">
          <div className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Buscar"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex justify-end">
          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Image src={notificationIcon} alt="" className="h-5 w-5" />
          </button>

          {/* Settings */}
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Image src={ajustesIcon} alt="" className="h-5 w-5" />
          </button>
          {/* Profile */}
          <div className="flex items-center gap-3">
            <Image src={userIcon} alt="" className="h-5 w-5" />
            <button
              onClick={() => signOut()}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
