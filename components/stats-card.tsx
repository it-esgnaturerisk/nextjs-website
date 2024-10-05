interface StatsCardProps {
  number: number;
  label: string;
  additionalClasses?: string;
}

export default function StatsCard(props: StatsCardProps) {
  return (
    <>
      <div className="text-lg font-semibold">{props.number}</div>
      <div className="text-gray-600">{props.label}</div>
    </>
  );
}
