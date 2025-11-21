'use client';

import { useState } from 'react';

import contratosAcuerdos from '../../assets/recurs/contratos.svg';
import condicionesComerciales from '../../assets/recurs/condicionesComerciales.svg';
import tarifario from '../../assets/recurs/tarifario.svg';
import Image from 'next/image';

type DocumentType = 'contratos' | 'condiciones' | 'tarifario';

export default function AcuerdosSection() {
  const [selectedDoc, setSelectedDoc] = useState<DocumentType | null>(null);

  return (
    <section className="rounded-3xl p-6 lg:p-8 min-h-[calc(100vh-120px)] bg-white">
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <span className="inline-block w-8 h-4 rounded-r-full bg-atomik-gradient" />
        <h2 className="text-2xl lg:text-3xl font-bold text-[#191919]">
          Acuerdos
        </h2>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column (spans 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Modelo de Negocio */}
          <div className="rounded-3xl bg-white border border-gray-100 shadow-sm px-6 py-6">
            <h3 className="text-sm font-semibold text-[#6B21A8]">
              Modelo de Negocio
            </h3>
            <div className="mt-6 h-40 rounded-2xl bg-[#FAFAFA] border border-gray-100 flex items-center justify-center text-center">
              <p className="text-sm text-gray-400">
                Aún no hay información del
                <br />
                modelo de negocio.
              </p>
            </div>
          </div>

          {/* Doc. legal e información operativa */}
          <div className="rounded-3xl bg-white border border-gray-100 shadow-sm px-6 py-6">
            <h3 className="text-sm font-semibold text-[#6B21A8]">
              Doc. legal e información operativa
            </h3>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Tile: Contratos & Acuerdos */}
              <DocTile
                title="Contratos & Acuerdos"
                imageSrc={contratosAcuerdos}
                onRead={() => setSelectedDoc('contratos')}
              />
              {/* Tile: Condiciones Comerciales */}
              <DocTile
                title="Condiciones Comerciales"
                imageSrc={condicionesComerciales}
                onRead={() => setSelectedDoc('condiciones')}
              />
              {/* Tile: Tarifario */}
              <DocTile
                title="Tarifario"
                imageSrc={tarifario}
                onRead={() => setSelectedDoc('tarifario')}
              />
            </div>
          </div>
        </div>

        {/* Right column: Preview panel */}
        <div className="rounded-3xl bg-white border border-gray-100 shadow-sm p-6">
          <div className="h-full min-h-[320px] rounded-2xl bg-[#FAFAFA] border border-gray-100 flex items-center justify-center text-center px-6">
            {selectedDoc ? (
              <p className="text-sm text-gray-500">
                Previsualización:{' '}
                {selectedDoc === 'contratos'
                  ? 'Contratos & Acuerdos'
                  : selectedDoc === 'condiciones'
                    ? 'Condiciones Comerciales'
                    : 'Tarifario'}
              </p>
            ) : (
              <p className="text-sm text-gray-400">
                Haz click en Leer para
                <br />
                previsualizar el documento.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function DocTile({
  title,
  imageSrc,
  onRead
}: {
  title: string;
  imageSrc: string;
  onRead: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onRead}
      className="group relative w-full aspect-square rounded-3xl overflow-hidden shadow-md focus:outline-none focus:ring-2 focus:ring-[#8D30FF]/30">
      <Image
        src={imageSrc}
        alt={title}
        fill
        sizes="(min-width:1280px) 16vw, (min-width:768px) 24vw, 33vw"
        className="object-cover"
      />
    </button>
  );
}
