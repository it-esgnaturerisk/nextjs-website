'use client';

import React from 'react';

import { insertUser } from '@/lib/db/queries';
import { NewUserType } from '@/lib/types';
// import { redirect } from "next/navigation";

function NewSiteButton() {
  const testUser: NewUserType = {
    name: 'Test bruker Navnesen',
    email: 'email@eksempel.com',
    phone: '+4593963633',
    // companyID: "Bjørgen Teknologi",
  };

  async function handleClick() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const name = insertUser(testUser);
    // redirect("/");
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-greendark text-white py-2 px-4 m-2 rounded-lg shadow-md"
    >
      Add User
    </button>
  );
}

export default NewSiteButton;
