'use client';

import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';

type RawDataType = {
  rangesValue: number;
  veryBig: number;
  big: number;
  medium: number;
  small: number;
};

type BarChartNatureTypesProps = {
  data: RawDataType[];
};

const transformData = (item: RawDataType) => [
  { name: 'Low-value', value: item.small },
  { name: 'Medium-value', value: item.medium },
  { name: 'High-value', value: item.big },
  { name: 'Very-high-value', value: item.veryBig },
];

export default function BarChartNatureTypes({ data }: BarChartNatureTypesProps) {
  // Find maximum value in the data if we want them both to use same y-axis
  // const maxValue = data.reduce((prev, item) => {
  //   const itemMax = Math.max(item.veryBig, item.big, item.medium, item.small);
  //   return Math.max(prev, itemMax);
  // }, 0);

  return (
    <div className="w-full px-6">
      <h2 className="text-2xl font-bold text-center mb-8">
        Nature Types Around Site
      </h2>

      <div className="flex flex-col md:flex-row gap-6 w-full">
        {data.map((item) => (
          <div key={item.rangesValue} className="w-full md:w-1/2">
            <h3 className="text-center text-base font-medium mb-2">
              {item.rangesValue}
              km
            </h3>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={transformData(item)}
                  margin={{
                    top: 20, right: 0, bottom: 20, left: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
