import { FC, memo, useCallback } from "react";
import { StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { toast } from "sonner";
import { AddressProps } from "@/components/profile/props/address.props.ts";
import { useSelector } from "react-redux";
import { appDispatch, RootState } from "@/configs/store.config.ts";
import { addressApi, useSetDefaultAddressMutation } from "@/redux/api/address.api.ts";

const AddressItem: FC<AddressProps> = memo((props) => {
	const { defaultId } = useSelector((state: RootState) => state.address);
	const [setDefault] = useSetDefaultAddressMutation();
	const handleSetDefaultAddress = useCallback(() => {
		setDefault({ old_id: defaultId, new_id: props.id })
			.unwrap()
			.then((result) => {
				if (result.code >= 400) {
					toast("đặt địa chỉ mặc định thất bại");
					return;
				}
				appDispatch(addressApi.util.invalidateTags(["Address"]));
				toast("đặt địa chỉ mặc định thành công");
			})
			.catch((error) => {
				console.log(error);
				toast("đặt địa chỉ mặc định thất bại");
			});
	}, [props.id, setDefault, defaultId]);

	return (
		<div className={"border-b py-5"}>
			<div className='flex items-center justify-between max-sm:space-y-3'>
				<div className='flex flex-wrap items-start space-x-3 sm:space-y-4'>
					<span className='text-sm sm:text-lg'>{props.full_name}</span>
					{props.active && <DefaultPlag />}
				</div>
				<p className='flex-none text-sm text-sky-600 sm:text-lg'>
					<span className='cursor-pointer border-r px-3 hover:text-neutral-500' onClick={props.onEdit}>
						Cập nhật
					</span>
					<span className='cursor-pointer px-3 hover:text-neutral-500' onClick={props.onDelete}>
						Xóa
					</span>
				</p>
			</div>
			<p className='text-sm text-neutral-500 sm:text-lg'>{props.phone}</p>
			<div className='flex items-center justify-between'>
				<p className='text-sm text-neutral-500 sm:text-lg'>
					{props.street && <span>{props.street}, </span>}
					<span>{props.ward}, </span>
					<span>{props.district}, </span>
					<span>{props.city}</span>
				</p>
				{!props.active && (
					<Button
						onClick={handleSetDefaultAddress}
						className={"cursor-pointer rounded-full border-2 bg-white p-4 text-center text-black hover:bg-black hover:text-white"}>
						Đặt làm mặc định
					</Button>
				)}
			</div>
		</div>
	);
});

const DefaultPlag = memo(() => {
	return (
		<span className={"flex items-center space-x-1 rounded-lg border border-black p-1 text-xs sm:rounded-full sm:p-2 sm:text-base"}>
			<StarIcon className={"size-4 flex-none fill-black"} />
			<span>Mặc định</span>
		</span>
	);
});

export { AddressItem };
