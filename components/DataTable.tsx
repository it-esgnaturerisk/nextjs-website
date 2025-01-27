'use client';

import React, { useState } from 'react';
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
  // const router = useRouter();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  if (data.body.length === 0 && emptyMessage) {
    return emptyMessage;
  }

  // const handleRowClick = (idx: number) => {
  //   if (redirectPath) {
  //     const id = data.body[idx].find((cell) => cell.idColumn)?.label;
  //     router.push(`${redirectPath}${id}`);
  //   }
  // };

  const handleCheckboxChange = (index: number) => {
    setSelectedRows((prevSelectedRows) => (prevSelectedRows.includes(index)
      ? prevSelectedRows.filter((row) => row !== index)
      : [...prevSelectedRows, index]));
  };

  const handleDeleteSelected = () => {
    // Implement the logic to delete the selected rows
    console.log('Deleting rows:', selectedRows);
  };

  return (
    <div>
      <button type="button" onClick={handleDeleteSelected}>
        Delete Selected
      </button>
      <Table className="min-w-full bg-white">
        <TableHeader className="bg-greenlight">
          <TableRow>
            <TableHead className="w-12">
              <input
                type="checkbox"
                onChange={() => setSelectedRows(
                  selectedRows.length === data.body.length
                    ? []
                    : data.body.map((_, index) => index),
                )}
                checked={selectedRows.length === data.body.length}
              />
            </TableHead>
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
              <TableCell className="w-12">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(index)}
                  checked={selectedRows.includes(index)}
                />
              </TableCell>
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
