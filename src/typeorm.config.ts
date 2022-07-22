import * as path from "path";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const getTypeormModuleOptions = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: "postgres",
  port: +configService.get<number>("TYPEORM_PORT"),
  host: configService.get("TYPEORM_HOST"),
  database: configService.get("TYPEORM_DATABASE"),
  username: configService.get("TYPEORM_USERNAME"),
  password: configService.get("TYPEORM_PASSWORD"),
  entities: [path.resolve(__dirname, "/**/*.entity{.ts,.js}")],
  synchronize: false,
});
