'use client';

import React, { useCallback, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { updateSiteReportLink } from '@/lib/db/queries';
import { Button } from './ui/button';
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
  const [selectedRowsIndex, setSelectedRows] = useState<number[]>([]);
  const { toast } = useToast();

  const handleCheckboxChange = (index: number) => {
    setSelectedRows((prevSelectedRows) => (prevSelectedRows.includes(index)
      ? prevSelectedRows.filter((row) => row !== index)
      : [...prevSelectedRows, index]));
  };

  const handleSendToEmail = useCallback(async () => {
    try {
      if (!selectedRowsIndex || selectedRowsIndex.length === 0) {
        toast({
          title: 'Error',
          description: 'No sites selected!',
        });
        return;
      }

      const selectedRowsUUIDs: string[] = selectedRowsIndex
        .map((index) => {
          const label = data.body[index][0].label as string;
          return typeof label === 'string' ? label : '';
        })
        .filter((uuid) => uuid !== ''); // Remove empty strings

      await Promise.all(selectedRowsUUIDs.map((uuid) => updateSiteReportLink(uuid)));

      toast({
        title: 'Success',
        description: `${selectedRowsIndex.length} sites were processed!`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update some sites. Please try again.',
      });
    }
  }, [selectedRowsIndex, data, toast]);

  if (data.body.length === 0 && emptyMessage) {
    return emptyMessage;
  }

  return (
    <div>
      <Button className="bg-greendark text-white py-2 px-4 m-2 rounded-lg shadow-md" onClick={handleSendToEmail}> Process </Button>
      <Table className="min-w-full bg-white">
        <TableHeader className="bg-greenlight">
          <TableRow>
            <TableHead className="w-12">
              <input
                type="checkbox"
                onChange={() => setSelectedRows(
                  selectedRowsIndex.length === data.body.length
                    ? []
                    : data.body.map((_, index) => index),
                )}
                checked={selectedRowsIndex.length === data.body.length}
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
                  checked={selectedRowsIndex.includes(index)}
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
      <Toaster />
    </div>
  );
}
