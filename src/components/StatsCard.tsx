interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  subtitle?: string;
}

export default function StatsCard({
  title,
  value,
  change,
  subtitle
}: StatsCardProps) {
  return (
    <div className="relative bg-white/20 backdrop-blur-md rounded-[25px] p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/40 group hover:scale-105">
      {/* Header with icon */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-[#8D30FF] tracking-wide">
          {title}
        </h3>
      </div>

      {/* Main value */}
      <div className="mb-3">
        <div className="text-5xl font-bold text-gray-900 mb-1">{value}</div>
      </div>

      {/* Change/Subtitle */}
      {change && (
        <div className={`text-sm flex items-center text-gray-600`}>
          {change}
        </div>
      )}
      {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[25px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}
