import { Outlet } from "react-router";

function AdminLayout() {
	return (
		<div className={"flex h-[100vh] flex-col bg-black"}>
			<div className={"flex h-10 items-center justify-center text-white"}>This is header</div>
			<div className={"grid flex-1 grid-cols-12 grid-rows-1 overflow-y-hidden rounded-2xl border bg-white"}>
				<div className={"col-span-2 h-full bg-gray-200"}>This is vertical menu</div>
				<div className={"bg-red col-span-10 overflow-y-auto bg-gray-100 p-5"}>
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default AdminLayout;
