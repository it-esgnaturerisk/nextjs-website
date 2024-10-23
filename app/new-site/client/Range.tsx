/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useMemo } from 'react';
import { RangesType } from '@/lib/types';
import Select from 'react-select';

export default function Range({
  onRangeUpdate,
  allRanges,
}: {
  onRangeUpdate: (selectedValues: number[]) => void;
  allRanges: RangesType[];
}) {
  const [nOptionsSelected, setNOptionsSelected] = useState<number>(0);
  const handleRangeUpdate = (selectedOptions: number[]) => {
    setNOptionsSelected(selectedOptions.length);
    onRangeUpdate(selectedOptions);
  };
  const sortedRanges = useMemo(() => allRanges.sort((a, b) => a.value - b.value), [allRanges]);
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
        isOptionDisabled={() => nOptionsSelected >= 3}
        isMulti
        isSearchable
        options={sortedRanges}
        className="basic"
        backspaceRemovesValue
        closeMenuOnSelect={nOptionsSelected === 2}
      />
    </div>
  );
}
