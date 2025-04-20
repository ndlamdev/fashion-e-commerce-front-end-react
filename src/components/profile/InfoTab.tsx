import { memo, useContext } from "react";
import { InfoTabProps } from "@/components/profile/props/infoTab.props.ts";
import { formatDate } from "@/utils/format-data.ts";
import { Button } from "@/components/ui/button.tsx";
import { GlobalContext } from "@/context/GlobalContext.tsx";

const InfoTab = memo((props: InfoTabProps) => {
	const {showDialog} = useContext(GlobalContext)
	return (
		<div className={"rounded-md bg-white p-10 space-y-10"}>
			<h1 className={"text-2xl font-bold"}>Thông tin tài khoản</h1>
			<div className="grid grid-cols-2 place-items-start gap-4 text-neutral-500 text-xl">
				<span>Họ và tên</span>{props.fullName ? <span className={'text-black'}>{props.fullName}</span> :
				<span className={"text-neutral-500 italic text-sm"}>Chưa cập nhật</span>}
				<span>Số điện thoại</span>{props.phone ? <span className={'text-black'}>{props.phone}</span> :
				<span className={"text-neutral-500 italic text-sm"}>Chưa cập nhật</span>}
				<span>Giới tính</span> {props.gender ? <span className={'text-black'}>{props.gender}</span> :
				<span className={"text-neutral-500 italic text-sm"}>Chưa cập nhật</span>}
				<span>Ngày sinh</span>{props.birthday ? <span className={'text-black'}>{formatDate(props.birthday)}</span> :
				<span className={"text-neutral-500 italic text-sm"}>Hãy cập nhật ngày sinh để coolmate gửi cho bạn 1 phần quà đặc biệt nhé</span>}
				<span>Chiều cao</span>{props.height ? <span className={'text-black'}>{props.height}</span> :
				<span className={"text-neutral-500 italic text-sm"}>Chưa cập nhật</span>}
				<span>Cân nặng</span>{props.weight ? <span className={'text-black'}>{props.weight}</span> :
				<span className={"text-neutral-500 italic text-sm"}>Chưa cập nhật</span>}

				<Button onClick={() => showDialog('edit-info-profile')} className={'text-xl bg-white text-black font-bold p-5 border border-black hover:border-neutral-500 hover:text-white hover:bg-black cursor-pointer rounded-full'}>Cập nhật</Button>
			</div>

			<h1 className={"text-2xl font-bold"}>Thông tin đăng nhập</h1>
			<div className="grid grid-cols-2 place-items-start gap-4 even:text-neutral-500 text-xl">
				<span>Email</span>{props.email ? <span className={'text-black'}>{props.email}</span> :
				<span className={"text-neutral-500 italic text-sm"}>Chưa cập nhật</span>}
				<span>Mật khẩu</span> <span>******************</span>

				<Button className={'text-xl bg-white text-black font-bold p-5 border border-black hover:border-neutral-500 hover:text-white hover:bg-black cursor-pointer rounded-full'}>Cập nhật</Button>
			</div>
		</div>
	);
});


const data: InfoTabProps = {
	fullName : "lamhongphong",
	phone : "+84376236485",
	email: "a@gmail.com"
}
export default function Info() {
	return <InfoTab {...data}/>;
}