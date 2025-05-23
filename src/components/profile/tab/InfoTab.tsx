import { memo, useContext } from "react";
import { InfoTabProps } from "@/components/profile/props/infoTab.props.ts";
import { Button } from "@/components/ui/button.tsx";
import { formatDate } from "@/utils/helper/format-data.ts";
import { DialogProfileContext } from "@/context/dialogProfileContext.props.ts";
import LocalStorage from "@/utils/helper/LocalStorage.ts";
import UserDto from "@/domain/dto/user.dto.ts";

const InfoTab = memo((props: Partial<InfoTabProps>) => {
	const {showDialog} = useContext(DialogProfileContext)
	return (
		<article className={"space-y-10 max-md:space-y-5 max-sm:mt-10"}>
			<h1 className={"text-4xl max-md:text-xl font-bold"}>Thông tin tài khoản</h1>
			<div className="grid grid-cols-2 place-items-start gap-4 text-neutral-500 text-sm xl:text-xl md:text-lg">
				<span>Họ và tên</span>{props.full_name ? <span className={'text-black'}>{props.full_name}</span> :
				<span className={"text-neutral-500 italic text-sm "}>Chưa cập nhật</span>}
				<span>Số điện thoại</span>{props.phone ? <span className={'text-black'}>{props.phone}</span> :
				<span className={"text-neutral-500 italic text-sm"}>Chưa cập nhật</span>}
				<span>Giới tính</span> {props.gender ? <span className={'text-black'}>{props.gender}</span> :
				<span className={"text-neutral-500 italic text-sm"}>Chưa cập nhật</span>}
				<span>Ngày sinh</span>{props.birthday ? <span className={'text-black'}>{formatDate(props.birthday)}</span> :
				<span className={"text-neutral-500 italic text-sm"}>Hãy cập nhật ngày sinh để coolmate gửi cho bạn 1 phần quà đặc biệt nhé</span>}
				<span>Chiều cao</span>{props.height ? <span className={'text-black'}>{props.height}</span> :
				<span className={"text-neutral-500 italic text-sm"}>Chưa cập nhật</span>}
				<span>Cân nặng</span>{props.weight ? <span className={'text-black'}>{props.weight}</span> :
				<span className={"text-neutral-500 italic text-sm "}>Chưa cập nhật</span>}

				<Button onClick={() => showDialog('edit-info-profile')} className={'text-xl max-md:text-sm bg-white text-black font-bold p-5 border border-black hover:border-neutral-500 hover:text-white hover:bg-black cursor-pointer rounded-full'}>Cập nhật</Button>
			</div>

			<h1 className={"text-4xl font-bold max-md:text-xl"}>Thông tin đăng nhập</h1>
			<div className="grid grid-cols-2 place-items-start gap-4 even:text-neutral-500 text-sm xl:text-xl md:text-lg">
				<span>Email</span>{props.email ? <span className={'text-black'}>{props.email}</span> :
				<span className={"text-neutral-500 italic text-sm"}>Chưa cập nhật</span>}
				<span>Mật khẩu</span> <span>******************</span>

				<Button onClick={() => showDialog('reset-password')} className={'text-xl max-md:text-sm bg-white text-black font-bold p-5 border border-black hover:border-neutral-500 hover:text-white hover:bg-black cursor-pointer rounded-full'}>Cập nhật</Button>
			</div>
		</article>
	);
});


export default function Info() {
	const userDto = LocalStorage.getObjectValue<UserDto>('USER')
	// const {data, isLoading} = useGetProfileQuery(userId)
	return (
		<InfoTab {...userDto}/>
	)
}