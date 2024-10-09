DO $$ BEGIN
 CREATE TYPE "public"."user_elevation_enum" AS ENUM('regular', 'technician', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "companies" (
	"id" serial PRIMARY KEY NOT NULL,
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
CREATE TABLE IF NOT EXISTS "portfolio" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sites" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"latitude" numeric NOT NULL,
	"longitude" numeric NOT NULL,
	"species_risk" text,
	"geographical_risk" text,
	"last_updated" date,
	"created" timestamp DEFAULT now(),
	"ranges" integer,
	"portfolio_id" integer,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"phone" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"elevation" "user_elevation_enum" DEFAULT 'regular',
	"last_active" timestamp,
	"company_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolio" ADD CONSTRAINT "portfolio_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sites" ADD CONSTRAINT "sites_portfolio_id_portfolio_id_fk" FOREIGN KEY ("portfolio_id") REFERENCES "public"."portfolio"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sites" ADD CONSTRAINT "sites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
