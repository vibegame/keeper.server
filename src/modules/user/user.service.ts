import { UserEntity } from "@app/database/entities/user.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { omit } from "lodash";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string, takePassword = false): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ email });

    if (!takePassword) {
      return omit(user, "hash_password") as UserEntity;
    }

    return this.userRepository.findOneBy({ email });
  }

  async findById(id: number, takePassword = false): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });

    if (!takePassword) {
      return omit(user, "hash_password") as UserEntity;
    }

    return user;
  }

  async create(payload: { email: string; password: string; fullName: string }) {
    const newUser = new UserEntity();
    const foundUserByEmail = await this.findByEmail(payload.email);

    if (foundUserByEmail) {
      throw new HttpException("Email is taken", HttpStatus.FORBIDDEN);
    }

    newUser.email = payload.email;
    newUser.fullName = payload.fullName;
    const salt = await bcrypt.genSalt();
    newUser.hash_password = await bcrypt.hash(payload.password, salt);

    return omit(
      await this.userRepository.save(newUser, { reload: true }),
      "hash_password",
    );
  }
}
