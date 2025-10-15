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
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                ID
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                Anunciante
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                Formato
              </th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-900">
                  {campaign.id}
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">
                  {campaign.anunciante}
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {campaign.formato}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
