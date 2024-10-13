"use server";
import "@/lib/db/config";
import { users, sites } from "./schema";
import { NewUserType, UserType } from "../types";
import { db } from "@/lib/db/config";

// Function to fetch all users
export const selectUsers = async () => {
  return await db.select().from(users);
};

export const insertUser = async (newUser: NewUserType) => {
  const insertedUser: UserType = await db
    .insert(users)
    .values(newUser)
    .returning()
    .then((users) => users[0]);
  console.log(`Inserted user ${insertedUser.name} into database.`);
  return insertedUser;
};

export const selectSites = async () => {
  return await db.select().from(sites);
};
