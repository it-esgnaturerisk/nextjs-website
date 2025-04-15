DO $$ BEGIN
 CREATE TYPE "public"."red_list_status" AS ENUM('CR', 'EN', 'VU', 'NT', 'LR', 'DD', 'NE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."user_elevation_enum" AS ENUM('regular', 'technician', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"registration_number" text NOT NULL,
	"address" text,
	"city" text,
	"country" text,
	"phone_number" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"contact_email" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "institutions" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"last_updated" date,
	"created" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "institutions_observations" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"total_observations" integer NOT NULL,
	"unique_species_observations" integer NOT NULL,
	"fk_institutions" integer,
	"fk_sites" integer,
	"last_updated" date,
	"created" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolios" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"fk_companies" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ranges" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"value" integer NOT NULL,
	"label" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "site_ranges" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"fk_sites" integer,
	"fk_ranges" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sites" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"address" text,
	"country" text,
	"report_link" text,
	"cleared_capacity" double precision,
	"cleared_capacity_unit" text,
	"area" double precision,
	"area_unit" text,
	"type_of_operation" text,
	"type_of_site" text,
	"locality_number" text,
	"last_updated" date,
	"created" timestamp DEFAULT now(),
	"fk_portfolios" integer,
	"email" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "species" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"common_name" text NOT NULL,
	"scientific_name" text,
	"description" text,
	"fk_species_group" integer,
	"red_list_status" "red_list_status",
	"last_updated" date,
	"created" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "species_groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"last_updated" date,
	"created" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "species_groups_observed" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"number_of_observations" integer NOT NULL,
	"fk_species_group" integer,
	"fk_sites" integer,
	"last_updated" date,
	"created" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "species_observed" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"number_of_observations" integer,
	"fk_species" integer,
	"fk_sites" integer,
	"last_updated" date,
	"created" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"elevation" "user_elevation_enum" DEFAULT 'regular' NOT NULL,
	"name" text,
	"phone" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"last_active" timestamp,
	"fk_companies" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "years_of_observations" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"year" integer NOT NULL,
	"number_of_observations" integer NOT NULL,
	"fk_sites" integer,
	"last_updated" date,
	"created" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "institutions_observations" ADD CONSTRAINT "institutions_observations_fk_institutions_institutions_id_fk" FOREIGN KEY ("fk_institutions") REFERENCES "public"."institutions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "institutions_observations" ADD CONSTRAINT "institutions_observations_fk_sites_sites_id_fk" FOREIGN KEY ("fk_sites") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_fk_companies_companies_id_fk" FOREIGN KEY ("fk_companies") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "site_ranges" ADD CONSTRAINT "site_ranges_fk_sites_sites_id_fk" FOREIGN KEY ("fk_sites") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "site_ranges" ADD CONSTRAINT "site_ranges_fk_ranges_ranges_id_fk" FOREIGN KEY ("fk_ranges") REFERENCES "public"."ranges"("id") ON DELETE no action ON UPDATE no action;
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
 ALTER TABLE "species" ADD CONSTRAINT "species_fk_species_group_species_groups_id_fk" FOREIGN KEY ("fk_species_group") REFERENCES "public"."species_groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "species_groups_observed" ADD CONSTRAINT "species_groups_observed_fk_species_group_species_groups_id_fk" FOREIGN KEY ("fk_species_group") REFERENCES "public"."species_groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "species_groups_observed" ADD CONSTRAINT "species_groups_observed_fk_sites_sites_id_fk" FOREIGN KEY ("fk_sites") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "species_observed" ADD CONSTRAINT "species_observed_fk_species_species_id_fk" FOREIGN KEY ("fk_species") REFERENCES "public"."species"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "species_observed" ADD CONSTRAINT "species_observed_fk_sites_sites_id_fk" FOREIGN KEY ("fk_sites") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_fk_companies_companies_id_fk" FOREIGN KEY ("fk_companies") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "years_of_observations" ADD CONSTRAINT "years_of_observations_fk_sites_sites_id_fk" FOREIGN KEY ("fk_sites") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
