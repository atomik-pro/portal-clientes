'use client';

import { useEffect, useState, useRef } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import '../styles/tour.css';
import welcomeImage from '@/assets/recurs/Quick-User-Guide.svg';

export default function TourGuide() {
  const [isActive, setIsActive] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const driverRef = useRef<ReturnType<typeof driver> | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const tourCompleted = localStorage.getItem('tour-completed');

    if (!tourCompleted) {
      const driverObj = driver({
        showProgress: false,
        animate: true,
        allowClose: false, // Prevent closing by clicking overlay, so our button is the only way
        overlayColor: 'rgba(141, 48, 255, 0.96)',
        popoverClass: 'atomik-driver-popover',
        // doneBtnText removed, using custom button
        nextBtnText: 'SIGUIENTE',
        prevBtnText: 'ANTERIOR',
        steps: [
          {
            popover: {
              popoverClass: 'atomik-driver-popover atomik-welcome-popover',
              title:
                'BIENVENIDO AL <span style="color: #8D30FF;">PORTAL DE CLIENTES</span> ATOMIK',
              description: `
                <img src="${welcomeImage.src}" alt="Welcome" style="width: 100%; max-width: 350px; margin: 0 auto;" />
                <p>Un espacio diseñado para centralizar y simplificar tu experiencia con nosotros.</p>
              `,
              align: 'center'
            }
          },
          {
            element: '#tour-campanas',
            popover: {
              title: 'Campañas',
              description:
                'Consultá las métricas, reportes y resultados de tus campañas.',
              side: 'right',
              align: 'center'
            }
          },
          {
            element: '#tour-solicitudes',
            popover: {
              title: 'Solicitudes',
              description:
                'Gestiona tus peticiones de diseño, contenido y otros servicios de manera centralizada.',
              side: 'right',
              align: 'center'
            }
          },
          {
            element: '#tour-documentos',
            popover: {
              title: 'Documentos',
              description:
                'Encuentra guías, tutoriales y material de apoyo para sacar el máximo provecho a la plataforma.',
              side: 'right',
              align: 'center'
            }
          },
          {
            element: '#tour-mi-equipo',
            popover: {
              title: 'Mi Equipo',
              description:
                'Conoce a los expertos detrás de tu cuenta y contáctalos fácilmente.',
              side: 'right',
              align: 'center'
            }
          },
          {
            popover: {
              title: '¡Todo listo!',
              description:
                'Todo lo que necesitás para gestionar y optimizar tus campañas está acá. Explorá y aprovechá al máximo tu portal.',
              side: 'bottom',
              align: 'center'
            }
          }
        ],
        onHighlightStarted: (element, step) => {
          setIsActive(true);

          // Hide title on welcome step
          const isWelcome =
            !step.element ||
            step.popover?.popoverClass?.includes('atomik-welcome-popover');
          setShowTitle(!isWelcome);

          // Auto-advance logic
          if (timerRef.current) clearTimeout(timerRef.current);

          timerRef.current = setTimeout(() => {
            if (driverObj.hasNextStep()) {
              driverObj.moveNext();
            } else {
              // Last step, finish tour
              driverObj.destroy();
              localStorage.setItem('tour-completed', 'true');
              setIsActive(false);
            }
          }, 4000); // 4 seconds per step
        },
        onDestroyStarted: () => {
          if (timerRef.current) clearTimeout(timerRef.current);

          // Ensure we clean up if destroyed manually or by end of tour
          if (!driverObj.hasNextStep()) {
            localStorage.setItem('tour-completed', 'true');
          }
          setIsActive(false);
          driverObj.destroy();
        }
      });

      driverRef.current = driverObj;
      driverObj.drive();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (driverRef.current) driverRef.current.destroy();
    };
  }, []);

  const handleSkip = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (timerRef.current) clearTimeout(timerRef.current);

    if (driverRef.current) {
      driverRef.current.destroy();
      localStorage.setItem('tour-completed', 'true');
      setIsActive(false);
    }
  };

  if (!isActive) return null;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '40px',
          left: '60px',
          zIndex: 1000000002,
          pointerEvents: 'none'
        }}>
        {showTitle && (
          <h1 className="text-3xl font-bold text-white tracking-wide">
            GUÍA RÁPIDA DE USO
          </h1>
        )}
      </div>

      <button
        onClick={handleSkip}
        className="fixed bottom-10 right-10 bg-white text-[#8D30FF] rounded-full px-8 py-3 font-bold shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105 z-[1000000002] uppercase tracking-wide text-sm">
        OMITIR GUÍA
      </button>
    </>
  );
}
