'use client';

import React, { JSX, useState } from 'react';
import RequestCampaignModal from '../modals/RequestCampaignModal';
import RequestProposalModal from '../modals/RequestProposalModal';

export default function SolicitudesSection(): JSX.Element {
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);

  return (
    <section className="rounded-3xl p-6 lg:p-8 min-h-[calc(100vh-120px)] bg-white">
      {/* Title */}
      <div className="flex items-center gap-3 mb-8">
        <span className="inline-block w-8 h-4 rounded-r-full bg-atomik-gradient" />
        <h2 className="text-2xl lg:text-3xl font-bold text-[#191919]">
          Solicitudes
        </h2>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left: Solicitar Campaña */}
        <div className="flex flex-col h-full p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-[#8D30FF]/10 flex items-center justify-center text-3xl">
              📢
            </div>
          </div>
          <h3 className="text-xl lg:text-2xl font-bold text-[#191919] text-center mb-4">
            Solicitar Campaña
          </h3>
          <p className="text-[#5E5E5E] text-center leading-relaxed mb-8 flex-grow">
            Inicia una nueva campaña publicitaria con nosotros. Completa el
            formulario con los detalles de tu pauta, fechas y requerimientos
            para que nuestro equipo comience a trabajar en ello.
          </p>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setIsCampaignModalOpen(true)}
              className="px-8 py-3 rounded-full bg-atomik-gradient text-white font-semibold shadow-md shadow-[#8D30FF]/20 hover:opacity-95 hover:scale-105 hover:shadow-lg hover:shadow-[#8D30FF]/30 transition-all focus:outline-none focus:ring-2 focus:ring-[#8D30FF]/30">
              Solicitar
            </button>
          </div>
        </div>

        {/* Right: Solicitar Propuesta Comercial */}
        <div className="flex flex-col h-full p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-[#8D30FF]/10 flex items-center justify-center text-3xl">
              💼
            </div>
          </div>
          <h3 className="text-xl lg:text-2xl font-bold text-[#191919] text-center mb-4">
            Solicitar Propuesta Comercial
          </h3>
          <p className="text-[#5E5E5E] text-center leading-relaxed mb-8 flex-grow">
            ¿Necesitas una propuesta a medida? Cuéntanos sobre tu empresa y tus
            objetivos. Prepararemos una propuesta comercial personalizada que se
            ajuste a tus necesidades específicas.
          </p>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setIsProposalModalOpen(true)}
              className="px-8 py-3 rounded-full bg-white text-[#8D30FF] border-2 border-[#8D30FF] font-semibold hover:bg-[#8D30FF]/5 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-[#8D30FF]/30">
              Solicitar
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <RequestCampaignModal
        isOpen={isCampaignModalOpen}
        onClose={() => setIsCampaignModalOpen(false)}
      />
      <RequestProposalModal
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
      />
    </section>
  );
}
