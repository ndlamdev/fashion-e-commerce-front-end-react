import { FC, memo } from "react";
import { AddressProps } from "@/components/profile/props/address.props.ts";
import { StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { toast } from "sonner";

const AddressItem: FC<AddressProps> = memo((props) => {
	return (
		<div className={"py-5 border-b"}>
			<div className="flex justify-between items-center">
				<div className="flex items-start space-x-3 space-y-4">
					<span className="text-lg">{props.fullName}</span>
					{props.active && <DefaultPlag />}
				</div>
				<p className="text-lg text-sky-600">
					<span className="hover:text-neutral-500 px-3 border-r cursor-pointer" onClick={props.onEdit}>Cập nhật</span>
					<span className="hover:text-neutral-500 px-3 cursor-pointer" onClick={props.onDelete}>Xóa</span>
				</p>
			</div>
			<p className="text-lg text-neutral-500">{props.phone}</p>
			<div className="flex justify-between items-center">
				<p className="text-lg text-neutral-500">
					{props.street && <span>{props.street}, </span>}
					<span>{props.ward}, </span><span>{props.district}, </span><span>{props.city}</span>
				</p>
				{!props.active && <Button
					onClick={() => {
						toast('đặt làm địa chỉ thành công')
					}}
					className={"p-4 text-center border-2 cursor-pointer hover:bg-black bg-white hover:text-white text-black rounded-full"}>Đặt
					làm mặc định</Button>}
			</div>
		</div>
	);
});

const DefaultPlag = memo(() => {
	return (
		<span className={"p-2 border rounded-full text-sm flex items-center space-x-1 border-black"}>
			<StarIcon className={"size-4 fill-black"} />
			<span>Mặc định</span>
		</span>
	);
});

export { AddressItem };