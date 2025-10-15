'use client';

import Image from 'next/image';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import heroImg from '@/assets/images/inicio_sesion.png';
import iconUser from '@/assets/icons/icon-user.svg';
import iconPassword from '@/assets/icons/icon-password.svg';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: '/dashboard'
    });
    // Cuando redirect es true, NextAuth gestiona la navegación. Manejamos errores en caso de no redirigir:
    if (res && res.error) {
      setError('Credenciales inválidas. Intenta nuevamente.');
      setLoading(false);
    }
  };

  return (
    <main className="h-screen flex bg-white overflow-hidden">
      {/* Columna izquierda: formulario */}
      <section className="flex-1 flex items-center justify-center p-6 lg:p-10 min-w-0">
        <div className="w-full max-w-md">
          <h1 className="text-center text-3xl md:text-4xl font-bold text-[#191919]">
            INICIO DE SESIÓN
          </h1>
          <p className="text-center mt-2 text-sm text-gray-500">
            ¿Olvidaste tu contraseña?{' '}
            <a className="text-violet-600 font-bold hover:underline" href="#">
              Recupérala ahora
            </a>
          </p>
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <label className="block">
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Image
                    src={iconUser}
                    alt=""
                    className="h-5 w-5 text-gray-400"
                  />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-[#BB86FC]/25 pl-10 pr-4 py-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="Email"
                />
              </div>
            </label>

            <label className="block">
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Image
                    src={iconPassword}
                    alt=""
                    className="h-5 w-5 text-gray-400"
                  />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-[#BB86FC]/25 pl-10 pr-4 py-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="Contraseña"
                />
              </div>
            </label>

            {error && (
              <div className="text-red-600 text-sm" role="alert">
                {error}
              </div>
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-1/2 mt-2 rounded-xl bg-atomik-gradient px-4 py-4 font-bold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:opacity-60 transition-all duration-200">
                {loading ? 'Iniciando...' : 'Iniciar Sesión'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Columna derecha: imagen/branding */}
      <section className="relative hidden lg:block flex-shrink-0">
        <div className="h-full overflow-hidden rounded-l-3xl">
          <Image
            src={heroImg}
            alt="Bienvenido a Atomik"
            priority
            className="h-full w-auto object-cover"
          />
        </div>
      </section>
    </main>
  );
}
