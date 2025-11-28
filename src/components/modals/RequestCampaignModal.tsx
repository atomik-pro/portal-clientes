'use client';

import { useState, useRef } from 'react';

interface RequestCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CREATIVE_FORMATS = [
  'Audio In-Game',
  'Audio Ads',
  'Banners Display',
  'Connected TV',
  'Display DCO',
  'Display Gaming',
  'DOOH',
  'Native Standard',
  'Push Notification',
  'Social Plus Video',
  'Social Plus Display',
  'Tik Tok Ads',
  'Video Programático',
  'Video Rewarded',
  'Video Plus',
  'YouTube',
  'Rich Media Standard',
  'Rich Media Plus',
  'Tik Tok Business',
  'Social Streaming Display',
  'Social Streaming Video',
  'Interactive Video'
];

const CAMPAIGN_OBJECTIVES = [
  'CPM (costo por mil impresiones)',
  'CPC (costo por click)',
  'CPCV (costo por vista completa)',
  'CPCL (costo por escucha completa)'
];

const AGE_RANGES = [
  'De 18 a 25 años',
  'De 25 a 35 años',
  'De 35 a 45 años',
  'De 45 a 55 años',
  'De 55 a 65 años',
  'Más de 65 años'
];

export default function RequestCampaignModal({
  isOpen,
  onClose
}: RequestCampaignModalProps) {
  // State for all form fields
  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    advertiser: '',
    campaignName: '',
    orderNumber: '', // Kept as per initial request, though Financial Details might overlap
    startDate: '',
    endDate: '',

    // A) Inversión
    investment: '',

    // B) Formato creativo
    creativeFormat: '',
    creativeLink: '',
    // creativeFile handled separately

    // C) Tags
    hasExternalTags: '', // 'yes' | 'no'
    // tagsFile handled separately

    // D) Objetivo
    campaignObjective: '',
    objectiveAmount: '',

    // E) Landing page
    landingPage: '',

    // F) Segmentación
    segmentation: {
      gender: false,
      age: false,
      geo: false,
      interests: false
    },
    genderTarget: '', // 'ambos' | 'hombres' | 'mujeres'
    ageTargets: [] as string[],
    geoTarget: '',
    interestsTarget: '',

    // G) Observaciones
    observations: '',

    // H) Detalles Financieros
    hasODC: '', // 'yes' | 'no'
    // odcFile handled separately

    // I) Email
    email: ''
  });

  // File states
  const [creativeFile, setCreativeFile] = useState<File | null>(null);
  const [tagsFile, setTagsFile] = useState<File | null>(null);
  const [odcFile, setOdcFile] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs for file inputs
  const creativeFileInputRef = useRef<HTMLInputElement>(null);
  const tagsFileInputRef = useRef<HTMLInputElement>(null);
  const odcFileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name.startsWith('seg_')) {
      const segKey = name.replace('seg_', '');
      setFormData((prev) => ({
        ...prev,
        segmentation: {
          ...prev.segmentation,
          [segKey]: checked
        }
      }));
    } else if (name === 'ageTarget') {
      const { value } = e.target;
      setFormData((prev) => {
        const newAgeTargets = prev.ageTargets.includes(value)
          ? prev.ageTargets.filter((t) => t !== value)
          : [...prev.ageTargets, value];
        return { ...prev, ageTargets: newAgeTargets };
      });
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (f: File | null) => void
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Campaign Request Submitted:', {
        ...formData,
        creativeFile,
        tagsFile,
        odcFile
      });
      onClose();
      // Reset logic would go here
    } catch (error) {
      console.error('Error submitting campaign request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto flex flex-col">
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
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-8">
          {/* 1. Datos Generales */}
          <section className="space-y-4">
            <h4 className="text-lg font-semibold text-[#8D30FF] border-b border-gray-100 pb-2">
              Datos Generales
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div className="flex flex-col gap-2 md:col-span-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700">
                  Dirección de email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8D30FF]/30 bg-white"
                  required
                />
              </div>
            </div>
          </section>

          {/* 2. Detalles de Campaña */}
          <section className="space-y-4">
            <h4 className="text-lg font-semibold text-[#8D30FF] border-b border-gray-100 pb-2">
              Detalles de Campaña
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* A) Inversión */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="investment"
                  className="text-sm font-medium text-gray-700">
                  Inversión (USD) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="investment"
                  name="investment"
                  value={formData.investment}
                  onChange={handleChange}
                  placeholder="Monto total sin IVA"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8D30FF]/30 bg-white"
                  required
                />
              </div>

              {/* D) Objetivo */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="campaignObjective"
                  className="text-sm font-medium text-gray-700">
                  Objetivo de la Campaña <span className="text-red-500">*</span>
                </label>
                <select
                  id="campaignObjective"
                  name="campaignObjective"
                  value={formData.campaignObjective}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8D30FF]/30 bg-white"
                  required>
                  <option value="">Seleccione un objetivo</option>
                  {CAMPAIGN_OBJECTIVES.map((obj) => (
                    <option key={obj} value={obj}>
                      {obj}
                    </option>
                  ))}
                </select>
              </div>

              {/* Conditional Objective Amount */}
              {formData.campaignObjective && (
                <div className="flex flex-col gap-2 md:col-span-2 animate-in fade-in slide-in-from-top-2">
                  <label
                    htmlFor="objectiveAmount"
                    className="text-sm font-medium text-gray-700">
                    Indicar cantidad objetivo (Impresiones/Clicks/Vistas){' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="objectiveAmount"
                    name="objectiveAmount"
                    value={formData.objectiveAmount}
                    onChange={handleChange}
                    placeholder="¿Cuánto se proyecta lograr?"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8D30FF]/30 bg-white"
                    required
                  />
                </div>
              )}

              {/* E) Landing Page */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label
                  htmlFor="landingPage"
                  className="text-sm font-medium text-gray-700">
                  Landing page <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  id="landingPage"
                  name="landingPage"
                  value={formData.landingPage}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8D30FF]/30 bg-white"
                  required
                />
              </div>
            </div>
          </section>

          {/* 3. Creatividades y Tags */}
          <section className="space-y-4">
            <h4 className="text-lg font-semibold text-[#8D30FF] border-b border-gray-100 pb-2">
              Creatividades y Tags
            </h4>
            <div className="grid grid-cols-1 gap-6">
              {/* B) Formato Creativo */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="creativeFormat"
                  className="text-sm font-medium text-gray-700">
                  Formato creativo <span className="text-red-500">*</span>
                </label>
                <select
                  id="creativeFormat"
                  name="creativeFormat"
                  value={formData.creativeFormat}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8D30FF]/30 bg-white"
                  required>
                  <option value="">Seleccione un formato</option>
                  {CREATIVE_FORMATS.map((fmt) => (
                    <option key={fmt} value={fmt}>
                      {fmt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Conditional Creative Inputs */}
              {formData.creativeFormat && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-2xl animate-in fade-in slide-in-from-top-2 border border-gray-100">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="creativeLink"
                      className="text-sm font-medium text-gray-700">
                      Link externo de materiales
                    </label>
                    <input
                      type="url"
                      id="creativeLink"
                      name="creativeLink"
                      value={formData.creativeLink}
                      onChange={handleChange}
                      placeholder="WeTransfer, Drive, Dropbox..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8D30FF]/30 bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      O adjuntar archivos
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => creativeFileInputRef.current?.click()}
                        className="px-4 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 text-sm font-medium transition-colors flex-1 text-left truncate">
                        {creativeFile
                          ? creativeFile.name
                          : 'Seleccionar archivo...'}
                      </button>
                      <input
                        ref={creativeFileInputRef}
                        type="file"
                        onChange={(e) => handleFileChange(e, setCreativeFile)}
                        className="hidden"
                      />
                      {creativeFile && (
                        <button
                          type="button"
                          onClick={() => setCreativeFile(null)}
                          className="text-red-500 hover:text-red-700">
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* C) Tags Externos */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-gray-700">
                  ¿La campaña utiliza tags de auditor externo?{' '}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasExternalTags"
                      value="yes"
                      checked={formData.hasExternalTags === 'yes'}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#8D30FF] focus:ring-[#8D30FF]"
                      required
                    />
                    <span className="text-gray-700">Incluye tags</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasExternalTags"
                      value="no"
                      checked={formData.hasExternalTags === 'no'}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#8D30FF] focus:ring-[#8D30FF]"
                    />
                    <span className="text-gray-700">No incluye tags</span>
                  </label>
                </div>
              </div>

              {/* Conditional Tags File */}
              {formData.hasExternalTags === 'yes' && (
                <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-2xl animate-in fade-in slide-in-from-top-2 border border-gray-100">
                  <label className="text-sm font-medium text-gray-700">
                    Adjuntar archivo de tags/taxonomías{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => tagsFileInputRef.current?.click()}
                      className="px-4 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 text-sm font-medium transition-colors flex-1 text-left truncate">
                      {tagsFile ? tagsFile.name : 'Seleccionar archivo...'}
                    </button>
                    <input
                      ref={tagsFileInputRef}
                      type="file"
                      onChange={(e) => handleFileChange(e, setTagsFile)}
                      className="hidden"
                      required={!tagsFile}
                    />
                    {tagsFile && (
                      <button
                        type="button"
                        onClick={() => setTagsFile(null)}
                        className="text-red-500 hover:text-red-700">
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 4. Segmentación */}
          <section className="space-y-4">
            <h4 className="text-lg font-semibold text-[#8D30FF] border-b border-gray-100 pb-2">
              Segmentación Base
            </h4>
            <div className="flex flex-col gap-4">
              <label className="text-sm font-medium text-gray-700">
                Seleccionar características del público objetivo{' '}
                <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-4">
                {[
                  { key: 'gender', label: 'Género' },
                  { key: 'age', label: 'Edad' },
                  { key: 'geo', label: 'Segm. Geográfica' },
                  { key: 'interests', label: 'Intereses' }
                ].map((item) => (
                  <label
                    key={item.key}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer transition-all ${
                      formData.segmentation[
                        item.key as keyof typeof formData.segmentation
                      ]
                        ? 'bg-[#8D30FF]/10 border-[#8D30FF] text-[#8D30FF]'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}>
                    <input
                      type="checkbox"
                      name={`seg_${item.key}`}
                      checked={
                        formData.segmentation[
                          item.key as keyof typeof formData.segmentation
                        ]
                      }
                      onChange={handleCheckboxChange}
                      className="hidden"
                    />
                    <span className="font-medium">{item.label}</span>
                  </label>
                ))}
              </div>

              {/* Conditional Segmentation Fields */}
              <div className="space-y-4 mt-2">
                {/* Gender */}
                {formData.segmentation.gender && (
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 animate-in fade-in slide-in-from-top-2">
                    <label className="text-sm font-medium text-gray-700 block mb-3">
                      ¿A qué género/s impactaremos?{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {['Ambos', 'Solo a hombres', 'Solo a mujeres'].map(
                        (opt) => (
                          <label
                            key={opt}
                            className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="genderTarget"
                              value={opt}
                              checked={formData.genderTarget === opt}
                              onChange={handleChange}
                              className="w-4 h-4 text-[#8D30FF] focus:ring-[#8D30FF]"
                              required
                            />
                            <span className="text-gray-700">{opt}</span>
                          </label>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Age */}
                {formData.segmentation.age && (
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 animate-in fade-in slide-in-from-top-2">
                    <label className="text-sm font-medium text-gray-700 block mb-3">
                      ¿A qué edades impactaremos?{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {AGE_RANGES.map((range) => (
                        <label
                          key={range}
                          className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name="ageTarget"
                            value={range}
                            checked={formData.ageTargets.includes(range)}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 text-[#8D30FF] rounded focus:ring-[#8D30FF]"
                          />
                          <span className="text-gray-700 text-sm">{range}</span>
                        </label>
                      ))}
                    </div>
                    {formData.ageTargets.length === 0 && (
                      <p className="text-xs text-red-500 mt-2">
                        Seleccione al menos un rango
                      </p>
                    )}
                  </div>
                )}

                {/* Geo */}
                {formData.segmentation.geo && (
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 animate-in fade-in slide-in-from-top-2">
                    <label
                      htmlFor="geoTarget"
                      className="text-sm font-medium text-gray-700 block mb-2">
                      ¿En dónde impactaremos? (País, ciudad, coordenadas){' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="geoTarget"
                      name="geoTarget"
                      value={formData.geoTarget}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8D30FF]/30 bg-white resize-none"
                      required
                    />
                  </div>
                )}

                {/* Interests */}
                {formData.segmentation.interests && (
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 animate-in fade-in slide-in-from-top-2">
                    <label
                      htmlFor="interestsTarget"
                      className="text-sm font-medium text-gray-700 block mb-2">
                      ¿Qué intereses tiene el público objetivo?{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="interestsTarget"
                      name="interestsTarget"
                      value={formData.interestsTarget}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8D30FF]/30 bg-white resize-none"
                      required
                    />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 5. Observaciones y Finanzas */}
          <section className="space-y-4">
            <h4 className="text-lg font-semibold text-[#8D30FF] border-b border-gray-100 pb-2">
              Observaciones y Finanzas
            </h4>
            <div className="flex flex-col gap-6">
              {/* G) Observaciones */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="observations"
                  className="text-sm font-medium text-gray-700">
                  Observaciones de la campaña
                </label>
                <textarea
                  id="observations"
                  name="observations"
                  value={formData.observations}
                  onChange={handleChange}
                  placeholder="Detalles adicionales, aclaraciones financieras, desglose de presupuesto, etc."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8D30FF]/30 bg-white resize-none"
                />
              </div>

              {/* H) Detalles Financieros */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-gray-700">
                  Detalles Financieros (Orden de Compra){' '}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasODC"
                      value="yes"
                      checked={formData.hasODC === 'yes'}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#8D30FF] focus:ring-[#8D30FF]"
                      required
                    />
                    <span className="text-gray-700">
                      Si, incluye orden de compra
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasODC"
                      value="no"
                      checked={formData.hasODC === 'no'}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#8D30FF] focus:ring-[#8D30FF]"
                    />
                    <span className="text-gray-700">
                      No incluye orden de compra
                    </span>
                  </label>
                </div>
              </div>

              {/* Conditional ODC File */}
              {formData.hasODC === 'yes' && (
                <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-2xl animate-in fade-in slide-in-from-top-2 border border-gray-100">
                  <label className="text-sm font-medium text-gray-700">
                    Adjuntar Orden de Compra{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => odcFileInputRef.current?.click()}
                      className="px-4 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 text-sm font-medium transition-colors flex-1 text-left truncate">
                      {odcFile ? odcFile.name : 'Seleccionar archivo...'}
                    </button>
                    <input
                      ref={odcFileInputRef}
                      type="file"
                      onChange={(e) => handleFileChange(e, setOdcFile)}
                      className="hidden"
                      required={!odcFile}
                    />
                    {odcFile && (
                      <button
                        type="button"
                        onClick={() => setOdcFile(null)}
                        className="text-red-500 hover:text-red-700">
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-100 sticky bottom-0 bg-white pb-2">
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
