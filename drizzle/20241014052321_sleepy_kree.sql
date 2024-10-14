CREATE TABLE IF NOT EXISTS "portfolios" (
	"uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"fk_users" uuid
);
--> statement-breakpoint
ALTER TABLE "sites" DROP CONSTRAINT "sites_portfolio_id_portfolio_id_fk";
--> statement-breakpoint
ALTER TABLE "sites" DROP CONSTRAINT "sites_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_company_id_companies_id_fk";
--> statement-breakpoint
ALTER TABLE "portfolio" DROP CONSTRAINT "portfolio_user_id_users_id_fk";

ALTER TABLE "sites" DROP COLUMN IF EXISTS "portfolio_id";--> statement-breakpoint
ALTER TABLE "sites" DROP COLUMN IF EXISTS "user_id";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "company_id";
--> statement-breakpoint
ALTER TABLE "sites" ALTER COLUMN "ranges" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "elevation" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sites" ADD COLUMN "fk_portfolios" uuid;--> statement-breakpoint
ALTER TABLE "sites" ADD COLUMN "fk_users" uuid;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "fk_companies" uuid;--> statement-breakpoint
ALTER TABLE "sites" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "sites" ADD COLUMN "uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "companies" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "uuid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_fk_users_users_uuid_fk" FOREIGN KEY ("fk_users") REFERENCES "public"."users"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sites" ADD CONSTRAINT "sites_fk_portfolios_portfolios_uuid_fk" FOREIGN KEY ("fk_portfolios") REFERENCES "public"."portfolios"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sites" ADD CONSTRAINT "sites_fk_users_users_uuid_fk" FOREIGN KEY ("fk_users") REFERENCES "public"."users"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_fk_companies_companies_uuid_fk" FOREIGN KEY ("fk_companies") REFERENCES "public"."companies"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DROP TABLE "portfolio";--> statement-breakpoint