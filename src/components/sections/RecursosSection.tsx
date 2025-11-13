'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

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
}

type ActiveMenu = 'mediakit' | 'specs' | null;

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
    icon: 'doc'
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
    icon: 'doc'
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
    icon: 'doc'
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
    icon: 'image'
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
    icon: 'video'
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
    icon: 'doc'
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
    icon: 'doc'
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
    icon: 'doc'
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
    icon: 'image'
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
    icon: 'settings'
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
    icon: 'doc'
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
    icon: 'video'
  }
];

const mediakitOptions = ['Atomik', 'Display', 'Rich Media', 'Video', 'Audio'];
const specsOptions = ['Display', 'Video', 'Audio', 'Mobile', 'HTML5', 'VAST'];

function ResourceTile({ item }: { item: ResourceItem }) {
  const baseClasses =
    'group relative rounded-[24px] aspect-square p-4 shadow-lg transition-transform hover:-translate-y-[2px] hover:shadow-xl';
  const gradientClasses =
    'bg-gradient-to-b from-[#C696FF] via-[#B072FF] to-[#8E4BFF]';
  return (
    <a
      href={item.href}
      download={item.fileType !== 'ZIP'}
      className={`${baseClasses} ${gradientClasses}`}
      aria-label={`${item.name} (${item.groupLabel})`}>
      <div className="pointer-events-none absolute inset-x-3 top-3 h-[42%] rounded-[20px] bg-white/18" />
      <div className="flex items-center gap-2">
        <div className="grid place-items-center w-12 h-12 rounded-2xl bg-white/25 text-white">
          {item.icon === 'doc' && (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect
                x="5"
                y="3"
                width="14"
                height="18"
                rx="2.5"
                fill="currentColor"
                opacity="0.9"
              />
              <line
                x1="8"
                y1="8"
                x2="16"
                y2="8"
                stroke="#fff"
                strokeWidth="1.8"
              />
              <line
                x1="8"
                y1="12"
                x2="16"
                y2="12"
                stroke="#fff"
                strokeWidth="1.8"
              />
              <line
                x1="8"
                y1="16"
                x2="13"
                y2="16"
                stroke="#fff"
                strokeWidth="1.8"
              />
            </svg>
          )}
          {item.icon === 'image' && (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2.5"
                fill="currentColor"
                opacity="0.9"
              />
              <circle cx="9" cy="10" r="2" fill="#fff" />
              <path d="M5 17l4-4 3 3 4-5 3 6H5z" fill="#fff" />
            </svg>
          )}
          {item.icon === 'video' && (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect
                x="4"
                y="5"
                width="16"
                height="14"
                rx="2.5"
                fill="currentColor"
                opacity="0.9"
              />
              <polygon points="10,9 16,12 10,15" fill="#fff" />
            </svg>
          )}
          {item.icon === 'settings' && (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.9" />
              <circle cx="12" cy="12" r="3.2" fill="#fff" />
              <path
                d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2.2 2.2M15.8 15.8L18 18M6 18l2.2-2.2M15.8 8.2L18 6"
                stroke="#fff"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
      </div>
      <div className="absolute inset-x-4 bottom-4">
        <h3 className="text-white font-semibold text-base leading-snug">
          {item.name}
        </h3>
        <p className="text-white/80 text-xs">{item.groupLabel}</p>
      </div>
    </a>
  );
}

export default function RecursosSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    'mediakit' | 'spec' | 'all'
  >('all');

  const mediakitMenuRef = useRef<HTMLDivElement | null>(null);
  const specsMenuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = useCallback((menu: ActiveMenu) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  }, []);

  const closeMenus = useCallback(() => setActiveMenu(null), []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        mediakitMenuRef.current &&
        !mediakitMenuRef.current.contains(t) &&
        specsMenuRef.current &&
        !specsMenuRef.current.contains(t)
      ) {
        closeMenus();
      }
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenus();
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', esc);
    };
  }, [closeMenus]);

  const addTag = useCallback((tag: string) => {
    setActiveTags((prev) => (prev.includes(tag) ? prev : [...prev, tag]));
  }, []);

  const removeTag = useCallback((tag: string) => {
    setActiveTags((prev) => prev.filter((t) => t !== tag));
  }, []);

  const clearFilters = useCallback(() => {
    setActiveTags([]);
    setSearchQuery('');
    setSelectedCategory('all');
    closeMenus();
  }, [closeMenus]);

  const filteredResources = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return initialResources.filter((res) => {
      if (selectedCategory !== 'all' && res.category !== selectedCategory)
        return false;
      const inText =
        res.name.toLowerCase().includes(query) ||
        res.description.toLowerCase().includes(query) ||
        res.tags.some((t) => t.toLowerCase().includes(query));
      const matchTags = activeTags.every((tag) => res.tags.includes(tag));
      return (query === '' || inText) && matchTags;
    });
  }, [searchQuery, activeTags, selectedCategory]);

  const handleMenuSelect = useCallback(
    (group: 'mediakit' | 'specs', value: string) => {
      setSelectedCategory(group === 'mediakit' ? 'mediakit' : 'spec');
      addTag(value);
      closeMenus();
    },
    [addTag, closeMenus]
  );

  return (
    <section className="rounded-[25px] mx-5 p-6 lg:p-8 bg-white shadow-md min-h-[calc(100vh-120px)]">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="inline-block w-8 h-4 rounded-r-full bg-violetaPrincipal" />
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Recursos
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar recursos…"
              className="w-full sm:w-80 rounded-xl border border-gray-300 bg-white/80 px-4 py-2 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-violetaPrincipal focus:outline-none"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              ⌘K
            </span>
          </div>
          <div className="relative" ref={mediakitMenuRef}>
            <button
              onClick={() => toggleMenu('mediakit')}
              className={`rounded-xl px-4 py-2 border transition ${
                activeMenu === 'mediakit'
                  ? 'bg-violetaPrincipal text-white border-violetaPrincipal'
                  : 'bg-white/80 text-gray-800 border-gray-300 hover:border-violetaPrincipal'
              }`}>
              MediaKits
            </button>
            {activeMenu === 'mediakit' && (
              <div className="absolute z-20 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-xl">
                <ul className="py-2">
                  {mediakitOptions.map((opt) => (
                    <li key={opt}>
                      <button
                        onClick={() => handleMenuSelect('mediakit', opt)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50">
                        {opt}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="relative" ref={specsMenuRef}>
            <button
              onClick={() => toggleMenu('specs')}
              className={`rounded-xl px-4 py-2 border transition ${
                activeMenu === 'specs'
                  ? 'bg-violetaPrincipal text-white border-violetaPrincipal'
                  : 'bg-white/80 text-gray-800 border-gray-300 hover:border-violetaPrincipal'
              }`}>
              Specs
            </button>
            {activeMenu === 'specs' && (
              <div className="absolute z-20 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-xl">
                <ul className="py-2">
                  {specsOptions.map((opt) => (
                    <li key={opt}>
                      <button
                        onClick={() => handleMenuSelect('specs', opt)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50">
                        {opt}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button
            onClick={clearFilters}
            className="rounded-xl px-4 py-2 border bg-white/80 text-gray-800 border-gray-300 hover:border-red-400 hover:text-red-600 transition">
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
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
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
            Intenta modificar la búsqueda o limpiar los filtros para ver más
            recursos.
          </p>
        </div>
      )}
    </section>
  );
}
