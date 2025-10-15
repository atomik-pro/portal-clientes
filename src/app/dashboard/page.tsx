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
      change: '+18% al mes anterior',
      color: 'bg-white'
    },
    {
      title: 'Campañas próx. a finalizar',
      value: '6',
      subtitle: 'Entre hoy y el sábado',
      color: 'bg-white'
    },
    {
      title: 'Inversión este mes',
      value: '$2.9K',
      change: '+30% al mes anterior',
      color: 'bg-white'
    }
  ];

  const campaignsData = [
    { id: 'ATK2345', anunciante: 'Coca-Cola', formato: 'Rich Media' },
    { id: 'ATK2345', anunciante: 'Coca-Cola', formato: 'Rich Media' },
    { id: 'ATK2345', anunciante: 'Coca-Cola', formato: 'Rich Media' },
    { id: 'ATK2345', anunciante: 'Coca-Cola', formato: 'Rich Media' },
    { id: 'ATK2345', anunciante: 'Coca-Cola', formato: 'Rich Media' },
    { id: 'ATK2345', anunciante: 'Coca-Cola', formato: 'Rich Media' },
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
          <div className="relative rounded-3xl p-8 mb-8 overflow-hidden min-h-[calc(100vh-120px)]">
            <div className="relative z-10 h-full">
              <h1 className="text-3xl font-bold text-[#191919] mb-8">
                Hola, {userName}!
              </h1>
              {/* Stats Grid */}
              <div className="flex flex-1 gap-6 h-full">
                <div className="flex flex-col justify-between w-1/5">
                  {statsData.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                  ))}
                </div>
                {/* Campaigns Table */}
                <div className="flex flex-col gap-6 w-1/3">
                  <CampaignsTable campaigns={campaignsData} />
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="absolute right-0 top-0 h-full w-full hidden lg:block">
              <Image src={heroImg} alt="Dashboard Atomik Home" fill />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
