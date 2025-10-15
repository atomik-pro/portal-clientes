'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return; // Esperar a que cargue la sesión

    if (session) {
      redirect('/dashboard');
    } else {
      redirect('/auth/signin');
    }
  }, [session, status]);

  // Mostrar loading mientras se verifica la sesión
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Cargando...</p>
      </div>
    </div>
  );
}
