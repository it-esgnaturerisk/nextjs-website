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

export const companies = pgTable('companies', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom(),
  name: text('name').notNull(),
  registrationNumber: text('registration_number').notNull(),
  address: text('address'),
  city: text('city'),
  country: text('country'),
  phoneNumber: text('phone_number'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  contactEmail: text('contact_email'),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom(),
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
  uuid: uuid('uuid').defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  fkCompanies: integer('fk_companies').references(() => companies.id),
});

export const sites = pgTable('sites', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom(),
  name: text('name').notNull(),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  address: text('address'),
  country: text('country'),
  reportLink: text('report_link'),
  speciesRisk: text('species_risk'),
  geographicalRisk: text('geographical_risk'),
  lastUpdated: date('last_updated'),
  created: timestamp('created').defaultNow(),
  fkPortfolios: integer('fk_portfolios').references(() => portfolios.id),
  email: text('email'),
});

export const ranges = pgTable('ranges', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom(),
  value: integer('value').notNull(),
  label: text('label').notNull(),
});

export const siteRanges = pgTable('site_ranges', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom(),
  fkSites: integer('fk_sites').references(() => sites.id),
  fkRanges: integer('fk_ranges').references(() => ranges.id),
});
