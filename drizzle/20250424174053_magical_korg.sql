CREATE TABLE IF NOT EXISTS "protected_areas" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"fk_sites" integer,
	"fk_ranges" integer,
	"number_of_protected_areas" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "valued_nature_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"fk_sites" integer,
	"fk_ranges" integer,
	"very_big" integer,
	"big" integer,
	"medium" integer,
	"small" integer,
	"last_updated" date,
	"created" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "protected_areas" ADD CONSTRAINT "protected_areas_fk_sites_sites_id_fk" FOREIGN KEY ("fk_sites") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "protected_areas" ADD CONSTRAINT "protected_areas_fk_ranges_ranges_id_fk" FOREIGN KEY ("fk_ranges") REFERENCES "public"."ranges"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "valued_nature_types" ADD CONSTRAINT "valued_nature_types_fk_sites_sites_id_fk" FOREIGN KEY ("fk_sites") REFERENCES "public"."sites"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "valued_nature_types" ADD CONSTRAINT "valued_nature_types_fk_ranges_ranges_id_fk" FOREIGN KEY ("fk_ranges") REFERENCES "public"."ranges"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
