'use client';

import { useMemo, useState, useCallback } from 'react';

interface FileItem {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'xlsx' | 'png' | 'jpg' | 'svg' | 'pptx' | 'txt';
  sizeKB: number;
  updatedAt: string; // ISO date string
  owner: string;
  status?: 'approved' | 'pending' | 'rejected';
}

const initialFiles: FileItem[] = [
  {
    id: 'F-0001',
    name: 'Carta de acuerdo - Q4 2025',
    type: 'pdf',
    sizeKB: 482,
    updatedAt: '2025-11-10',
    owner: 'Legal Team',
    status: 'approved'
  },
  {
    id: 'F-0002',
    name: 'Brief creativo Coca-Cola',
    type: 'docx',
    sizeKB: 120,
    updatedAt: '2025-11-15',
    owner: 'CS Team',
    status: 'pending'
  },
  {
    id: 'F-0003',
    name: 'Tarifario 2025',
    type: 'xlsx',
    sizeKB: 996,
    updatedAt: '2025-10-28',
    owner: 'Finance Team',
    status: 'approved'
  },
  {
    id: 'F-0004',
    name: 'Especificaciones Rich Media',
    type: 'pdf',
    sizeKB: 312,
    updatedAt: '2025-09-03',
    owner: 'Studio',
    status: 'approved'
  },
  {
    id: 'F-0005',
    name: 'Logo cliente - actualizado',
    type: 'png',
    sizeKB: 144,
    updatedAt: '2025-11-20',
    owner: 'Client',
    status: 'approved'
  }
];

type SortKey = 'updatedAt' | 'name' | 'sizeKB';

export default function ArchivosSection() {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('updatedAt');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'approved' | 'pending' | 'rejected'
  >('all');

  const filtered = useMemo(() => {
    const byQuery = initialFiles.filter((f) =>
      f.name.toLowerCase().includes(query.toLowerCase())
    );
    const byStatus =
      statusFilter === 'all'
        ? byQuery
        : byQuery.filter((f) => f.status === statusFilter);
    const sorted = [...byStatus].sort((a, b) => {
      if (sortKey === 'name') return a.name.localeCompare(b.name);
      if (sortKey === 'sizeKB') return b.sizeKB - a.sizeKB;
      // updatedAt
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    return sorted;
  }, [query, sortKey, statusFilter]);

  const onQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

  return (
    <section className="rounded-3xl p-6 lg:p-8 bg-white min-h-[calc(100vh-120px)] shadow-sm">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-block w-8 h-4 rounded-r-full bg-atomik-gradient" />
            <h2 className="text-2xl lg:text-3xl font-bold text-[#191919]">
              Mis archivos
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              className="px-3 py-2 rounded-full text-xs font-medium bg-gradient-to-r from-[#8D30FF] to-[#551D99] text-white shadow">
              Subir archivo
            </button>
            <button
              type="button"
              className="px-3 py-2 rounded-full text-xs font-medium border border-gray-200 text-[#191919]">
              Nueva carpeta
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={onQueryChange}
              placeholder="Buscar por nombre…"
              className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8D30FF]/30"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔎
            </span>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-gray-600">
              Ordenar:
            </label>
            <select
              id="sort"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="px-3 py-2 rounded-2xl border border-gray-200 text-sm">
              <option value="updatedAt">Más recientes</option>
              <option value="name">Nombre (A–Z)</option>
              <option value="sizeKB">Tamaño</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="status" className="text-sm text-gray-600">
              Estado:
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value as 'all' | 'approved' | 'pending' | 'rejected'
                )
              }
              className="px-3 py-2 rounded-2xl border border-gray-200 text-sm">
              <option value="all">Todos</option>
              <option value="approved">Aprobado</option>
              <option value="pending">Pendiente</option>
              <option value="rejected">Rechazado</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((file) => (
          <article
            key={file.id}
            className="group rounded-2xl border border-gray-200 bg-gradient-to-br from-white via-[#F9F9F9] to-[#F1F1F1] overflow-hidden">
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8D30FF] to-[#551D99] text-white flex items-center justify-center font-bold text-xs shadow">
                    {file.type.toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-[#191919] truncate">
                      {file.name}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {file.owner}
                    </p>
                  </div>
                </div>
                {file.status && (
                  <span
                    className={`text-[10px] px-2 py-1 rounded-full border ${
                      file.status === 'approved'
                        ? 'text-green-700 border-green-200 bg-green-50'
                        : file.status === 'pending'
                          ? 'text-amber-700 border-amber-200 bg-amber-50'
                          : 'text-red-700 border-red-200 bg-red-50'
                    }`}>
                    {file.status === 'approved'
                      ? 'Aprobado'
                      : file.status === 'pending'
                        ? 'Pendiente'
                        : 'Rechazado'}
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center gap-3">
                  <span>{(file.sizeKB / 1024).toFixed(2)} MB</span>
                  <span className="h-3 w-[1px] bg-gray-300" />
                  <span>
                    Actualizado el{' '}
                    {new Date(file.updatedAt).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    className="px-2 py-1 rounded-full text-[11px] border border-gray-200 hover:border-[#8D30FF] hover:text-[#8D30FF]">
                    Ver
                  </button>
                  <button
                    type="button"
                    className="px-2 py-1 rounded-full text-[11px] border border-gray-200 hover:border-[#8D30FF] hover:text-[#8D30FF]">
                    Descargar
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
