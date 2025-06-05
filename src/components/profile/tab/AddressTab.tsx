import { Button } from "@/components/ui/button.tsx";
import { AddressItem } from "@/components/profile/AddressItem.tsx";
import { toast } from "sonner";
import { memo, useCallback, useEffect } from "react";
import { SkeletonTab } from "@/components/profile/tab/SkeletonTab.tsx";
import { useDispatch, useSelector } from "react-redux";
import { setActionId, setDefaultId } from "@/redux/slice/address.slice.ts";
import { RootState } from "@/configs/store.config.ts";
import { useDeleteAddressMutation, useGetAddressesQuery } from "@/redux/api/address.api.ts";
import { showDialog } from "@/redux/slice/dialog.slice.ts";

const AddressTab = memo(() => {
	const dispatch = useDispatch();
	const { data: addresses, isLoading: isLoadingAddresses, isError: isErrorAddresses } = useGetAddressesQuery();
	const defaultId = addresses?.data.find((addr) => addr.active)?.id;
	useEffect(() => {
		dispatch(setDefaultId(defaultId));
	}, [addresses, defaultId, dispatch]);
	const { actionId } = useSelector((state: RootState) => state.address);
	const [delAddress] = useDeleteAddressMutation();
	const handleDelAddress = useCallback(
		(id: number | undefined) => {
			dispatch(setActionId(id));
			delAddress(actionId)
				.unwrap()
				.then((result) => {
					if (result.code >= 400) {
						toast("xóa địa chỉ thất bại");
						return;
					}
					toast("xóa địa chỉ thành công");
				})
				.catch((error) => {
					console.log(error);
					toast("xóa địa chỉ thất bại");
				});
		},
		[dispatch, delAddress, actionId],
	);
	if (isLoadingAddresses) return <SkeletonTab />;
	return (
		<article className={"max-sm:mt-10"}>
			<div className='flex flex-wrap items-center justify-between border-b pb-6 max-sm:space-y-2'>
				<h1 className={"text-lg font-bold sm:text-2xl lg:text-4xl"}>Địa chỉ của tôi</h1>
				<Button
					onClick={() => {
						dispatch(setActionId(undefined));
						dispatch(showDialog("save-address"));
					}}
					className={"cursor-pointer rounded-full bg-black p-2 text-center text-sm text-white uppercase hover:bg-sky-600 sm:p-6 sm:text-lg"}>
					Thêm địa chỉ mới
				</Button>
			</div>
			<h1 className={"mt-4 text-base font-bold sm:text-xl"}>Sổ địa chỉ</h1>
			{isErrorAddresses && <p>không tìm thấy địa chỉ</p>}
			{addresses &&
				addresses.data.map((address) => (
					<AddressItem
						key={address.id}
						{...address}
						onEdit={() => {
							dispatch(setActionId(address.id));
							dispatch(showDialog("save-address"));
						}}
						onDelete={() => handleDelAddress(address.id)}
					/>
				))}
		</article>
	);
});

export default function Address() {
	return <AddressTab />;
}
