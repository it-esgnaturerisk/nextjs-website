import { pgTable, serial, text, bigint, timestamp, uuid, foreignKey, integer, doublePrecision, date, pgEnum } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const customerStatusEnum = pgEnum("customer_status_enum", ['active', 'inactive'])
export const userElevationEnum = pgEnum("user_elevation_enum", ['regular', 'technician', 'admin'])



export const drizzleMigrations = pgTable("__drizzle_migrations__", {
	id: serial().primaryKey().notNull(),
	hash: text().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	createdAt: bigint("created_at", { mode: "number" }),
});

export const companies = pgTable("companies", {
	name: text().notNull(),
	registrationNumber: text("registration_number").notNull(),
	address: text(),
	city: text(),
	country: text(),
	phoneNumber: text("phone_number"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	contactEmail: text("contact_email"),
	uuid: uuid().defaultRandom(),
	id: serial().primaryKey().notNull(),
});

export const users = pgTable("users", {
	name: text(),
	email: text().notNull(),
	phone: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	elevation: userElevationEnum().default('regular').notNull(),
	lastActive: timestamp("last_active", { mode: 'string' }),
	uuid: uuid().defaultRandom(),
	fkCompanies: integer("fk_companies"),
	id: serial().primaryKey().notNull(),
},
(table) => {
	return {
		usersFkCompaniesCompaniesIdFk: foreignKey({
			columns: [table.fkCompanies],
			foreignColumns: [companies.id],
			name: "users_fk_companies_companies_id_fk"
		}),
	}
});

export const sites = pgTable("sites", {
	name: text().notNull(),
	latitude: doublePrecision().notNull(),
	longitude: doublePrecision().notNull(),
	speciesRisk: text("species_risk"),
	geographicalRisk: text("geographical_risk"),
	lastUpdated: date("last_updated"),
	created: timestamp({ mode: 'string' }).defaultNow(),
	address: text(),
	country: text(),
	reportLink: text("report_link"),
	uuid: uuid().defaultRandom(),
	fkPortfolios: integer("fk_portfolios"),
	id: serial().primaryKey().notNull(),
	email: text(),
},
(table) => {
	return {
		sitesFkPortfoliosPortfoliosIdFk: foreignKey({
			columns: [table.fkPortfolios],
			foreignColumns: [portfolios.id],
			name: "sites_fk_portfolios_portfolios_id_fk"
		}),
	}
});

export const siteRanges = pgTable("site_ranges", {
	id: serial().primaryKey().notNull(),
	uuid: uuid().defaultRandom(),
	fkSites: integer("fk_sites"),
	fkRanges: integer("fk_ranges"),
},
(table) => {
	return {
		siteRangesFkSitesSitesIdFk: foreignKey({
			columns: [table.fkSites],
			foreignColumns: [sites.id],
			name: "site_ranges_fk_sites_sites_id_fk"
		}),
		siteRangesFkRangesRangesIdFk: foreignKey({
			columns: [table.fkRanges],
			foreignColumns: [ranges.id],
			name: "site_ranges_fk_ranges_ranges_id_fk"
		}),
	}
});

export const ranges = pgTable("ranges", {
	id: serial().primaryKey().notNull(),
	uuid: uuid().defaultRandom(),
	value: integer().notNull(),
	label: text().notNull(),
});

export const portfolios = pgTable("portfolios", {
	uuid: uuid().defaultRandom(),
	name: text().notNull(),
	description: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	fkCompanies: integer("fk_companies"),
	id: serial().primaryKey().notNull(),
},
(table) => {
	return {
		portfoliosFkCompaniesCompaniesIdFk: foreignKey({
			columns: [table.fkCompanies],
			foreignColumns: [companies.id],
			name: "portfolios_fk_companies_companies_id_fk"
		}),
	}
});