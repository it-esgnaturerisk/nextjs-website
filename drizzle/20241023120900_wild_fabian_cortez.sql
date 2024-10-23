CREATE TABLE IF NOT EXISTS "ranges" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid(),
	"value" integer NOT NULL,
	"label" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "site_ranges" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid(),
	"fk_sites" integer,
	"fk_ranges" integer
);
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
