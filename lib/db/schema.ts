import {
  pgEnum,
  pgTable,
  text,
  date,
  timestamp,
  doublePrecision,
  uuid,
} from "drizzle-orm/pg-core";

export const userElevationEnum = pgEnum("user_elevation_enum", [
  "regular",
  "technician",
  "admin",
]);

export const sites = pgTable("sites", {
  uuid: uuid("uuid").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  address: text(),
  country: text(),
  reportLink: text("report_link"),
  speciesRisk: text("species_risk"),
  geographicalRisk: text("geographical_risk"),
  lastUpdated: date("last_updated"),
  created: timestamp("created").defaultNow(),
  ranges: text("ranges"),
  fkPortfolios: uuid("fk_portfolios").references(() => portfolios.uuid),
  fkUsers: uuid("fk_users").references(() => users.uuid),
});

export const users = pgTable("users", {
  uuid: uuid("uuid").defaultRandom().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  elevation: userElevationEnum("elevation").default("regular").notNull(),
  lastActive: timestamp("last_active"),
  fkCompanies: uuid("fk_companies").references(() => companies.uuid),
});

export const portfolios = pgTable("portfolios", {
  uuid: uuid("uuid").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  fk_users: uuid("fk_users").references(() => users.uuid),
});

export const companies = pgTable("companies", {
  uuid: uuid("uuid").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  registrationNumber: text("registration_number").notNull(),
  address: text("address"),
  city: text("city"),
  country: text("country"),
  phoneNumber: text("phone_number"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  contactEmail: text("contact_email"),
});
