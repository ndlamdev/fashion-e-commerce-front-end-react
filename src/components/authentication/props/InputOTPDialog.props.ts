/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:31AM - 24/03/2025
 * User: lam-nguyen
 **/

export type EventInputOTPDialog = {
	sendOtp?: (otp: string) => Promise<object | undefined | number | void>;
	resendOtp?: () => Promise<object | undefined | number | void>;
};

export default EventInputOTPDialog;
