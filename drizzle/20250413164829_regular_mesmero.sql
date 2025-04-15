ALTER TABLE "species" RENAME COLUMN "species_name" TO "common_name";--> statement-breakpoint
ALTER TABLE "species" RENAME COLUMN "greek_species_name" TO "scientific_name";--> statement-breakpoint
ALTER TABLE "species_groups" RENAME COLUMN "species_group_name" TO "name";