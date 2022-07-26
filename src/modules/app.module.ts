import { UserModule } from "@app/modules/user/user.module";
import { typeormModuleOptions } from "@app/typeorm.config";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormModuleOptions),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
