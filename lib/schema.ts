 import {
    pgTable,
    serial,
    text,
    timestamp,
    uniqueIndex,
 } from "drizzle-orm/pg-core";

 export const users = pgTable(
    "users", {
        id: serial("id").primaryKey(),
        name: text("name").notNull(),
        email: text("email").notNull(),
        createdAt: timestamp("createdAt").defaultNow(),
    },
    (users) => {
        return {
            uniqueIndex: uniqueIndex("unique_idx").on(users.id)
        };
    }
 );