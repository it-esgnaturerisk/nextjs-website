DO $$ BEGIN
 CREATE TYPE "public"."red_list_status" AS ENUM('CR', 'EN', 'VU', 'NT', 'LR', 'DD', 'NE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "institutions" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"description" text,
	"last_updated" date,
	"created" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "institutions_observations" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid(),
	"total_observations" integer NOT NULL,
	"unique_species_observations" integer NOT NULL,
	"fk_institutions" integer,
	"fk_sites" integer,
	"last_updated" date,
	"created" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "species" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid(),
	"species_name" text NOT NULL,
	"greek_species_name" text,
	"description" text,
	"fk_species_group" integer,
	"red_list_status" "red_list_status",
	"last_updated" date,
	"created" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "speciesGroups" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid(),
	"number_of_observations" integer NOT NULL,
	"fk_species_group" integer,
	"fk_sites" integer,
	"last_updated" date,
	"created" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "speciesObserved" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid(),
	"number_of_observations" integer NOT NULL,
	"species" integer,
	"fk_sites" integer,
	"last_updated" date,
	"created" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "yearsOfObservations" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid(),
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
 ALTER TABLE "species" ADD CONSTRAINT "species_fk_species_group_speciesGroups_id_fk" FOREIGN KEY ("fk_species_group") REFERENCES "public"."speciesGroups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "speciesGroups" ADD CONSTRAINT "speciesGroups_fk_species_group_speciesGroups_id_fk" FOREIGN KEY ("fk_species_group") REFERENCES "public"."speciesGroups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "speciesGroups" ADD CONSTRAINT "speciesGroups_fk_sites_sites_id_fk" FOREIGN KEY ("fk_sites") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "speciesObserved" ADD CONSTRAINT "speciesObserved_species_species_id_fk" FOREIGN KEY ("species") REFERENCES "public"."species"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "speciesObserved" ADD CONSTRAINT "speciesObserved_fk_sites_sites_id_fk" FOREIGN KEY ("fk_sites") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "yearsOfObservations" ADD CONSTRAINT "yearsOfObservations_fk_sites_sites_id_fk" FOREIGN KEY ("fk_sites") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
