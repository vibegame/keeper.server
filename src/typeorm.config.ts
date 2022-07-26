import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import "dotenv/config";

console.log(__dirname + "/**/*.entity{.ts,.js}");

export const typeormModuleOptions: TypeOrmModuleOptions = {
  type: "postgres",
  port: parseInt(process.env.TYPEORM_PORT),
  host: process.env.TYPEORM_HOST,
  database: process.env.TYPEORM_DATABASE,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  synchronize: false,
};
