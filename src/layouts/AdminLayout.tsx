/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 09:10 AM - 14/04/2025
 *  User: Lam Nguyen
 **/

import { Outlet, useNavigate } from "react-router";
import { VerticalMenu } from "@/components/admin/menu/VerticalMenu.tsx";
import { useAppSelector } from "@/configs/store.config.ts";
import { useEffect } from "react";
import jwtHelper from "@/utils/helper/jwtHelper";

function AdminLayout() {
	const { access_token } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (!access_token) {
			navigate("/");
			return;
		}
		const payload = jwtHelper.getPayload(access_token);
		if (!payload || !payload.roles.includes("ROLE_ADMIN")) {
			navigate("/");
		}
	});

	return (
		<div className={"flex h-[100vh] flex-col bg-black"}>
			<div className={"flex h-10 items-center justify-center text-white"}>This is header</div>
			<div className={"grid flex-1 grid-cols-12 grid-rows-1 overflow-y-hidden rounded-tl-2xl rounded-tr-2xl border"}>
				<div className={"col-span-3 hidden h-full bg-neutral-200 md:block"}>
					<VerticalMenu />
				</div>
				<div className={"bg-red scroll-show col-span-12 overflow-y-auto bg-gray-100 p-5 md:col-span-9"}>
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default AdminLayout;
