'use client';

import { useEffect, useState } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import '../styles/tour.css';

export default function TourGuide() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const tourCompleted = localStorage.getItem('tour-completed');

    if (!tourCompleted) {
      const driverObj = driver({
        showProgress: false, // Hide default progress to match clean design
        animate: true,
        allowClose: true,
        overlayColor: 'rgba(141, 48, 255, 0.92)', // Violet overlay
        popoverClass: 'atomik-driver-popover', // Custom class
        doneBtnText: 'OMITIR GUÍA', // Use this as the main "Exit" button if we want
        nextBtnText: 'SIGUIENTE',
        prevBtnText: 'ANTERIOR',
        steps: [
          {
            popover: {
              title: '¡Bienvenido a Atomik!',
              description:
                'Te invitamos a un recorrido rápido para que conozcas las herramientas clave de tu nuevo portal.',
              side: 'bottom',
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
                'Ya conoces lo esencial. ¡Explora y empieza a crecer con Atomik!',
              side: 'bottom',
              align: 'center',
              doneBtnText: 'FINALIZAR'
            }
          }
        ],
        onHighlightStarted: () => {
          setIsActive(true);
        },
        onDestroyStarted: () => {
          if (!driverObj.hasNextStep() || confirm('¿Quieres salir del tour?')) {
            driverObj.destroy();
            localStorage.setItem('tour-completed', 'true');
            setIsActive(false);
          }
        }
      });

      driverObj.drive();
    }
  }, []);

  if (!isActive) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '40px',
        left: '60px',
        zIndex: 1000000002, // Higher than driver.js overlay
        pointerEvents: 'none'
      }}>
      <h1 className="text-3xl font-bold text-white tracking-wide">
        GUÍA RÁPIDA DE USO
      </h1>
    </div>
  );
}
