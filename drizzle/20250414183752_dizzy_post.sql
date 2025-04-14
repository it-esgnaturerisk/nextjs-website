DO $$ BEGIN
 CREATE TYPE "public"."geographical_risk" AS ENUM('High', 'Medium', 'Low', 'Unknown');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."species_risk" AS ENUM('High', 'Medium', 'Low', 'Unknown');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "companies" ALTER COLUMN "uuid" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "institutions" ALTER COLUMN "uuid" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "institutions_observations" ALTER COLUMN "uuid" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "portfolios" ALTER COLUMN "uuid" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ranges" ALTER COLUMN "uuid" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "site_ranges" ALTER COLUMN "uuid" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sites" ALTER COLUMN "uuid" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sites" ALTER COLUMN "species_risk" SET DATA TYPE species_risk;--> statement-breakpoint
ALTER TABLE "sites" ALTER COLUMN "geographical_risk" SET DATA TYPE geographical_risk;--> statement-breakpoint
ALTER TABLE "species" ALTER COLUMN "uuid" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "species_groups" ALTER COLUMN "uuid" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "species_groups_observed" ALTER COLUMN "uuid" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "species_observed" ALTER COLUMN "uuid" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "uuid" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "years_of_observations" ALTER COLUMN "uuid" SET NOT NULL;