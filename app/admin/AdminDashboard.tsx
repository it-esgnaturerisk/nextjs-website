"use client";
import { NewUserType, SiteType, UserType } from "@/lib/types";
import UserRow from "./UserRow";
import { FC, useState } from "react";
import { insertUser } from "@/lib/db/queries";
import UsersTable from "./UsersTable";
import RecentSitesTable from "@/components/RecentSitesTable";
import CreateUser from "./CreateUser";

interface Props {
  users: UserType[];
  sites: SiteType[];
}

const AdminDashboard: FC<Props> = ({ users, sites }) => {
  //   const createUser = (newUser: NewUserType) => {
  //     insertUser(newUser);
  //   };

  return (
    <div>
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">All Users</h2>
        <UsersTable users={users} />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">All Existing Sites</h2>
        <RecentSitesTable sites={sites} />
      </div>

      {/* <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Create a new user</h2>
        <CreateUser createUser={createUser} />
      </div> */}
    </div>
  );
};

export default AdminDashboard;
