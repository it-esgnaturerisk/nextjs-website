ALTER TABLE "sites" ALTER COLUMN "latitude" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "sites" ALTER COLUMN "longitude" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "sites" ADD COLUMN "address" text;--> statement-breakpoint
ALTER TABLE "sites" ADD COLUMN "country" text;--> statement-breakpoint
ALTER TABLE "sites" ADD COLUMN "report_link" text;