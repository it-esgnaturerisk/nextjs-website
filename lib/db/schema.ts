import {
  pgEnum,
  pgTable,
  serial,
  text,
  integer,
  date,
  timestamp,
  doublePrecision,
} from "drizzle-orm/pg-core";

export const userElevationEnum = pgEnum("user_elevation_enum", [
  "regular",
  "technician",
  "admin",
]);

export const sites = pgTable("sites", {
  id: serial("id").primaryKey(),
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
  ranges: integer("ranges"),
  portfolioId: integer("portfolio_id").references(() => portfolio.id),
  userId: integer("user_id").references(() => users.id),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  elevation: userElevationEnum("elevation").default("regular"),
  lastActive: timestamp("last_active"),
  company: integer("company_id").references(() => companies.id),
});

export const portfolio = pgTable("portfolio", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  userId: integer("user_id").references(() => users.id),
});

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
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
