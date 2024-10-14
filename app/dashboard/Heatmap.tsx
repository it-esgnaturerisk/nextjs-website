// components/Heatmap.js
import React from 'react';

export default function Heatmap() {
  const countries = [
    { name: 'ESP', count: 15, color: 'bg-green-399' },
    { name: 'CHN', count: 6, color: 'bg-green-300' },
    { name: 'FRA', count: 2, color: 'bg-red-200' },
    { name: 'DEU', count: 1, color: 'bg-red-300' },
    { name: 'NOR', count: 8, color: 'bg-orange-200' },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {countries.map((country, index) => (
        <div key={`${country.name}-${index + 1}`} className={`${country.color} p-2 text-center`}>
          {country.count}
          {' '}
          {country.name}
        </div>
      ))}
    </div>
  );
}
