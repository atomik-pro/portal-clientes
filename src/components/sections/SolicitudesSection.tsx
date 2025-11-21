'use client';

import React, { JSX } from 'react';

export default function SolicitudesSection(): JSX.Element {
  return (
    <section className="rounded-3xl p-6 lg:p-8 min-h-[calc(100vh-120px)] bg-white">
      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <span className="inline-block w-8 h-4 rounded-r-full bg-atomik-gradient" />
        <h2 className="text-2xl lg:text-3xl font-bold text-[#191919]">
          Solicitudes
        </h2>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left: description and CTA */}
        <div className="space-y-4 text-center">
          <h3 className="text-xl lg:text-2xl font-bold text-[#191919]">
            Solicitar campaña
          </h3>
          <p className="text-[#5E5E5E] text-center leading-relaxed ">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged.
          </p>
          <div>
            <button
              type="button"
              className="px-8 py-3 rounded-full bg-atomik-gradient text-white font-semibold shadow-sm hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#8D30FF]/30">
              Solicitar
            </button>
          </div>
        </div>

        {/* Right: helper text + video preview */}
        <div className="w-full">
          <p className="text-sm text-[#7A7A7A] mb-3 text-center">
            No sabes cómo solicitar una campaña?{' '}
            <span className="font-semibold text-[#4B4B4B]">
              Te explicamos en éste video.
            </span>
          </p>

          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#EFEFEF] to-[#D8D8D8] shadow-lg border border-[#EAEAEA]">
            {/* 16:9 aspect */}
            <div className="aspect-video" />

            {/* Play overlay TODO: añadir video */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/90 shadow-md flex items-center justify-center">
                <span
                  aria-hidden
                  className="ml-1 block w-0 h-0 border-y-[12px] border-y-transparent border-l-[18px] border-l-[#5B5B5B]"
                />
              </div>
            </div>

            {/* Bottom vignette */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />

            {/* Rounded mask for edges */}
          </div>
        </div>
      </div>
    </section>
  );
}
