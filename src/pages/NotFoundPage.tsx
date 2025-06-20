import { useAppSelector } from "@/configs/store.config";
import jwtHelper from "@/utils/helper/jwtHelper";
import { useMemo } from "react";
import { useNavigate } from "react-router";

function NotFoundPage() {
	const navigate = useNavigate()
	const { access_token } = useAppSelector((state) => state.auth);
	const isRoleAdmin = useMemo(() => {
		if (!access_token) return false;
		const payload = jwtHelper.getPayload(access_token);
		return payload && payload.roles.includes("ROLE_ADMIN")
	}, [access_token])

	return <div id={"page-not-found-body"}>
		<div className="noise"></div>
		<div className="overlay"></div>
		<div className="terminal">
			<h1>Error <span className="errorcode">404</span></h1>
			<p className="output">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
			<p className="output">Please try to <span className={" cursor-pointer"} onClick={() => {
				window.history.back()
			}}>go back</span> or <span className={" cursor-pointer"} onClick={() => {
				if (isRoleAdmin) navigate("/admin")
				else navigate("/")
			}}>return to the homepage</span>.</p>
			<p className="output">Good luck.</p>
		</div>
	</div>;
}

export default NotFoundPage;
