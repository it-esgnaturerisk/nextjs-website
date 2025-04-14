ALTER TABLE "yearsOfObservations" RENAME TO "years_of_observations";--> statement-breakpoint
ALTER TABLE "years_of_observations" DROP CONSTRAINT "yearsOfObservations_fk_sites_sites_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "years_of_observations" ADD CONSTRAINT "years_of_observations_fk_sites_sites_id_fk" FOREIGN KEY ("fk_sites") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
