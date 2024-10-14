'use server';

import { db } from '@/lib/db/config';
import { users, sites } from './schema';
import { NewUserType, UserType } from '../types';

// Function to fetch all users
export const selectUsers = async () => {
  try {
    const results = await db.select().from(users);
    return results;
  } catch (error) {
    console.error('Error selecting users:', error);
    return [];
  }
};

export const insertUser = async (newUser: NewUserType) => {
  const insertedUser: UserType = await db
    .insert(users)
    .values(newUser)
    .returning()
    .then((u) => u[0]);
  console.log(`Inserted user ${insertedUser.name} into database.`);
  return insertedUser;
};

export const selectSites = async () => {
  try {
    const results = await db.select().from(sites);
    return results;
  } catch (error) {
    console.error('Error selecting sites:', error);
    return [];
  }
};
