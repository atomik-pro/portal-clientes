'use client';

import { useState, useRef } from 'react';

interface UploadFileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = ['Editables', 'Logos', 'Set creativo'];

const ALLOWED_EXTENSIONS = [
  '.pdf',
  '.psd',
  '.ai',
  '.jpg',
  '.png',
  '.gif',
  '.jpeg',
  '.webp',
  '.html',
  '.mp4',
  '.mp3',
  '.avi'
];

export default function UploadFileModal({
  isOpen,
  onClose
}: UploadFileModalProps) {
  const [category, setCategory] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      console.log('Uploaded:', data);
      onClose();
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Error al subir el archivo');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#191919]">Subir archivo</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
          {/* Category Select */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="category"
              className="text-sm font-medium text-gray-700">
              Categoría
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8D30FF]/30 bg-white"
              required>
              <option value="" disabled>
                Seleccione que tipo de archivo va a subir
              </option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* File Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Archivo</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#8D30FF] hover:bg-[#8D30FF]/5 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                📂
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">
                  {file ? file.name : 'Haga clic para seleccionar un archivo'}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {file
                    ? `${(file.size / 1024).toFixed(2)} KB`
                    : 'Formatos soportados: PDF, PSD, AI, JPG, PNG...'}
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept={ALLOWED_EXTENSIONS.join(',')}
                onChange={handleFileChange}
                className="hidden"
                required={!file}
              />
            </div>
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
              disabled={isUploading}
              className="px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-[#8D30FF] to-[#551D99] text-white shadow-lg shadow-[#8D30FF]/20 hover:shadow-xl hover:shadow-[#8D30FF]/30 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {isUploading ? 'Subiendo...' : 'Subir archivo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
