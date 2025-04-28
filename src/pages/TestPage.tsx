/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:20AM - 30/03/2025
 *  User: lam-nguyen
 **/
import authenticationService from "@/services/authentication.service.ts";
import { useNavigate } from "react-router";

function TestPage() {
	const navigate = useNavigate();

	return (
		<div className={"mb-2 flex justify-center gap-2"}>
			<button
				className={"rounded-4xl border-1 border-green-500 px-4 py-2"}
				onClick={() => {
					authenticationService.greeting().then();
				}}>
				Greeting
			</button>
			<button
				className={"rounded-4xl border-1 border-yellow-500 px-4 py-2"}
				onClick={() => {
					authenticationService.renewAccessToken().then();
				}}>
				Renew access token
			</button>
			<button
				className={"rounded-4xl border-1 border-red-500 px-4 py-2"}
				onClick={() => {
					authenticationService.logout().then(() => {
						navigate("/");
					});
				}}>
				Logout
			</button>
		</div>
	);
}

export default TestPage;
