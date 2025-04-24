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
  { name: 'Very big value nature', value: item.veryBig },
  { name: 'Big value nature', value: item.big },
  { name: 'Medium value nature', value: item.medium },
  { name: 'Some Value nature', value: item.small },
];

export default function BarChartNatureTypes({ data }: BarChartNatureTypesProps) {
  return (
    <div className="w-full px-6">
      <h2 className="text-2xl font-bold text-center mb-8">
        Valued Nature Types Around Site
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
                  <YAxis tick={{ fontSize: 12 }} />
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
