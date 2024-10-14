'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/function-component-definition */

import React, { FC, useState } from 'react';
import { NewUserType, UserType } from '@/lib/types';
import { insertUser } from '@/lib/db/queries';
import UserRow from './UserRow';

interface UsersTableProps {
  users: UserType[];
}

const UsersTable: FC<UsersTableProps> = ({ users }) => {
  // Function to change the text of a user item
  // const changeUserName = (id: number, text: string) => {
  //   setUserItems((prev) =>
  //     prev.map((user) => (user.id === id ? { ...user, text } : user))
  //   );
  //   editUser(id, text);
  // };

  // Function to delete a user item
  // const deleteUserItem = (id: number) => {
  //   setUserItems((prev) => prev.filter((user) => user.id !== id));
  //   deleteUser(id);
  // };
  console.log('users:', users);

  if (users.length === 0) {
    console.log('Database responded correctly, but no users were found.');
    return <div>No users were found.</div>;
  }
  return (
    <main className="overflow-x-auto">
      {/* <main className="flex mx-auto max-w-xl w-full min-h-screen flex-col items-center p-16"> */}

      <table className="min-w-full bg-white">
        <thead className="bg-greenlight">
          <tr>
            <th className="py-2 px-4 border-b text-left">id</th>
            <th className="py-2 px-4 border-b text-left">name</th>
            <th className="py-2 px-4 border-b text-left">email</th>
            <th className="py-2 px-4 border-b text-left">phone</th>
            <th className="py-2 px-4 border-b text-left">createdAt</th>
            <th className="py-2 px-4 border-b text-left">updatedAt</th>
            <th className="py-2 px-4 border-b text-left">elevation</th>
            <th className="py-2 px-4 border-b text-left">lastActive</th>
            <th className="py-2 px-4 border-b text-left">company</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* {users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  // changeUserName={changeUserName}
                  // deleteUserItem={deleteUserItem}
                ></UserRow>
              ))} */}
          </tr>
        </tbody>
      </table>
      {/* <addUser createUser={createUser} /> */}
    </main>
  );
};

export default UsersTable;
