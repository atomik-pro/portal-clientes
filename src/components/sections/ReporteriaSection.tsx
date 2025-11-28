'use client';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';

interface ReportRow {
  id: string;
  advertiser: string;
  reference: string;
  format: string;
  startDate: string;
  endDate: string;
  revenue: number;
  testigo: string;
  metrics: string;
  closeCampaign: string;
}

const initialReports: ReportRow[] = [
  {
    id: 'ATK2345',
    advertiser: 'Coca-Cola',
    reference: 'COCACOLA2025',
    format: 'Rich Media',
    startDate: '19 de jul 2025',
    endDate: '31 de jul 2025',
    revenue: 150000,
    testigo: 'activo',
    metrics: '320',
    closeCampaign: '31 de jul 2025'
  },
  {
    id: 'ATK2366',
    advertiser: 'Bimbo',
    reference: 'BIMBO2025',
    format: 'Banner Display',
    startDate: '20 de jul 2025',
    endDate: '30 de jul 2025',
    revenue: 98000,
    testigo: 'finalizado',
    metrics: '140',
    closeCampaign: '30 de jul 2025'
  }
];

function formatNumber(n: number) {
  return new Intl.NumberFormat('es-ES').format(n);
}

export default function ReporteriaSection() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query) return initialReports;
    const q = query.toLowerCase();
    return initialReports.filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.reference.toLowerCase().includes(q) ||
        r.format.toLowerCase().includes(q)
    );
  }, [query]);

  const hasError = query.length > 0 && filtered.length === 0;

  return (
    <div className="relative min-h-[calc(100vh-120px)]">
      <div className="mx-5 my-4 bg-white rounded-[25px] shadow-md border border-gray-200">
        <div className="px-6 py-8 space-y-8">
          {/* Encabezado */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-block w-8 h-4 rounded-r-full bg-atomik-gradient" />
              <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-[#191919]">
                Campañas
              </h1>
            </div>
            {/* Filtros */}
            <div className="flex items-center gap-2">
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
          </div>
          {/* Estado de búsqueda vacía (5_Reporteria - SearchError) */}
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
                No encontramos campañas para “{query}”. Intenta con otro término
                o limpia el filtro.
              </p>
              <button
                className="mt-6 px-4 py-2 rounded-[20px] bg-white/30 text-gray-800 border border-white/40 hover:bg-white/40 transition"
                onClick={() => setQuery('')}>
                Limpiar filtro
              </button>
            </div>
          ) : (
            <div className="relative rounded-[25px] overflow-hidden mx-1">
              <div className="bg-white border-x border-b border-gray-200 rounded-b-[25px]">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="px-6 py-4 bg-atomik-gradient-inverse text-white rounded-t-[15px]">
                        <th className="py-3 px-4">ID</th>
                        <th className="py-3 px-4">Anunciante</th>
                        <th className="py-3 px-4">Referencia</th>
                        <th className="py-3 px-4">Formato</th>
                        <th className="py-3 px-4">Inversión</th>
                        <th className="py-3 px-4">Fecha de inicio</th>
                        <th className="py-3 px-4">Fecha de fin</th>
                        <th className="py-3 px-4">Testigos</th>
                        <th className="py-3 px-4">Métricas</th>
                        <th className="py-3 px-4">Cierre de campaña</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((r, idx) => (
                        <tr
                          key={r.id}
                          className={`${idx % 2 === 0 ? 'bg-[#F4ECFF]' : 'bg-white'} hover:bg-[#EEE2FF] transition text-center`}>
                          <td className="py-3 px-4 font-medium text-[#191919]">
                            {r.id}
                          </td>
                          <td className="py-3 px-4 text-[#4A4A4A]">
                            {r.advertiser}
                          </td>
                          <td className="py-3 px-4 text-[#4A4A4A]">
                            {r.reference}
                          </td>
                          <td className="py-3 px-4 text-[#4A4A4A]">
                            {r.format}
                          </td>
                          <td className="py-3 px-4 text-[#4A4A4A]">
                            {formatNumber(r.revenue)}
                          </td>
                          <td className="py-3 px-4 text-[#4A4A4A]">
                            {r.startDate}
                          </td>
                          <td className="py-3 px-4 text-[#4A4A4A]">
                            {r.endDate}
                          </td>
                          <td className="py-3 px-4">
                            <Link
                              className="px-2 py-1 text-xs rounded-full bg-[#8D30FF] text-white font-bold"
                              href={`${r.testigo}`}>
                              Ver Testigos
                            </Link>
                          </td>
                          <td className="py-3 px-4">
                            <Link
                              className="px-2 py-1 text-xs rounded-full bg-[#8D30FF] text-white font-bold"
                              href={`${r.metrics}`}>
                              Ir a Dashboard
                            </Link>
                          </td>
                          <td className="py-3 px-4">
                            <Link
                              className="px-2 py-1 text-xs rounded-full bg-[#8D30FF] text-white font-bold"
                              href={`${r.closeCampaign}`}>
                              Descargar
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="h-8 bg-[#E9D8FF] rounded-b-[15px]" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
