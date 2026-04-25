import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const agentRuns = sqliteTable("agent_runs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  goal: text("goal").notNull(),
  status: text("status").notNull().default("idle"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});
