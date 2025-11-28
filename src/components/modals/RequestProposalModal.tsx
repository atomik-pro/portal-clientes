'use client';

import { useState } from 'react';

interface RequestProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RequestProposalModal({
  isOpen,
  onClose
}: RequestProposalModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Proposal Request Submitted:', formData);
      onClose();
      // Reset form
      setFormData({
        name: '',
        company: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting proposal request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#191919]">
            Solicitar Propuesta Comercial
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
          {/* Nombre */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
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

          {/* Empresa */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="company"
              className="text-sm font-medium text-gray-700">
              Empresa <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Nombre de tu empresa"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8D30FF]/30 bg-white"
              required
            />
          </div>

          {/* Mensaje */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-gray-700">
              Mensaje <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Cuéntanos qué necesitas..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8D30FF]/30 bg-white resize-none"
              required
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 mt-2">
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
