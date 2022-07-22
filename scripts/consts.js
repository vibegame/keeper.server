const path = require("path");

const SRC_PATH = path.resolve(process.cwd(), "src");
const TYPEORM_CONFIG_PATH = path.resolve(
  process.cwd(),
  "typeorm-cli.config.ts",
);
const MIGRATIONS_PATH = path.resolve(SRC_PATH, "database", "migrations");

module.exports = {
  SRC_PATH,
  MIGRATIONS_PATH,
  TYPEORM_CONFIG_PATH,
};
