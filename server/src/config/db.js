const { drizzle } = require("drizzle-orm/neon-http");
const { neon } = require("@neondatabase/serverless");
const ENV = require("./env.js");
const schema = require("../db/schema.js");

const sql = neon(ENV.DATABASE_URL);
const db = drizzle(sql, { schema });

module.exports = { db };
