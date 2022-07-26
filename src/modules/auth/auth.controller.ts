import { UserService } from "@app/modules/user/user.service";
import { AuthService } from "@app/modules/auth/auth.service";
import { RegisterUserDto } from "@app/modules/auth/dto";
import { JwtAuthGuard } from "@app/modules/auth/passport/jwt/jwt-auth.guard";
import { LocalAuthGuard } from "@app/modules/auth/passport/local/local-auth.guard";
import { RequestUser } from "@app/modules/user/user.types";
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post("register")
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Request() req: { user: RequestUser }) {
    return this.userService.findById(req.user.sub);
  }
}
