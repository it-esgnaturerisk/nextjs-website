import { users, sites } from "./db/schema";

export type UserType = typeof users.$inferSelect;
export type NewUserType = typeof users.$inferInsert;
export type SiteType = typeof sites.$inferSelect;
export type NewSiteType = typeof sites.$inferInsert;

export type SiteMarkerType = {
  longitude: number;
  latitude: number;
};
