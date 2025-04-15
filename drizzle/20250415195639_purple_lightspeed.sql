DO $$ BEGIN
 CREATE TYPE "public"."industry_enum" AS ENUM('fishing', 'research', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."operation_type_enum" AS ENUM('traditional');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."site_type_enum" AS ENUM('fish cage', 'factory');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "sites" RENAME COLUMN "type_of_operation" TO "operation_type";--> statement-breakpoint
ALTER TABLE "sites" RENAME COLUMN "type_of_site" TO "site_type";--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "industry" "industry_enum";