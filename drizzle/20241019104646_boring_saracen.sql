ALTER TABLE "portfolios" DROP CONSTRAINT "portfolios_fk_companies_companies_uuid_fk";
--> statement-breakpoint
ALTER TABLE "sites" DROP CONSTRAINT "sites_fk_portfolios_portfolios_uuid_fk";
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_fk_companies_companies_uuid_fk";
--> statement-breakpoint

ALTER TABLE "companies" DROP CONSTRAINT "companies_pkey";--> statement-breakpoint
ALTER TABLE "companies" ALTER COLUMN "uuid" DROP NOT NULL;--> statement-breakpoint

ALTER TABLE "portfolios" DROP CONSTRAINT "portfolios_pkey";--> statement-breakpoint
ALTER TABLE "portfolios" ALTER COLUMN "uuid" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "portfolios" DROP COLUMN "fk_companies";--> statement-breakpoint
ALTER TABLE "portfolios" ADD COLUMN "fk_companies" integer;--> statement-breakpoint

ALTER TABLE "sites" DROP CONSTRAINT "sites_pkey";--> statement-breakpoint
ALTER TABLE "sites" ALTER COLUMN "uuid" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "sites" DROP COLUMN "fk_portfolios";--> statement-breakpoint
ALTER TABLE "sites" ADD COLUMN "fk_portfolios" integer;--> statement-breakpoint

ALTER TABLE "users" DROP CONSTRAINT "users_pkey";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "uuid" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "fk_companies";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "fk_companies" integer;--> statement-breakpoint

ALTER TABLE "companies" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "portfolios" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "sites" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_fk_companies_companies_id_fk" FOREIGN KEY ("fk_companies") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sites" ADD CONSTRAINT "sites_fk_portfolios_portfolios_id_fk" FOREIGN KEY ("fk_portfolios") REFERENCES "public"."portfolios"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_fk_companies_companies_id_fk" FOREIGN KEY ("fk_companies") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
