import * as dotenv from "dotenv";
import * as path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
dotenv.config();

export const typeormConfig: DataSourceOptions = {
  type: "postgres",
  port: +process.env.TYPEORM_PORT,
  host: process.env.TYPEORM_HOST,
  database: process.env.TYPEORM_DATABASE,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  migrationsTableName: "migrations",
  migrations: [
    path.resolve(__dirname, "src/database/migrations/**/*{.ts,.js}"),
  ],
  entities: [
    path.resolve(__dirname, "src/database/entities/**/*.entity{.ts,.js}"),
  ],
};

export const dataSource = new DataSource(typeormConfig);

export default typeormConfig;
