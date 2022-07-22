const path = require("path");
const prompt = require("prompt");
const { TYPEORM_CONFIG_PATH, MIGRATIONS_PATH } = require("../consts");
const { execAsync } = require("../shell");

class TypeormCli {
  async cli(command) {
    try {
      const configPath = path.relative(process.cwd(), TYPEORM_CONFIG_PATH);
      await execAsync(`npx typeorm-ts-node-esm -d "${configPath}" ${command}`);
    } catch (e) {
      console.log(e);
    }
  }

  async migrate() {
    await this.cli("migration:run");
  }

  async drop() {
    await this.cli("schema:drop");
  }

  async prettierMigrations() {
    try {
      const migrationsPath = path.relative(process.cwd(), MIGRATIONS_PATH);
      await execAsync(`npx prettier --write ${migrationsPath}`);
    } catch (e) {
      console.log(e);
    }
  }

  async generate() {
    try {
      prompt.start();
      const result = await prompt.get([
        {
          name: "migrationName",
          description: "Enter name of new migration",
        },
      ]);
      const migrationPath = path.resolve(MIGRATIONS_PATH, result.migrationName);

      await this.cli(`migration:generate ${migrationPath}`);
      await this.prettierMigrations();
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = TypeormCli;
