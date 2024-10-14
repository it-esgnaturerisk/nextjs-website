/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Select from 'react-select';

export default function Range({
  onRangeUpdate,
}: {
  onRangeUpdate: (selectedValues: number[]) => void;
}) {
  const options = [
    { value: 1, label: '1 km' },
    { value: 2, label: '2 km' },
    { value: 3, label: '3 km' },
    { value: 4, label: '4 km' },
    { value: 5, label: '5 km' },
    { value: 10, label: '10 km' },
    { value: 15, label: '15 km' },
    { value: 20, label: '20 km' },
    { value: 25, label: '25 km' },
    { value: 30, label: '30 km' },
    { value: 35, label: '35 km' },
    { value: 40, label: '40 km' },
    { value: 45, label: '45 km' },
    { value: 50, label: '50 km' },
    { value: 55, label: '55 km' },
  ];

  const [nOptionsSelected, setNOptionsSelected] = useState<number>(0);

  const handleRangeUpdate = (selectedOptions: number[]) => {
    setNOptionsSelected(selectedOptions.length);
    onRangeUpdate(selectedOptions);
  };

  return (
    <div className="mb-6">
      <label
        className="block text-gray-700 font-semibold mb-2"
        htmlFor="longitude"
      >
        Ranges*
      </label>
      <p className="text-sm text-gray-500 mb-2">
        Select up to three ranges (radius) to calculate and assess risks around
        the central point.
      </p>
      <Select
        onChange={(selectedOptions) => handleRangeUpdate(selectedOptions.map((option) => option.value))}
        isMulti
        isSearchable
        options={options}
        className="basic"
        backspaceRemovesValue
        closeMenuOnSelect={nOptionsSelected === 2}
      />
    </div>
  );
}
