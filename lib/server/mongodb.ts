import { Db, MongoClient } from "mongodb";

const dbName = process.env.MONGODB_DB || "revera_studio";

declare global {
  // eslint-disable-next-line no-var
  var _reveraMongo: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | undefined;

// Connect lazily on first use (never at import/build time). The client is
// cached across hot-reloads in dev and across invocations in prod.
function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set. Add it to .env.local");

  if (process.env.NODE_ENV === "development") {
    if (!global._reveraMongo) {
      global._reveraMongo = new MongoClient(uri).connect();
    }
    return global._reveraMongo;
  }
  if (!clientPromise) {
    clientPromise = new MongoClient(uri).connect();
  }
  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClient();
  return client.db(dbName);
}
