import {
  users,
  sites,
  portfolios,
  ranges,
  companies,
  species,
  speciesObserved,
  siteRanges,
  institutions,
  institutionsObservations,
  yearsOfObservations,
  speciesGroups,
} from './db/schema';

export type UserType = typeof users.$inferSelect;
export type NewUserType = typeof users.$inferInsert;
export type SiteType = typeof sites.$inferSelect;
export type NewSiteType = typeof sites.$inferInsert;
export type NewPortfolioType = typeof portfolios.$inferInsert;
export type PortfolioType = typeof portfolios.$inferSelect;
export type RangesType = typeof ranges.$inferSelect;
export type CompaniesType = typeof companies.$inferSelect;
export type SpeciesType = typeof species.$inferSelect;
export type SpeciesObservedType = typeof speciesObserved.$inferSelect;
export type SpeciesObservedInsertType = typeof speciesObserved.$inferInsert;
export type SpeciesGroupType = typeof speciesGroups.$inferSelect;
export type InstitutionsType = typeof institutions.$inferSelect;
export type InstitutionsObservationsType = typeof institutionsObservations.$inferSelect;
export type YearsOfObservationsType = typeof yearsOfObservations.$inferSelect;
export type SiteRangeType = typeof siteRanges.$inferSelect;
export type SiteRangeInsertType = typeof siteRanges.$inferInsert;

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
