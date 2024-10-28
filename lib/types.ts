import {
  users,
  sites,
  portfolios,
  ranges,
  companies,
} from './db/schema';

export type UserType = typeof users.$inferSelect;
export type NewUserType = typeof users.$inferInsert;
export type SiteType = typeof sites.$inferSelect;
export type NewSiteType = typeof sites.$inferInsert;
export type PortfolioType = typeof portfolios.$inferSelect;
export type RangesType = typeof ranges.$inferSelect;
export type CompaniesType = typeof companies.$inferSelect;

export type SiteMarkerType = {
  lng: number;
  lat: number;
};

export type ValidationType = {
  valid: boolean;
  message: string;
};

export type PortfolioWithCompaniesType = {
  portfolios: PortfolioType;
  companies: CompaniesType;
};
