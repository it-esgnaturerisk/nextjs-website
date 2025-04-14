import { relations } from "drizzle-orm/relations";
import { companies, users, portfolios, sites, siteRanges, ranges } from "./schema";

export const usersRelations = relations(users, ({one}) => ({
	company: one(companies, {
		fields: [users.fkCompanies],
		references: [companies.id]
	}),
}));

export const companiesRelations = relations(companies, ({many}) => ({
	users: many(users),
	portfolios: many(portfolios),
}));

export const sitesRelations = relations(sites, ({one, many}) => ({
	portfolio: one(portfolios, {
		fields: [sites.fkPortfolios],
		references: [portfolios.id]
	}),
	siteRanges: many(siteRanges),
}));

export const portfoliosRelations = relations(portfolios, ({one, many}) => ({
	sites: many(sites),
	company: one(companies, {
		fields: [portfolios.fkCompanies],
		references: [companies.id]
	}),
}));

export const siteRangesRelations = relations(siteRanges, ({one}) => ({
	site: one(sites, {
		fields: [siteRanges.fkSites],
		references: [sites.id]
	}),
	range: one(ranges, {
		fields: [siteRanges.fkRanges],
		references: [ranges.id]
	}),
}));

export const rangesRelations = relations(ranges, ({many}) => ({
	siteRanges: many(siteRanges),
}));