'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

// Card SVG assets (provided by user in src/assets/recurs)
// Using relative imports to avoid alias resolution issues on Vercel (case-sensitive env)
import CardAtomikAcademy from '../../assets/recurs/Card-AtomikAcademy.svg';
import CardBestParctices from '../../assets/recurs/Card-BestParctices.svg';
import CardCircuitos from '../../assets/recurs/Card-CirDeServicios.svg';
import CardGaleriaRich from '../../assets/recurs/Card-GaleriaDeRM.svg';
import CardGaleriaVideoPlus from '../../assets/recurs/Card-GaleriaDeVideo.svg';
import CardManualDash from '../../assets/recurs/Card-ManualDeDash.svg';
import CardMediakits from '../../assets/recurs/Card-MediaKit.svg';
import CardPresentacionFormatos from '../../assets/recurs/Card-PresdeFormato.svg';
import CardProyectorDigital from '../../assets/recurs/Card-ProyectorDigital.svg';
import CardSLAs from '../../assets/recurs/Card-SLAs.svg';
import CardSpecs from '../../assets/recurs/Card-Specs.svg';
import CardSpecsTemplateVideo from '../../assets/recurs/Card-SpecstemplateVideo.svg';
import Image from 'next/image';

interface ResourceItem {
  id: string;
  name: string;
  description: string;
  category: 'mediakit' | 'spec';
  groupLabel: 'Manuales' | 'Presentaciones' | 'Galerías';
  tags: string[];
  href: string;
  fileType: 'PDF' | 'ZIP' | 'DOC' | 'XLSX';
  sizeMB?: number;
  updatedAt?: string;
  icon?: 'doc' | 'image' | 'video' | 'settings';
  imageSrc?: string; // optional SVG background for the card
}

type Category = 'mediakit' | 'spec' | 'all';

const initialResources: ResourceItem[] = [
  {
    id: 'r-101',
    name: 'Atomik Academy',
    description: 'Educación',
    category: 'spec',
    groupLabel: 'Manuales',
    tags: ['Educación'],
    href: '/downloads/manuales/atomik-academy.pdf',
    fileType: 'PDF',
    icon: 'doc',
    imageSrc: CardAtomikAcademy
  },
  {
    id: 'r-102',
    name: 'Best Practices',
    description: 'Manuales',
    category: 'spec',
    groupLabel: 'Manuales',
    tags: ['Buenas prácticas'],
    href: '/downloads/manuales/best-practices.pdf',
    fileType: 'PDF',
    icon: 'doc',
    imageSrc: CardBestParctices
  },
  {
    id: 'r-103',
    name: 'Circuitos de Servicio',
    description: 'Presentaciones',
    category: 'mediakit',
    groupLabel: 'Presentaciones',
    tags: ['Servicio'],
    href: '/downloads/presentaciones/circuitos-servicio.pdf',
    fileType: 'PDF',
    icon: 'doc',
    imageSrc: CardCircuitos
  },
  {
    id: 'r-104',
    name: 'Galería de Rich Media',
    description: 'Galerías',
    category: 'mediakit',
    groupLabel: 'Galerías',
    tags: ['Rich Media'],
    href: '/downloads/galerias/richmedia.zip',
    fileType: 'ZIP',
    icon: 'image',
    imageSrc: CardGaleriaRich
  },
  {
    id: 'r-105',
    name: 'Galería de Video+',
    description: 'Galerías',
    category: 'mediakit',
    groupLabel: 'Galerías',
    tags: ['Video+'],
    href: '/downloads/galerias/video-plus.zip',
    fileType: 'ZIP',
    icon: 'video',
    imageSrc: CardGaleriaVideoPlus
  },
  {
    id: 'r-106',
    name: 'Manual de Dash',
    description: 'Manuales',
    category: 'spec',
    groupLabel: 'Manuales',
    tags: ['Dash'],
    href: '/downloads/manuales/manual-dash.pdf',
    fileType: 'PDF',
    icon: 'doc',
    imageSrc: CardManualDash
  },
  {
    id: 'r-107',
    name: 'Mediakits',
    description: 'Presentaciones',
    category: 'mediakit',
    groupLabel: 'Presentaciones',
    tags: ['Atomik'],
    href: '/downloads/mediakits/mediakit-atomik-2025.pdf',
    fileType: 'PDF',
    icon: 'doc',
    imageSrc: CardMediakits
  },
  {
    id: 'r-108',
    name: 'Presentación de formatos',
    description: 'Presentaciones',
    category: 'mediakit',
    groupLabel: 'Presentaciones',
    tags: ['Formatos'],
    href: '/downloads/presentaciones/presentacion-formatos.pdf',
    fileType: 'PDF',
    icon: 'doc',
    imageSrc: CardPresentacionFormatos
  },
  {
    id: 'r-109',
    name: 'Proyector Digital',
    description: 'Galerías',
    category: 'mediakit',
    groupLabel: 'Galerías',
    tags: ['Showcase'],
    href: '/downloads/galerias/proyector-digital.zip',
    fileType: 'ZIP',
    icon: 'image',
    imageSrc: CardProyectorDigital
  },
  {
    id: 'r-110',
    name: 'SLAs',
    description: 'Manuales',
    category: 'spec',
    groupLabel: 'Manuales',
    tags: ['Acuerdos'],
    href: '/downloads/manuales/slas.pdf',
    fileType: 'PDF',
    icon: 'settings',
    imageSrc: CardSLAs
  },
  {
    id: 'r-111',
    name: 'Specs',
    description: 'Manuales',
    category: 'spec',
    groupLabel: 'Manuales',
    tags: ['Specs'],
    href: '/downloads/specs/specs-display.pdf',
    fileType: 'PDF',
    icon: 'doc',
    imageSrc: CardSpecs
  },
  {
    id: 'r-112',
    name: 'Specs template de video',
    description: 'Manuales',
    category: 'spec',
    groupLabel: 'Manuales',
    tags: ['Video', 'Template'],
    href: '/downloads/specs/specs-template-video.docx',
    fileType: 'DOC',
    icon: 'video',
    imageSrc: CardSpecsTemplateVideo
  }
];

