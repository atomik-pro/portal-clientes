interface Campaign {
  id: string;
  anunciante: string;
  formato: string;
}

interface CampaignsTableProps {
  campaigns: Campaign[];
}

export default function CampaignsTable({ campaigns }: CampaignsTableProps) {
  return (
    <div className="relative bg-white/20 backdrop-blur-md border border-white/40 rounded-[25px] p-0 shadow-lg h-[580px]">
      {/* Header Section with Title and Stats */}
      <div className="p-6 pb-4">
        <h2 className="text-lg font-semibold text-[#8D30FF] tracking-wide mb-2">
          Campañas activas
        </h2>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-5xl font-bold text-gray-900">87</span>
        </div>
        <p className="text-sm text-gray-600">
          <span className="text-[#8D30FF] font-bold">+15%</span> al mes anterior
        </p>
      </div>

      {/* Table Section */}
      <div className="relative p-6">
        {/* Table Header with Gradient */}
        <div className="bg-gradient-to-r from-[#8D30FF] to-[#BB86FC] rounded-t-[9px] px-6 py-3">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="text-sm font-bold text-white">ID</div>
            <div className="text-sm font-bold text-white">Anunciante</div>
            <div className="text-sm font-bold text-white">Formato</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="backdrop-blur-sm">
          {campaigns.map((campaign, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 gap-4 px-6 py-3 text-center
                ${`${index % 2 === 0 ? 'bg-[#FFFFFF]/40' : ''}`}
              `}>
              <div className="text-sm text-black">{campaign.id}</div>
              <div className="text-sm text-black">{campaign.anunciante}</div>
              <div className="text-sm text-black">{campaign.formato}</div>
            </div>
          ))}
        </div>

        {/* Bottom rounded corners */}
        <div className="h-4 backdrop-blur-sm rounded-b-[25px]"></div>
      </div>

      {/* Glass overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[25px] opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}
