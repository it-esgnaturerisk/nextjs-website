import React from 'react';

interface StatsCardProps {
  number: number;
  label: string;
  // eslint-disable-next-line react/no-unused-prop-types
  additionalClasses?: string;
}

export default function StatsCard(props: StatsCardProps) {
  const { number, label } = props;
  return (
    <>
      <div className="text-lg font-semibold">{number}</div>
      <div className="text-gray-600">{label}</div>
    </>
  );
}

StatsCard.defaultProps = {
  additionalClasses: '',
};
