import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegisterUserDto } from "./dto";
import { hash } from "bcrypt";
import { UserEntity } from "@app/database/entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const user = new UserEntity();

    Object.assign(user, registerUserDto);

    user.email = registerUserDto.email;
    user.fullName = registerUserDto.fullName;
    user.hash = await hash(registerUserDto.password, 10);

    return user;
  }
}
