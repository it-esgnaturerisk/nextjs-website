import {
  pgEnum,
  pgTable,
  text,
  date,
  timestamp,
  doublePrecision,
  uuid,
  serial,
  integer,
} from 'drizzle-orm/pg-core';

export const userElevationEnum = pgEnum('user_elevation_enum', [
  'regular',
  'technician',
  'admin',
]);

export const industryEnum = pgEnum('industry_enum', [
  'fishing',
  'research',
  'other',
]);

export const companies = pgTable('companies', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom().notNull(),
  name: text('name').notNull(),
  registrationNumber: text('registration_number').notNull(),
  address: text('address'),
  city: text('city'),
  country: text('country'),
  phoneNumber: text('phone_number'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  contactEmail: text('contact_email'),
  industry: industryEnum('industry'),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom().notNull(),
  email: text('email').notNull(),
  elevation: userElevationEnum('elevation').default('regular').notNull(),
  name: text('name'),
  phone: text('phone'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  lastActive: timestamp('last_active'),
  fkCompanies: integer('fk_companies').references(() => companies.id),
});

export const portfolios = pgTable('portfolios', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom().notNull(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  fkCompanies: integer('fk_companies').references(() => companies.id),
});

export const operationTypeEnum = pgEnum('operation type enum', [
  'traditional',
]);

export const siteTypeEnum = pgEnum('site type enum', [
  'fish cage',
  'factory',
]);

export const sites = pgTable('sites', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom().notNull(),
  name: text('name').notNull(),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  address: text('address'),
  country: text('country'),
  reportLink: text('report_link'),
  approvedCapacity: doublePrecision('approved_capacity'),
  approvedCapacityUnit: text('approved_capacity_unit'),
  area: doublePrecision('area'),
  areaUnit: text('area_unit'),
  operationTypeEnum: operationTypeEnum('operation_type_enum'),
  siteTypeEnum: siteTypeEnum('site_type_enum'),
  localityNumber: text('locality_number'),
  lastUpdated: date('last_updated'),
  created: timestamp('created').defaultNow(),
  fkPortfolios: integer('fk_portfolios').references(() => portfolios.id),
  email: text('email'),
});

export const speciesGroups = pgTable('species_groups', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom().notNull(),
  name: text('name').notNull(),
  description: text('description'),
  lastUpdated: date('last_updated'),
  created: timestamp('created').defaultNow(),
});

export const speciesGroupsObserved = pgTable('species_groups_observed', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom().notNull(),
  numberOfObservations: integer('number_of_observations').notNull(),
  fkSpeciesGroup: integer('fk_species_group').references(() => speciesGroups.id),
  fkSites: integer('fk_sites').references(() => sites.id),
  lastUpdated: date('last_updated'),
  created: timestamp('created').defaultNow(),
});

export const redListStatus = pgEnum('red_list_status', [
  'CR',
  'EN',
  'VU',
  'NT',
  'LR',
  'DD',
  'NE',
]);

export const species = pgTable('species', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom().notNull(),
  commonName: text('common_name').notNull(),
  scientificName: text('scientific_name'),
  description: text('description'),
  fkSpeciesGroup: integer('fk_species_group').references(() => speciesGroups.id),
  redListStatus: redListStatus('red_list_status'),
  lastUpdated: date('last_updated'),
  created: timestamp('created').defaultNow(),
  pollutionRiskNutrientSalts: integer('pollution_risk_nutrient_salts'),
  pollutionRiskOrganicMaterals: integer('pollution_risk_organic_materials'),
  pollutionRiskChemicals: integer('pollution_risk_chemicals'),
  pollutionRiskDisturbances: integer('pollution_risk_disturbances'),
});

export const speciesObserved = pgTable('species_observed', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom().notNull(),
  numberOfObservations: integer('number_of_observations'),
  fkSpecies: integer('fk_species').references(() => species.id),
  fkSites: integer('fk_sites').references(() => sites.id),
  lastUpdated: date('last_updated'),
  created: timestamp('created').defaultNow(),
});

export const institutions = pgTable('institutions', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom().notNull(),
  name: text('name').notNull(),
  description: text('description'),
  lastUpdated: date('last_updated'),
  created: timestamp('created').defaultNow(),
});

export const institutionsObservations = pgTable('institutions_observations', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom().notNull(),
  totalObservations: integer('total_observations').notNull(),
  uniqueSpeciesObservations: integer('unique_species_observations').notNull(),
  fkInstitutions: integer('fk_institutions').references(() => institutions.id),
  fkSites: integer('fk_sites').references(() => sites.id),
  lastUpdated: date('last_updated'),
  created: timestamp('created').defaultNow(),
});

export const yearsOfObservations = pgTable('years_of_observations', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom().notNull(),
  year: integer('year').notNull(),
  numberOfObservations: integer('number_of_observations').notNull(),
  fkSites: integer('fk_sites').references(() => sites.id),
  lastUpdated: date('last_updated'),
  created: timestamp('created').defaultNow(),
});

export const ranges = pgTable('ranges', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom().notNull(),
  value: integer('value').notNull(),
  label: text('label').notNull(),
});

export const siteRanges = pgTable('site_ranges', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom().notNull(),
  fkSites: integer('fk_sites').references(() => sites.id),
  fkRanges: integer('fk_ranges').references(() => ranges.id),
});
