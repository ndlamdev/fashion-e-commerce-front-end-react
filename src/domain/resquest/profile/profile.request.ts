import UserDto from "@/domain/dto/user.dto";

export type ProfileRequest = Omit<UserDto, "birthday" | "id"> & {
	birthday: string;
};
