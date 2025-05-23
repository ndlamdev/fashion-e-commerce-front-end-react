import UserDto from "@/domain/dto/user.dto";

export type CustomerRequest = Omit<UserDto, "birthday" | "id"> & {
  birthday: string;
}