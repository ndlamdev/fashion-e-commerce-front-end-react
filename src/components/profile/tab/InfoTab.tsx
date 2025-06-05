import { memo } from "react";
import { InfoTabProps } from "@/components/profile/props/infoTab.props.ts";
import { Button } from "@/components/ui/button.tsx";
import { formatDateFromArray } from "@/utils/helper/format-data.ts";
import { getGenderByValue } from "@/components/profile/props/editInfoProfileDialog.props.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/configs/store.config.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { showDialog } from "@/redux/slice/dialog.slice.ts";

const InfoTab = memo((props: Partial<InfoTabProps>) => {
	const dispatch = useDispatch();

	return (
		<article className={"space-y-10 max-md:space-y-5 max-sm:mt-10"}>
			<h1 className={"text-4xl font-bold max-md:text-xl"}>Thông tin tài khoản</h1>
			<div className='grid grid-cols-2 place-items-start gap-4 text-sm text-neutral-500 md:text-lg xl:text-xl'>
				<span>Họ và tên</span>
				{props.full_name ? <span className={"text-black"}>{props.full_name}</span> : <span className={"text-sm text-neutral-500 italic"}>Chưa cập nhật</span>}
				<span>Số điện thoại</span>
				{props.phone ? <span className={"text-black"}>{props.phone}</span> : <span className={"text-sm text-neutral-500 italic"}>Chưa cập nhật</span>}
				<span>Giới tính</span>{" "}
				{props.gender ? (
					<span className={"text-black"}>{getGenderByValue(props.gender)?.name}</span>
				) : (
					<span className={"text-sm text-neutral-500 italic"}>Chưa cập nhật</span>
				)}
				<span>Ngày sinh</span>
				{props.birthday ? (
					<span className={"text-black"}>{formatDateFromArray(props.birthday)}</span>
				) : (
					<span className={"text-sm text-neutral-500 italic"}>Hãy cập nhật ngày sinh để coolmate gửi cho bạn 1 phần quà đặc biệt nhé</span>
				)}
				<span>Chiều cao</span>
				{props.height ? <span className={"text-black"}>{props.height}</span> : <span className={"text-sm text-neutral-500 italic"}>Chưa cập nhật</span>}
				<span>Cân nặng</span>
				{props.weight ? <span className={"text-black"}>{props.weight}</span> : <span className={"text-sm text-neutral-500 italic"}>Chưa cập nhật</span>}
				<Button
					onClick={() => dispatch(showDialog("edit-info-profile"))}
					className={
						"cursor-pointer rounded-full border border-black bg-white p-5 text-xl font-bold text-black hover:border-neutral-500 hover:bg-black hover:text-white max-md:text-sm"
					}>
					Cập nhật
				</Button>
			</div>

			<h1 className={"text-4xl font-bold max-md:text-xl"}>Thông tin đăng nhập</h1>
			<div className='grid grid-cols-2 place-items-start gap-4 text-sm even:text-neutral-500 md:text-lg xl:text-xl'>
				<span>Email</span>
				{props.email ? <span className={"text-black"}>{props.email}</span> : <span className={"text-sm text-neutral-500 italic"}>Chưa cập nhật</span>}
				<span>Mật khẩu</span> <span>******************</span>
				<Button
					onClick={() => dispatch(showDialog("change-password"))}
					className={
						"cursor-pointer rounded-full border border-black bg-white p-5 text-xl font-bold text-black hover:border-neutral-500 hover:bg-black hover:text-white max-md:text-sm"
					}>
					Cập nhật
				</Button>
			</div>
		</article>
	);
});

export default function Info() {
	const { user } = useSelector((state: RootState) => state.auth);
	if (!user) return <Skeleton />;
	return <InfoTab {...user} />;
}
