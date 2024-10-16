ALTER TABLE "portfolios" DROP CONSTRAINT "portfolios_fk_users_users_uuid_fk";
--> statement-breakpoint
ALTER TABLE "sites" DROP CONSTRAINT "sites_fk_users_users_uuid_fk";
--> statement-breakpoint
ALTER TABLE "portfolios" ADD COLUMN "fk_companies" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_fk_companies_companies_uuid_fk" FOREIGN KEY ("fk_companies") REFERENCES "public"."companies"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "portfolios" DROP COLUMN IF EXISTS "fk_users";--> statement-breakpoint
ALTER TABLE "sites" DROP COLUMN IF EXISTS "fk_users";