/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import React, { FC } from 'react';
import { SiteType, UserType } from '@/lib/types';
import { insertUser } from '@/lib/db/queries';
import RecentSitesTable from '@/components/RecentSitesTable';
import UsersTable from './UsersTable';
import CreateUser from './CreateUser';

interface Props {
  users: UserType[];
  sites: SiteType[];
}

const AdminDashboard: FC<Props> = ({ users, sites }) => (
  <div>
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">All Users</h2>
      <UsersTable users={users} />
    </div>

    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">All Existing Sites</h2>
      <RecentSitesTable sites={sites} />
    </div>

    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Create a new user</h2>
      <CreateUser createUser={insertUser} />
    </div>
  </div>
);
export default AdminDashboard;