const mediakitOptions = [
  'Atomik',
  'Display',
  'Rich Media',
  'Video',
  'Audio'
] as const;
const specsOptions = [
  'Display',
  'Video',
  'Audio',
  'Mobile',
  'HTML5',
  'VAST'
] as const;

function ResourceTile({ item }: { item: ResourceItem }) {
  const baseClasses =
    'group relative rounded-[22px] aspect-square overflow-hidden bg-transparent transition-transform hover:-translate-y-[2px]';
  return (
    <a
      href={item.href}
      download={item.fileType !== 'ZIP'}
      className={baseClasses}
      aria-label={`${item.name} (${item.description})`}>
      {/* Card artwork (SVG) provided by design */}
      {item.imageSrc ? (
        <Image
          src={item.imageSrc}
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width:1280px) 16vw, (min-width:768px) 24vw, 33vw"
          className="object-cover"
        />
      ) : (
        // Fallback gradient if no SVG is provided
        <div className="absolute inset-0 bg-gradient-to-b from-[#D7B6FF] via-[#B782FF] to-[#8A47FF]" />
      )}
    </a>
  );
}

export default function RecursosSection() {
  // Removed search field per Figma capture; keep only Filters menu
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const filtersMenuRef = useRef<HTMLDivElement | null>(null);

  const addTag = useCallback((tag: string) => {
    setActiveTags((prev) => (prev.includes(tag) ? prev : [...prev, tag]));
  }, []);

  const removeTag = useCallback((tag: string) => {
    setActiveTags((prev) => prev.filter((t) => t !== tag));
  }, []);

  const clearFilters = useCallback(() => {
    setActiveTags([]);
    setSelectedCategory('all');
    setFiltersOpen(false);
  }, []);

  const filteredResources = useMemo(() => {
    return initialResources.filter((res) => {
      if (selectedCategory !== 'all' && res.category !== selectedCategory)
        return false;
      const matchTags = activeTags.every((tag) => res.tags.includes(tag));
      return matchTags;
    });
  }, [activeTags, selectedCategory]);

  const handleMenuSelect = useCallback(
    (category: Exclude<Category, 'all'>, value: string) => {
      setSelectedCategory(category);
      addTag(value);
      setFiltersOpen(false);
    },
    [addTag]
  );

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (filtersMenuRef.current && !filtersMenuRef.current.contains(t)) {
        setFiltersOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFiltersOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  return (
    <section className="rounded-[25px] mx-5 p-6 lg:p-8 bg-white shadow-md min-h-[calc(100vh-120px)]">
      <header className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="inline-block w-8 h-4 rounded-r-full bg-atomik-gradient" />
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Documentos
          </h2>
        </div>
        <div className="flex items-center gap-3" ref={filtersMenuRef}>
          <div className="relative">
            <button
              onClick={() => setFiltersOpen((p) => !p)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#8D30FF] text-white text-sm shadow hover:shadow-md">
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
            {filtersOpen && (
              <div className="absolute right-0 z-20 mt-2 w-64 rounded-2xl border border-gray-200 bg-white shadow-xl p-2">
                <div className="px-2 py-2">
                  <p className="text-xs font-semibold text-gray-600 mb-1">
                    MediaKits
                  </p>
                  <ul className="grid grid-cols-2 gap-1">
                    {mediakitOptions.map((opt) => (
                      <li key={opt}>
                        <button
                          onClick={() => handleMenuSelect('mediakit', opt)}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50">
                          {opt}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-2 py-2 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-600 mb-1">
                    Specs
                  </p>
                  <ul className="grid grid-cols-2 gap-1">
                    {specsOptions.map((opt) => (
                      <li key={opt}>
                        <button
                          onClick={() => handleMenuSelect('spec', opt)}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50">
                          {opt}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={clearFilters}
            className="rounded-full px-4 py-2 border bg-white/80 text-gray-800 border-gray-300 hover:border-red-400 hover:text-red-600 transition">
            Limpiar filtros
          </button>
        </div>
      </header>

      {activeTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {activeTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 rounded-full bg-violetaPrincipal/10 text-violetaPrincipal px-3 py-1 text-sm">
              {tag}
              <button
                aria-label={`Quitar tag ${tag}`}
                onClick={() => removeTag(tag)}
                className="text-violetaPrincipal hover:text-violetaPrincipal/70">
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredResources.map((res) => (
            <ResourceTile key={res.id} item={res} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-24">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
            <span className="text-2xl text-gray-500">🔍</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            No hay resultados
          </p>
          <p className="text-sm text-gray-600">
            Ajusta los filtros para ver más documentos.
          </p>
        </div>
      )}
    </section>
  );
}
