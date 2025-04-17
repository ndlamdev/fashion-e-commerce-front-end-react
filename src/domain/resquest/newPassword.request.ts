/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 7:30PM - 24/03/2025
 * User: lam-nguyen
 **/

type NewPasswordRequest = {
	token: string;
	password: string;
	"confirm-password": string;
};

export default NewPasswordRequest;
