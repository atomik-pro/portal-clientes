'use client';
import React, { useMemo, useState } from 'react';
import StatsCard from '@/components/StatsCard';

interface Transaction {
  id: string;
  date: string;
  concept: string;
  amount: number;
  type: 'income' | 'expense';
  status: 'paid' | 'pending' | 'failed';
}

const initialTransactions: Transaction[] = [
  {
    id: 'ATK001',
    date: '2025-10-01',
    concept: 'Pago campaña - Cliente X',
    amount: 100,
    type: 'income',
    status: 'paid'
  },
  {
    id: 'ATK002',
    date: '2025-10-03',
    concept: 'Compra creativos - Proveedor A',
    amount: 2000,
    type: 'expense',
    status: 'paid'
  },
  {
    id: 'ATK003',
    date: '2025-10-05',
    concept: 'Pago comisión - Equipo Sales',
    amount: 500,
    type: 'expense',
    status: 'pending'
  },
  {
    id: 'ATK004',
    date: '2025-10-09',
    concept: 'Cobro campaña - Cliente Y',
    amount: 100,
    type: 'income',
    status: 'paid'
  },
  {
    id: 'ATK005',
    date: '2025-10-12',
    concept: 'Reintegro financiero',
    amount: 100,
    type: 'income',
    status: 'failed'
  }
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(value);
}

// Eliminado StatusBadge no usado tras adaptar la tabla al estilo Figma

