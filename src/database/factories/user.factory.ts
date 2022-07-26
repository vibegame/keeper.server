import { define } from "typeorm-seeding";
import { UserEntity } from "../entities/user.entity";
import { faker } from "@faker-js/faker";

define(UserEntity, () => {
  const user = new UserEntity();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  user.fullName = `${firstName} ${lastName}`;
  user.email = `${user.fullName.replace(" ", "")}@mail.com`;

  return user;
});
