import { Body, Controller, Post } from "@nestjs/common";
import { LoginUserDto, RegisterUserDto } from "./dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("login")
  login(@Body() body: LoginUserDto) {
    return {};
  }

  @Post("register")
  async register(@Body() body: RegisterUserDto) {
    return this.userService.register(body);
  }
}
