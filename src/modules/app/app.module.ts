import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "@app/modules/user/user.module";
import { typeormOptions } from "@app/typeorm.config";

@Module({
  imports: [TypeOrmModule.forRoot(typeormOptions), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
