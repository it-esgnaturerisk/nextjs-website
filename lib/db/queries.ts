'use server';

import { db } from '@/lib/db/config';
import { eq } from 'drizzle-orm';
import {
  users, sites, portfolios, ranges,
  siteRanges,
} from './schema';
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

export const selectRanges = async () => {
  try {
    const results = await db.select().from(ranges);
    return results;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const insertSite = async (newSite: NewSiteType, selectedPortfolio: string, selectedRanges: number[]) => {
  const portfolio = await db.select()
    .from(portfolios)
    .where(eq(portfolios.uuid, selectedPortfolio))
    .then((p) => p[0]);
  const site = {
    ...newSite,
    fkPortfolios: portfolio.id,
  };
  const insertedSite: SiteType = await db
    .insert(sites)
    .values(site)
    .returning()
    .then((s) => s[0]);

  await Promise.all(selectedRanges.map((range) => db
    .select()
    .from(ranges)
    .where(eq(ranges.value, range))
    .then((r) => r[0])
    .then((r) => db
      .insert(siteRanges)
      .values({
        fkSites: insertedSite.id,
        fkRanges: r.id,
      })
      .returning())));
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
