'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';

import heroImg from '@/assets/images/home.png';
import Header from '@/components/Header';
import StatsCard from '@/components/StatsCard';
import CampaignsTable from '@/components/CampaignsTable';

export default function Dashboard() {
  const { data: session } = useSession();

  const userName =
    session?.user?.name || session?.user?.email?.split('@')[0] || 'Usuario';

  const statsData = [
    {
      title: 'Campañas este mes',
      value: '133',
      change: '+15% al mes anterior'
    },
    {
      title: 'Campañas próx. a finalizar',
      value: '6',
      subtitle: 'Entre hoy y el sábado'
    },
    {
      title: 'Inversión este mes',
      value: '$2.9K',
      change: '+30% al mes anterior'
    }
  ];

  const campaignsData = [
    { id: 'ATK2345', anunciante: 'Coca-Cola', formato: 'Rich Media' },
    { id: 'ATK2345', anunciante: 'Coca-Cola', formato: 'Rich Media' },
    { id: 'ATK2345', anunciante: 'Coca-Cola', formato: 'Rich Media' },
    { id: 'ATK2345', anunciante: 'Coca-Cola', formato: 'Rich Media' },
    { id: 'ATK2345', anunciante: 'Coca-Cola', formato: 'Rich Media' },
    { id: 'ATK2345', anunciante: 'Coca-Cola', formato: 'Rich Media' }
  ];

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 px-4 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-2">
          {/* Hero Section */}
          <div className="relative rounded-3xl p-8 mb-8 overflow-hidden min-h-[calc(100vh-120px)] bg-gradient-to-br from-violet-100 via-purple-50 to-pink-100">
            {/* Background Image */}
            <div className="absolute right-0 top-0 h-full w-full hidden lg:block">
              <Image
                src={heroImg}
                alt="Dashboard Atomik Home"
                fill
                className="object-cover object-right"
                priority
              />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full">
              <h1 className="text-4xl font-bold text-gray-900 mb-12">
                Hola, {userName}!
              </h1>

              {/* Stats and Table Layout */}
              <div className="flex gap-8 h-[calc(100%-120px)]">
                {/* Stats Cards Column */}
                <div className="flex flex-col justify-between w-80 space-y-6">
                  {statsData.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                  ))}
                </div>

                {/* Campaigns Table Column */}
                <div className="flex-1 max-w-2xl">
                  <CampaignsTable campaigns={campaignsData} />
                </div>

                {/* Right space for background image */}
                <div className="flex-1 min-w-0"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
