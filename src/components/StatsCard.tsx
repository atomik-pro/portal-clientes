interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  subtitle?: string;
  variant?: 'glass' | 'white';
}

export default function StatsCard({
  title,
  value,
  change,
  subtitle,
  variant = 'glass'
}: StatsCardProps) {
  const baseCard =
    variant === 'glass'
      ? 'bg-white/20 backdrop-blur-md border border-white/40'
      : 'bg-white border border-gray-200';
  const shadow =
    variant === 'glass'
      ? 'shadow-lg hover:shadow-xl'
      : 'shadow-md hover:shadow-lg';
  return (
    <div
      className={`relative ${baseCard} rounded-[25px] p-6 ${shadow} transition-all duration-300 group hover:scale-[1.02]`}>
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
        <div className={`text-sm flex items-center text-[#8D30FF]`}>
          {change}
        </div>
      )}
      {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}

      {/* Gradient overlay solo para glass */}
      {variant === 'glass' && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[25px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
    </div>
  );
}
