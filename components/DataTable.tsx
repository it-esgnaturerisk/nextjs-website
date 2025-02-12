'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface DataTableProps {
  data: {
    head: { label: string; style: string }[];
    body: {
      label: string | number | React.JSX.Element | null | Promise<string>;
      style: string;
      hidden: boolean;
      idColumn: boolean;
    }[][];
  };
  emptyMessage?: React.JSX.Element;
}

export default function DataTable({
  data,
  emptyMessage = undefined,
}: DataTableProps) {
  if (data.body.length === 0 && emptyMessage) {
    return emptyMessage;
  }

  return (
    <div>
      <Table className="min-w-full bg-white">
        <TableHeader className="bg-greenlight">
          <TableRow>
            {data.head.map((head) => (
              <TableHead key={head.label} className={head.style}>
                {head.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.body.map((body, index) => (
            <TableRow key={`${index + 1}`}>
              {body.map(
                (cell, i2) => !cell.hidden && (
                <TableCell key={`${i2 + 1}`} className={cell.style}>
                  {cell.label}
                </TableCell>
                ),
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
