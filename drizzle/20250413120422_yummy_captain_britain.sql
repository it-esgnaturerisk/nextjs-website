CREATE TABLE IF NOT EXISTS "species_groups_observed" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid(),
	"number_of_observations" integer NOT NULL,
	"fk_species_group" integer,
	"fk_sites" integer,
	"last_updated" date,
	"created" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "speciesGroups" RENAME TO "species_groups";--> statement-breakpoint
ALTER TABLE "speciesObserved" RENAME TO "species_observed";--> statement-breakpoint
ALTER TABLE "species" DROP CONSTRAINT "species_fk_species_group_speciesGroups_id_fk";
--> statement-breakpoint
ALTER TABLE "species_groups" DROP CONSTRAINT "speciesGroups_fk_species_group_speciesGroups_id_fk";
--> statement-breakpoint
ALTER TABLE "species_groups" DROP CONSTRAINT "speciesGroups_fk_sites_sites_id_fk";
--> statement-breakpoint
ALTER TABLE "species_observed" DROP CONSTRAINT "speciesObserved_species_species_id_fk";
--> statement-breakpoint
ALTER TABLE "species_observed" DROP CONSTRAINT "speciesObserved_fk_sites_sites_id_fk";
--> statement-breakpoint
ALTER TABLE "species_groups" ADD COLUMN "species_group_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "species_groups" ADD COLUMN "description" text;--> statement-breakpoint
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
 ALTER TABLE "species" ADD CONSTRAINT "species_fk_species_group_species_groups_id_fk" FOREIGN KEY ("fk_species_group") REFERENCES "public"."species_groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "species_observed" ADD CONSTRAINT "species_observed_species_species_id_fk" FOREIGN KEY ("species") REFERENCES "public"."species"("id") ON DELETE no action ON UPDATE no action;
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
ALTER TABLE "species_groups" DROP COLUMN IF EXISTS "number_of_observations";--> statement-breakpoint
ALTER TABLE "species_groups" DROP COLUMN IF EXISTS "fk_species_group";--> statement-breakpoint
ALTER TABLE "species_groups" DROP COLUMN IF EXISTS "fk_sites";