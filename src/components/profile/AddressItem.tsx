import { FC, memo, useCallback } from "react";
import { StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { toast } from "sonner";
import { AddressProps } from "@/components/profile/props/address.props.ts";
import { useSelector } from "react-redux";
import { RootState } from "@/configs/store.config.ts";
import { useSetDefaultAddressMutation } from "@/services/address.service.ts";

const AddressItem: FC<AddressProps> = memo((props) => {
	const { defaultId } = useSelector((state: RootState) => state.address);
	const [setDefault, ] = useSetDefaultAddressMutation()
	const handleSetDefaultAddress = useCallback(() => {
		setDefault({old_id: defaultId, new_id: props.id})
			.unwrap()
			.then((result) => {
				if (result.code >= 400) {
					toast("đặt địa chỉ mặc định thất bại");
					return;
				}
				toast("đặt địa chỉ mặc định thành công");
			})
			.catch((error) => {
				console.log(error);
				toast("đặt địa chỉ mặc định thất bại");
			});
	}, [ props.id, setDefault, defaultId])
	return (
		<div className={"py-5 border-b"}>
			<div className=" flex justify-between items-center max-sm:space-y-3">
				<div className="flex flex-wrap items-start space-x-3 sm:space-y-4">
					<span className="text-sm sm:text-lg">{props.full_name}</span>
					{props.active && <DefaultPlag />}
				</div>
				<p className="text-sm sm:text-lg text-sky-600 flex-none">
					<span className="hover:text-neutral-500 px-3 border-r cursor-pointer" onClick={props.onEdit}>Cập nhật</span>
					<span className="hover:text-neutral-500 px-3 cursor-pointer" onClick={props.onDelete}>Xóa</span>
				</p>
			</div>
			<p className="text-sm sm:text-lg text-neutral-500">{props.phone}</p>
			<div className="flex justify-between items-center">
				<p className="text-sm sm:text-lg text-neutral-500">
					{props.street && <span>{props.street}, </span>}
					<span>{props.ward}, </span><span>{props.district}, </span><span>{props.city}</span>
				</p>
				{!props.active && <Button
					onClick={handleSetDefaultAddress}
					className={"p-4 text-center border-2 cursor-pointer hover:bg-black bg-white hover:text-white text-black rounded-full"}>Đặt
					làm mặc định</Button>}
			</div>
		</div>
	);
});

const DefaultPlag = memo(() => {
	return (
		<span className={"p-1 sm:p-2 border rounded-lg sm:rounded-full text-xs sm:text-base flex items-center space-x-1 border-black"}>
			<StarIcon className={"flex-none size-4 fill-black"} />
			<span>Mặc định</span>
		</span>
	);
});

export { AddressItem };