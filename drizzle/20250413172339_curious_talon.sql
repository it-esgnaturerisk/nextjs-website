ALTER TABLE "species_observed" RENAME COLUMN "species" TO "fk_species";--> statement-breakpoint
ALTER TABLE "species_observed" DROP CONSTRAINT "species_observed_species_species_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "species_observed" ADD CONSTRAINT "species_observed_fk_species_species_id_fk" FOREIGN KEY ("fk_species") REFERENCES "public"."species"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
