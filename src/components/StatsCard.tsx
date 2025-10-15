interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  subtitle?: string;
  color: string;
}

export default function StatsCard({
  title,
  value,
  change,
  subtitle,
  color
}: StatsCardProps) {
  return (
    <div className={`${color} rounded-2xl p-6 shadow-sm`}>
      <h3 className="text-lg font-bold text-violet-600 mb-2">{title}</h3>
      <div className="text-5xl font-bold text-[#191919] mb-2">{value}</div>
      {change && <p className="text-sm text-gray-600">{change}</p>}
      {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
    </div>
  );
}
