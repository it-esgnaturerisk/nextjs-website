'use client';

import React, { useCallback, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { deleteSite, updateSiteReportLink } from '@/lib/db/queries';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
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
  actionButtons?: boolean;
}

export default function DataTable({
  data,
  emptyMessage = undefined,
  actionButtons = false,
}: DataTableProps) {
  const [selectedRowsIndex, setSelectedRows] = useState<number[]>([]);
  const { toast } = useToast();
  const { user, error, isLoading } = useUser();

  const getSelectedUUIDs = useCallback((selectedRowsIndices: number[]): string[] => {
    if (!selectedRowsIndices?.length) {
      toast({
        title: 'Error',
        description: 'No sites selected!',
      });
      return [];
    }
    // Look for uuids in the first column of the selected rows
    return selectedRowsIndices
      .map((index) => data.body?.[index]?.[0]?.label as string)
      .filter((uuid) => typeof uuid === 'string' && uuid.trim() !== '');
  }, [data.body, toast]);

  const handleCheckboxChange = (index: number) => {
    setSelectedRows((prevSelectedRows) => (prevSelectedRows.includes(index)
      ? prevSelectedRows.filter((row) => row !== index)
      : [...prevSelectedRows, index]));
  };

  const processSelectedSites = useCallback(
    async (action: (uuid: string) => Promise<{ success: boolean }>, successMessage: string) => {
      try {
        const selectedRowsUUIDs = getSelectedUUIDs(selectedRowsIndex);

        if (!selectedRowsUUIDs.length) return;

        await Promise.all(selectedRowsUUIDs.map(action));

        toast({
          title: 'Success',
          description: successMessage.replace('{count}', selectedRowsIndex.length.toString()),
        });
      } catch (err) {
        console.error('Error processing sites:', err);
        toast({
          title: 'Error',
          description: 'Failed to process some sites. Please try again.',
        });
      }
    },
    [selectedRowsIndex, toast, getSelectedUUIDs],
  );

  const handleSendToEmail = useCallback(() => {
    processSelectedSites(updateSiteReportLink, '{count} site(s) was processed!');
  }, [processSelectedSites]);

  const handleDeleteSite = useCallback(() => {
    processSelectedSites(deleteSite, '{count} site(s) deleted!');
    setSelectedRows([]);
  }, [processSelectedSites]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!user) return <Link href="/api/auth/login">Login</Link>;

  if (data.body.length === 0 && emptyMessage) {
    return emptyMessage;
  }

  // filter out the columns where email is not equal to the user email
  data.body = data.body.filter((row) => row[1].label === user.email);

  return (
    <div>
      <Table className="min-w-full bg-white">
        <TableHeader className="bg-greenlight">
          <TableRow>
            {actionButtons ? (
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
            ) : null}

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
              {actionButtons ? (
                <TableCell className="w-12">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(index)}
                    checked={selectedRowsIndex.includes(index)}
                  />
                </TableCell>
              ) : null}

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
      {actionButtons ? (
        <>
          <Button className="bg-greendark text-white py-2 px-4 m-2 rounded-lg shadow-md" onClick={handleSendToEmail}> Process </Button>
          <Button className="bg-greendark text-white py-2 px-4 m-2 rounded-lg shadow-md" onClick={handleDeleteSite}> Delete </Button>
        </>
      ) : null}
      <Toaster />
    </div>
  );
}
