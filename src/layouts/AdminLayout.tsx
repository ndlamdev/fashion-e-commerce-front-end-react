/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 09:10 AM - 14/04/2025
 *  User: Lam Nguyen
 **/

import { Outlet } from "react-router";

function AdminLayout() {
	return (
		<div className={"flex h-[100vh] flex-col bg-black"}>
			<div className={"flex h-10 items-center justify-center text-white"}>This is header</div>
			<div className={"grid flex-1 grid-cols-12 grid-rows-1 overflow-y-hidden rounded-2xl border bg-white"}>
				<div className={"col-span-3 hidden h-full bg-gray-200 md:block"}>This is vertical menu</div>
				<div className={"bg-red col-span-12 overflow-y-auto bg-gray-100 p-5 md:col-span-9"}>
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default AdminLayout;
