'use client';

import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
} from 'recharts';
// import { Card, CardContent } from "@/components/ui/card";

type YearData = {
  year: number;
  numberOfObservations: number;
};

type BarChartComponentProps = {
  data: YearData[];
};

export default function BarChartComponent({ data }: BarChartComponentProps) {
  const sortedData = [...data].sort((a, b) => a.year - b.year);
  return (
  // <Card className="mt-4">
  // <CardContent>
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={sortedData}
        margin={{
          top: 20, right: 0, bottom: 20, left: 0,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Bar dataKey="numberOfObservations" fill="#4f46e5" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  // </CardContent>
  // </Card>
  );
}
