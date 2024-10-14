'use client';

/* eslint-disable react/function-component-definition */

import React, { ChangeEvent, FC, useState } from 'react';
import { NewUserType } from '@/lib/types';

interface Props {
  createUser: (newUser: NewUserType) => void;
}

const CreateUser: FC<Props> = ({ createUser }) => {
  // State for handling input values
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [elevation, setElevation] = useState<
    'regular' | 'technician' | 'admin'
  >('regular');
  const [company, setCompany] = useState<string>('');

  // Event handler for input changes
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setter: (value: any) => void,
  ) => {
    const { value } = e.target;
    setter(value === '' ? null : value);
  };

  //   const handleDateChange = (
  //     e: ChangeEvent<HTMLInputElement>,
  //     setter: (value: Date | null) => void
  //   ) => {
  //     const dateValue = e.target.value ? new Date(e.target.value) : null;
  //     setter(dateValue);
  //   };

  const handleElevationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setElevation(e.target.value as 'regular' | 'technician' | 'admin');
  };

  // Event handler for adding a new user
  const handleAdd = async () => {
    const newUser: NewUserType = {
      name,
      email,
      phone,
      elevation,
      fkCompanies: company,
    };
    createUser(newUser);
  };

  // Rendering the AddUser component
  return (
    <div className="w-full flex flex-col gap-2 mt-2">
      <input
        type="text"
        placeholder="Name"
        className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
        onChange={(e) => handleInputChange(e, setName)}
        value={name || ''}
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
        onChange={(e) => handleInputChange(e, setEmail)}
        value={email || ''}
      />
      <input
        type="tel"
        placeholder="Phone"
        className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
        onChange={(e) => handleInputChange(e, setPhone)}
        value={phone || ''}
      />
      <select
        className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
        onChange={handleElevationChange}
        value={elevation || ''}
      >
        <option value="regular">regular</option>
        <option value="technician">technician</option>
        <option value="admin">admin</option>
      </select>
      <input
        type="number"
        placeholder="Company ID"
        className="w-full px-2 py-1 border border-gray-200 rounded outline-none"
        onChange={(e) => handleInputChange(e, setCompany)}
        value={company || ''}
      />
      <button
        type="button"
        className="flex items-center justify-center bg-green-600 text-green-50 rounded px-2 h-9 w-full py-1"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
};

export default CreateUser;
