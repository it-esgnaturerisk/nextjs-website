import { users, sites, portfolios } from './db/schema';

export type UserType = typeof users.$inferSelect;
export type NewUserType = typeof users.$inferInsert;
export type SiteType = typeof sites.$inferSelect;
export type NewSiteType = typeof sites.$inferInsert;
export type PortfolioType = typeof portfolios.$inferSelect;

export type SiteMarkerType = {
  lng: number;
  lat: number;
};
