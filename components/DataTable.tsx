'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
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
    body: { label: string | number | React.JSX.Element | null; style: string; hidden: boolean; idColumn: boolean }[][]
  };
  emptyMessage?: React.JSX.Element;
  redirectPath?: string | undefined;
}
function DataTable({ data, emptyMessage, redirectPath }: DataTableProps) {
  const router = useRouter();
  if (data.body.length === 0 && emptyMessage) {
    return emptyMessage;
  }

  const handleRowClick = (idx: number) => {
    if (redirectPath) {
      const id = data.body[idx].find((cell) => cell.idColumn)?.label;
      router.push(`${redirectPath}${id}`);
    }
  };

  return (
    <Table className="min-w-full bg-white">
      <TableHeader className="bg-greenlight">
        <TableRow>
          {
            data.head.map((head) => (
              <TableHead key={head.label} className={head.style}>
                {head.label}
              </TableHead>
            ))
          }
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.body.map((body, index) => (
          <TableRow key={`${index + 1}`} onClick={() => handleRowClick(index)} className="hover:cursor-pointer">
            {body.map((cell, i2) => (
              !cell.hidden && (
                <TableCell key={`${i2 + 1}`} className={cell.style}>
                  {cell.label}
                </TableCell>
              )
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

DataTable.defaultProps = {
  emptyMessage: null,
  redirectPath: undefined,
};

export default DataTable;
