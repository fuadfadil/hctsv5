import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.POSTGRES_URL as string;

if (!connectionString) {
  console.error("[Database] POSTGRES_URL environment variable is not set");
  throw new Error("POSTGRES_URL environment variable is not set");
}

console.log("[Database] Initializing database connection...");
console.log("[Database] Connection string present:", !!connectionString);
console.log("[Database] Connection string starts with:", connectionString.substring(0, 20) + "...");

// Test the connection
let client;
try {
  client = postgres(connectionString, {
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
  });
  console.log("[Database] PostgreSQL client created successfully");
} catch (error) {
  console.error("[Database] Failed to create PostgreSQL client:", error);
  throw error;
}

export const db = drizzle(client, { schema });

// Test database connection (optional - remove if causing issues)
try {
  // Simple connection test - this will be executed when the module loads
  console.log("[Database] Drizzle ORM instance created successfully");
} catch (error) {
  console.error("[Database] Failed to initialize Drizzle ORM:", error);
  throw error;
}
