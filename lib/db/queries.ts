'use server';

import { db } from '@/lib/db/config';
import { eq } from 'drizzle-orm';
import axios from 'axios';
import {
  users, sites, portfolios, ranges,
  siteRanges,
  companies,
  speciesObserved,
  species,
} from './schema';
import {
  NewPortfolioType,
  NewSiteType, NewUserType, SiteType, SpeciesType, UserType,
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

export const insertPortfolio = async (newPortfolio: NewPortfolioType) => {
  const insertedPortfolio = await db
    .insert(portfolios)
    .values(newPortfolio)
    .returning()
    .then((p) => p[0]);
  return insertedPortfolio;
};

export const insertSite = async (newSite: NewSiteType, selectedPortfolio: string, selectedRanges: number[]) => {
  const portfolio = await db.select()
    .from(portfolios)
    .where(eq(portfolios.uuid, selectedPortfolio))
    .then((p) => p[0]);
  const { latitude, longitude } = newSite;
  const site = {
    ...newSite,
    fkPortfolios: portfolio.id,
  };
  const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.NEXT_PUBLIC_OPENCAGEDATA_KEY}`);
  const respData = response.data.results[0].components;
  if (respData.country) {
    site.country = respData.country;
  }
  if (respData.street_name) {
    site.address = respData.street_name;
  }
  if (respData.road) {
    site.address = respData.road;
  }

  const insertedSite: SiteType = await db
    .insert(sites)
    .values(site)
    .returning()
    .then((s) => s[0]);

  // Link site with the ranges
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

export const selectPortfolioWhereID = async (selectID: number) => {
  try {
    const results = await db.select().from(portfolios).where(eq(portfolios.id, selectID));
    return results[0];
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const selectPortfoliosWithCompanies = async () => {
  try {
    const results = await db.select()
      .from(portfolios)
      .innerJoin(companies, eq(portfolios.fkCompanies, companies.id));
    return results;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const selectSiteDataByUuid = async (uuid: string): Promise<any> => {
  try {
    const data = await db.select()
      .from(sites)
      .where(eq(sites.uuid, uuid))
      .leftJoin(portfolios, eq(sites.fkPortfolios, portfolios.id))
      .leftJoin(siteRanges, eq(sites.id, siteRanges.fkSites))
      .leftJoin(ranges, eq(siteRanges.fkRanges, ranges.id))
      .leftJoin(speciesObserved, eq(sites.id, speciesObserved.fkSites))
      .leftJoin(species, eq(speciesObserved.fkSpecies, species.id))
      .then((s) => s);

    if (data.length > 0) {
      const d = {
        ...data[0].sites,
        portfolio: data[0].portfolios,
        ranges: data.map((x) => x.ranges),
        species: data.map((x) => x.species).filter((s): s is SpeciesType => s !== null),
      };
      return d;
    }

    return null;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const updateSiteReportLink = async (uuid: string) => {
  try {
    const updatedSite = await db
      .update(sites)
      .set({ reportLink: 'PROCESS' })
      .where(eq(sites.uuid, uuid))
      .returning()
      .then((s) => s[0]);

    if (!updatedSite) {
      throw new Error('Site not found');
    }

    return { success: true };
  } catch (error) {
    throw new Error(`Error updating site reportLink: ${error}`);
  }
};

export const deleteSite = async (uuid: string) => {
  try {
    // Find the site by its UUID
    const siteToDelete = await db
      .select()
      .from(sites)
      .where(eq(sites.uuid, uuid))
      .then((results) => results[0]);

    if (!siteToDelete) {
      throw new Error('Site not found');
    }

    // Delete associated siteRanges first
    await db
      .delete(siteRanges)
      .where(eq(siteRanges.fkSites, siteToDelete.id));

    // Delete the site itself
    await db
      .delete(sites)
      .where(eq(sites.uuid, uuid));

    return { success: true, message: 'Site deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting site: ${error}`);
  }
};
