import { JwtPayload } from "@app/modules/auth/auth.types";
import { RequestUser } from "@app/modules/user/user.types";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  validate(payload: JwtPayload): RequestUser {
    return { sub: payload.sub, email: payload.email };
  }
}
