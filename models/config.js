const WRITE_DB =
  "production" == process.env.NODE_ENV
    ? process.env.PROD_WRITE_DB_HOST
    : "development" == process.env.NODE_ENV
    ? process.env.DEV_WRITE_DB_HOST
    : "127.0.0.1";

const READ_DB =
  "production" == process.env.NODE_ENV
    ? process.env.PROD_READ_DB_HOST
    : "development" == process.env.NODE_ENV
    ? process.env.DEV_READ_DB_HOST
    : "127.0.0.1";

module.exports = {
  read_write: {
    host: WRITE_DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    db: process.env.DATABASE,
    charset: "utf8",
    port: process.env.DB_PORT || 3306
  },
  read_only: {
    host: READ_DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    db: process.env.DATABASE,
    charset: "utf8",
    port: process.env.DB_PORT || 3306
  }
};
