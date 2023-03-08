const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";

const config =
  ENV === "production"
    ? {
        connectionString:
          "postgres://lvfknkgr:OW8FyV2y5yHL8cK47bgW8DX-CZd_hwaO@trumpet.db.elephantsql.com/lvfknkgr",
        max: 2,
      }
    : {};

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

module.exports = new Pool(config);
