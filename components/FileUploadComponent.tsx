'use client';

/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

const acceptedFileTypes = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'application/vnd.ms-excel': ['.xls'],
  'text/csv': ['.csv'],
};

export default function FileUploadComponent() {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter((file) => Object.keys(acceptedFileTypes).includes(file.type));
    setFiles((prev) => [...prev, ...validFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    multiple: true,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Using FormData to send files:
    // const formData = new FormData();
    // files.forEach((file) => {
    //   formData.append('files[]', file);
    // });
    // fetch('/your-upload-endpoint', {
    //   method: 'POST',
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('Success:', data);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
    toast({
      title: 'Success',
      description: 'Files uploaded and sent to processing.',
    });
    setFiles([]); // Clear files after submission
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      {/* Upload area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          {isDragActive
            ? 'Drop the files here...'
            : 'Drag & drop PDF, Excel, or CSV files here, or click to browse'}
        </p>
      </div>

      {/* Uploaded file list */}
      <ul className="space-y-2">
        {files.map((file, index) => (
          <li
            key={file.name}
            className="flex justify-between items-center border px-4 py-2 rounded-lg bg-gray-50"
          >
            <span className="truncate max-w-xs">{file.name}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeFile(index)}
            >
              <Trash2 className="h-5 w-5 text-red-500" />
            </Button>
          </li>
        ))}
      </ul>

      {/* Submit button */}
      <Button
        className="w-full"
        onClick={handleSubmit}
        disabled={files.length === 0}
      >
        Submit Files
      </Button>
      <Toaster />
    </div>
  );
}
