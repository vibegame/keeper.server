import * as dotenv from "dotenv";
import * as path from "path";
import { DataSource, DataSourceOptions } from "typeorm";

const envPath = path.resolve(__dirname, "../.env");
dotenv.config({ path: envPath });

export const typeormOptions: DataSourceOptions = {
  type: "postgres",
  port: +process.env.TYPEORM_PORT,
  host: process.env.TYPEORM_HOST,
  database: process.env.TYPEORM_DATABASE,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  migrationsTableName: "migrations",
  entities: [path.resolve(__dirname, "database/**/*.entity{.ts,.js}")],
  migrations: [path.resolve(__dirname, "database/migrations/**/*{.ts,.js}")],
  synchronize: false,
};

console.log(typeormOptions, __dirname);

export const dataSource = new DataSource(typeormOptions);

export default typeormOptions;
