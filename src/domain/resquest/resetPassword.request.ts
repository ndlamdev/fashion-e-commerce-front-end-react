import NewPasswordRequest from "@/domain/resquest/newPassword.request.ts";

export type ResetPasswordRequest = NewPasswordRequest & {
  oldPassword: string;
};
