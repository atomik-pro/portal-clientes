'use client';

import { useState } from 'react';

interface RequestCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RequestCampaignModal({
  isOpen,
  onClose
}: RequestCampaignModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    advertiser: '',
    campaignName: '',
    orderNumber: '',
    startDate: '',
    endDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Campaign Request Submitted:', formData);
      onClose();
      // Reset form
      setFormData({
        name: '',
        advertiser: '',
        campaignName: '',
        orderNumber: '',
        startDate: '',
        endDate: ''
      });
    } catch (error) {
      console.error('Error submitting campaign request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-[#191919]">
            Solicitar Campaña
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700">
                Nombre y Apellido <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Escribe tu nombre"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8D30FF]/30 bg-white"
                required
              />
            </div>

            {/* Anunciante */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="advertiser"
                className="text-sm font-medium text-gray-700">
                Anunciante <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="advertiser"
                name="advertiser"
                value={formData.advertiser}
                onChange={handleChange}
                placeholder="Marca de la campaña"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8D30FF]/30 bg-white"
                required
              />
            </div>

            {/* Nombre de la pauta */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label
                htmlFor="campaignName"
                className="text-sm font-medium text-gray-700">
                Nombre de la pauta <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="campaignName"
                name="campaignName"
                value={formData.campaignName}
                onChange={handleChange}
                placeholder="Identificador o nombre de la campaña"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8D30FF]/30 bg-white"
                required
              />
            </div>

            {/* Número de orden */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label
                htmlFor="orderNumber"
                className="text-sm font-medium text-gray-700">
                Número de orden
              </label>
              <input
                type="text"
                id="orderNumber"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleChange}
                placeholder="OC o referencia numérica (opcional)"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8D30FF]/30 bg-white"
              />
            </div>

            {/* Fecha Inicio */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="startDate"
                className="text-sm font-medium text-gray-700">
                Fecha de Inicio <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8D30FF]/30 bg-white"
                required
              />
            </div>

            {/* Fecha Fin */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="endDate"
                className="text-sm font-medium text-gray-700">
                Fecha de Fin <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8D30FF]/30 bg-white"
                required
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-[#8D30FF] to-[#551D99] text-white shadow-lg shadow-[#8D30FF]/20 hover:shadow-xl hover:shadow-[#8D30FF]/30 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
