'use server';

import { db } from '@/lib/db/config';
import { users, sites, portfolios } from './schema';
import {
  NewSiteType, NewUserType, SiteType, UserType,
} from '../types';

// Function to fetch all users
export const selectUsers = async () => {
  try {
    const results = await db.select().from(users);
    return results;
  } catch (error) {
    throw new Error(`Error selecting users: ${error}`);
  }
};

export const insertUser = async (newUser: NewUserType) => {
  const insertedUser: UserType = await db
    .insert(users)
    .values(newUser)
    .returning()
    .then((u) => u[0]);
  return insertedUser;
};

export const selectSites = async () => {
  try {
    const results = await db.select().from(sites);
    return results;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const insertSite = async (newSite: NewSiteType) => {
  const insertedSite: SiteType = await db
    .insert(sites)
    .values(newSite)
    .returning()
    .then((s) => s[0]);
  return insertedSite;
};

export const selectPortfolios = async () => {
  try {
    const results = await db.select().from(portfolios);
    return results;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
