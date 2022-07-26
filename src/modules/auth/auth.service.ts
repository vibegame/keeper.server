import { UserEntity } from "@app/database/entities/user.entity";
import { RegisterUserDto } from "@app/modules/auth/dto";
import { UserService } from "@app/modules/user/user.service";
import { RequestUser } from "@app/modules/user/user.types";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import "dotenv/config";
import { omit } from "lodash";
import { JwtPayload, LoginResponse } from "./auth.types";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(payload: {
    email: string;
    password: string;
  }): Promise<Omit<UserEntity, "password">> {
    const user = await this.userService.findByEmail(payload.email, true);

    if (user) {
      console.log(user);

      const isValid = await bcrypt.compare(
        payload.password,
        user.hash_password,
      );

      if (isValid) {
        return omit(user, "password");
      }
    }

    return null;
  }

  async getAccessToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });
  }

  async login(user: RequestUser): Promise<LoginResponse> {
    return {
      access_token: await this.getAccessToken({
        sub: user.sub,
        email: user.email,
      }),
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    return this.userService.create(registerUserDto);
  }
}
