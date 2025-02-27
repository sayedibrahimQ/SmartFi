import { DataAPIClient } from "@datastax/astra-db-ts";

if (!process.env.ASTRA_DB_TOKEN || !process.env.ASTRA_DB_API_ENDPOINT) {
  throw new Error("Missing Astra DB credentials");
}

const client = new DataAPIClient(process.env.ASTRA_DB_TOKEN);
const db = client.db(process.env.ASTRA_DB_API_ENDPOINT);

// Create collection if it doesn't exist
const createCollection = async () => {
  try {
    const collections = await db.listCollections();
    if (!collections.find((c) => c.name === "users")) {
      await db.createCollection("users");
    }
  } catch (error) {
    console.error("Error creating collection:", error);
  }
};

// Initialize collection
await createCollection();

export const usersCollection = db.collection("users");

export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
};

export default db;