export default function FinanzasSection() {
  const [query, setQuery] = useState('');
  const totals = useMemo(() => {
    // Valores fijos para reflejar el layer de Figma de ejemplo
    const deudas = 300;
    const ganancias = 2500;
    const gananciasTotales = 5000;
    const cashFlow = 5000;
    return { deudas, ganancias, gananciasTotales, cashFlow };
  }, []);

  const filtered = useMemo(() => {
    if (!query) return initialTransactions;
    const q = query.toLowerCase();
    return initialTransactions.filter(
      (t) =>
        t.id.toLowerCase().includes(q) ||
        t.concept.toLowerCase().includes(q) ||
        t.date.toLowerCase().includes(q)
    );
  }, [query]);

  const hasError = query.length > 0 && filtered.length === 0;

  return (
    <div className="relative min-h-[calc(100vh-120px)]">
      {/* Contenedor principal blanco con borde redondeado como en Figma */}
      <div className="mx-5 my-4 bg-white rounded-[25px] shadow-md border border-gray-200">
        <div className="px-6 py-8 space-y-8">
          {/* Encabezado con acento izquierdo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-center gap-3">
              <span className="inline-block w-8 h-4 rounded-r-full bg-atomik-gradient" />
              <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-[#191919]">
                Finanzas
              </h1>
            </div>
            {/* Botón Filtros */}
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#8D30FF] text-white text-sm shadow hover:shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4">
                <path d="M3 4h18v2l-7 7v5l-4 2v-7L3 6V4z" />
              </svg>
              Filtros
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4">
                <path d="M8.12 9.29L12 13.17l3.88-3.88 1.41 1.41L12 16l-5.29-5.29z" />
              </svg>
            </button>
          </div>

          {/* Tarjetas de resumen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Deudas"
              value={formatCurrency(totals.deudas)}
              variant="white"
            />
            <StatsCard
              title="Ganancias"
              value={formatCurrency(totals.ganancias)}
              change="+10% al mes anterior"
              variant="white"
            />
            <StatsCard
              title="Ganancias totales"
              value={formatCurrency(totals.gananciasTotales)}
              change="+15% al mes anterior"
              variant="white"
            />
            {/* Presupuesto card personalizado */}
            <div className="relative bg-white rounded-[25px] p-6 shadow-md hover:shadow-lg border border-gray-200">
              <h3 className="text-lg font-bold text-[#8D30FF] tracking-wide mb-3">
                Presupuesto
              </h3>
              <div className="grid grid-cols-2 gap-4 items-center">
                <ul className="space-y-2 text-[#191919] text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8D30FF]" />
                    Banner display
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8D30FF]" />
                    Rich Media
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8D30FF]" />
                    Video Pro.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8D30FF]" />
                    Push Notification
                  </li>
                </ul>
                <div className="flex items-center justify-center">
                  {/* Ring */}
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      stroke="#EAEAEA"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      stroke="#8D30FF"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray="326"
                      strokeDashoffset="40"
                      strokeLinecap="round"
                    />
                    <text
                      x="60"
                      y="54"
                      textAnchor="middle"
                      fontSize="10"
                      fill="#7A7A7A">
                      Total invertido
                    </text>
                    <text
                      x="60"
                      y="76"
                      textAnchor="middle"
                      fontSize="16"
                      fontWeight="700"
                      fill="#191919">
                      {formatCurrency(totals.gananciasTotales)}
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-xl font-bold tracking-wide text-[#8D30FF]">
            Desglose
          </h3>
          {/* Estado de búsqueda vacía */}
          {hasError ? (
            <div className="relative bg-white/20 backdrop-blur-md rounded-[25px] border border-white/40 shadow-lg p-10 flex flex-col items-center justify-center text-center">
              <div className="mb-4 p-4 rounded-2xl bg-atomik-gradient text-white shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm7 14.586l3.707 3.707-1.414 1.414L15.586 18A9.953 9.953 0 0110 20a10 10 0 1110-10 9.953 9.953 0 01-3.414 7.586z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Sin resultados
              </h2>
              <p className="text-sm text-gray-600">
                No encontramos transacciones para `&quot;{query}&quot;`. Intenta
                con otro término o limpia el filtro.
              </p>
              <button
                className="mt-6 px-4 py-2 rounded-[20px] bg-white/30 text-gray-800 border border-white/40 hover:bg-white/40 transition"
                onClick={() => setQuery('')}>
                Limpiar filtro
              </button>
            </div>
          ) : (
            // Tabla de transacciones - estilo Figma
            <div className="relative rounded-[25px] overflow-hidden mx-1">
              {/* Header de tabla */}
              <div className="bg-white border-x border-b border-gray-200 rounded-b-[25px]">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="px-6 py-4 bg-atomik-gradient-inverse text-white rounded-t-[15px]">
                        <th className="py-3 px-4">ID</th>
                        <th className="py-3 px-4">Anunciante</th>
                        <th className="py-3 px-4">Referencia</th>
                        <th className="py-3 px-4">Formato</th>
                        <th className="py-3 px-4">Fecha de inicio</th>
                        <th className="py-3 px-4">Fecha de fin</th>
                        <th className="py-3 px-4">Inversión</th>
                        <th className="py-3 px-4">Estado</th>
                        <th className="py-3 px-4">Facturación</th>
                        <th className="py-3 px-4">Fecha de factura</th>
                        <th className="py-3 px-4">Días de retraso</th>
                        <th className="py-3 px-4">Monto de Iva</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((t, idx) => (
                        <tr
                          key={t.id}
                          className={`${idx % 2 === 0 ? 'bg-[#F4ECFF]' : 'bg-white'} hover:bg-[#EEE2FF] transition text-center`}>
                          <td className="py-3 px-4 font-medium text-[#191919]">
                            {t.id}
                          </td>
                          <td className="py-3 px-4 text-[#4A4A4A]">
                            Coca-Cola
                          </td>
                          <td className="py-3 px-4 text-[#4A4A4A]">Navidad</td>
                          <td className="py-3 px-4 text-[#4A4A4A]">
                            Rich Media
                          </td>
                          <td className="py-3 px-4 text-[#4A4A4A]">
                            19 de jul 2025
                          </td>
                          <td className="py-3 px-4 text-[#4A4A4A]">
                            31 de jul 2025
                          </td>
                          <td className="py-3 px-4 text-[#4A4A4A]">
                            {formatCurrency(1000)}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 text-xs rounded-full bg-[#E9D8FF] text-[#8D30FF]">
                              Cobrado
                            </span>
                          </td>
                          <td className="py-3 px-4 text-[#4A4A4A]">A-123</td>
                          <td className="py-3 px-4 text-[#4A4A4A]">-</td>
                          <td className="py-3 px-4 text-[#4A4A4A]">-</td>
                          <td className="py-3 px-4 text-[#4A4A4A]">-</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Footer violeta suave */}
                <div className="h-8 bg-[#E9D8FF] rounded-b-[15px]" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
