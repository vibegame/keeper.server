const path = require("path");

const SRC_PATH = path.resolve(process.cwd(), "src");
const MIGRATIONS_PATH = path.resolve(SRC_PATH, "database", "migrations");
const TYPEORM_CONFIG_PATH = path.resolve(SRC_PATH, "typeorm.config.ts");

module.exports = {
  SRC_PATH,
  MIGRATIONS_PATH,
  TYPEORM_CONFIG_PATH,
};
