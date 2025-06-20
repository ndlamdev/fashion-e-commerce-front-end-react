/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 12:39 PM - 18/04/2025
 *  User: kimin
 **/
import ForgotPasswordDialog from "@/components/authentication/ForgotPasswordDialog.tsx";
import InputOTPDialog from "@/components/authentication/InputOTPDialog.tsx";
import LoginDialog from "@/components/authentication/LoginDialog.tsx";
import NewPasswordDialog from "@/components/authentication/NewPasswordDialog.tsx";
import RegisterDialog from "@/components/authentication/RegisterDialog.tsx";
import RegisterWithFacebookDialog from "@/components/authentication/RegisterWithFacebookDialog";
import RegisterWithGoogleDialog from "@/components/authentication/RegisterWithGoogleDialog.tsx";
import AddressManagementDialog from "@/components/dialog/AddressManagementDialog.tsx";
import DialogLoading from "@/components/dialog/DialogLoading.tsx";
import VoiceSearchDialog from "@/components/header/dialog/VoiceSearchDialog";
import GuideChooseSizeDialog from "@/components/product-detail/dialog/GuideChooseSizeDialog.tsx";
import ReferFriendDialog from "@/components/product-detail/dialog/ReferFriendDialog.tsx";
import ChangePasswordDialog from "@/components/profile/dialog/ChangePasswordDialog.tsx";
import EditInfoProfileDialog from "@/components/profile/dialog/EditInfoProfileDialog.tsx";
import SaveAddressDialog from "@/components/profile/dialog/SaveAddressDialog.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
function DialogProvider() {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_KEY || ""}>
        <ForgotPasswordDialog />
        <LoginDialog />
        <RegisterDialog />
        <RegisterWithGoogleDialog />
        <InputOTPDialog />
        <NewPasswordDialog />
        <RegisterWithFacebookDialog />
        <VoiceSearchDialog />
      </GoogleOAuthProvider>
      <DialogLoading />
      <ReferFriendDialog />
      <GuideChooseSizeDialog />
      <EditInfoProfileDialog />
      <SaveAddressDialog />
      <ChangePasswordDialog />
      <AddressManagementDialog />
    </>
  );
}

export default DialogProvider;
