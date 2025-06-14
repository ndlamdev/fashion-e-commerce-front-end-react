import { AddressItem } from "@/components/profile/AddressItem.tsx";
import { SkeletonTab } from "@/components/profile/tab/SkeletonTab.tsx";
import { Button } from "@/components/ui/button.tsx";
import { appDispatch, RootState } from "@/configs/store.config.ts";
import { addressApi, adminAddressApi, useAdminDeleteAddressMutation, useAdminGetAddressesQuery, useDeleteAddressMutation, useGetAddressesQuery } from "@/redux/api/address.api.ts";
import { setAddressIdAction } from "@/redux/slice/address.slice.ts";
import { showDialog } from "@/redux/slice/dialog.slice.ts";
import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const AddressTab = memo(() => {
	const dispatch = useDispatch();
	const { userIdAction } = useSelector((state: RootState) => state.address);

	const { data: addresses, isLoading: isLoadingAddresses, isError: isErrorAddresses } = useGetAddressesQuery(undefined, { skip: !!userIdAction });
	const { data: adminAddresses, isLoading: isLoadingAdminAddresses, isError: isErrorAdminAddresses } = useAdminGetAddressesQuery(userIdAction ?? 0, { skip: !userIdAction });


	const [delAddress] = useDeleteAddressMutation();
	const [adminDelAddress] = useAdminDeleteAddressMutation();

	const handleDelAddress = useCallback(
		(addressId: number) => {
			delAddress(addressId)
				.unwrap()
				.then((result) => {
					if (result.code >= 400) {
						toast("xóa địa chỉ thất bại");
						return;
					}
					appDispatch(addressApi.util.invalidateTags(["Address"]));
					toast("xóa địa chỉ thành công");
				})
				.catch((error) => {
					console.log(error);
					toast("xóa địa chỉ thất bại");
				});
		},
		[delAddress],
	);

	const handleAdminDelAddress = useCallback(
		(addressId: number) => {
			adminDelAddress({ userId: userIdAction ?? 0, addressId: addressId })
				.unwrap()
				.then((result) => {
					if (result.code >= 400) {
						toast("xóa địa chỉ thất bại");
						return;
					}
					appDispatch(adminAddressApi.util.invalidateTags(["AdminAddress"]));
					toast("xóa địa chỉ thành công");
				})
				.catch((error) => {
					console.log(error);
					toast("xóa địa chỉ thất bại");
				});
		},
		[adminDelAddress, userIdAction],
	);


	if (isLoadingAddresses || isLoadingAdminAddresses) return <SkeletonTab />;
	return (
		<article className={"max-sm:mt-10"}>
			<div className='flex flex-wrap items-center justify-between border-b pb-6 max-sm:space-y-2'>
				<h1 className={"text-lg font-bold sm:text-2xl lg:text-4xl mb-3"}>Địa chỉ của tôi</h1>
				<Button
					onClick={() => {
						dispatch(setAddressIdAction(undefined));
						dispatch(showDialog("save-address"));
					}}
					className={"cursor-pointer rounded-full bg-black p-2 text-center text-sm text-white uppercase hover:bg-sky-600 sm:p-6 sm:text-lg"}>
					Thêm địa chỉ mới
				</Button>
			</div>
			<h1 className={"mt-4 text-base font-bold sm:text-xl"}>Sổ địa chỉ</h1>
			{(isErrorAddresses && isErrorAdminAddresses) && <p>không tìm thấy địa chỉ</p>}
			{addresses &&
				addresses.data.map((address) => (
					<AddressItem
						key={address.id}
						{...address}
						onEdit={() => {
							dispatch(setAddressIdAction(address.id));
							dispatch(showDialog("save-address"));
						}}
						onDelete={() => handleDelAddress(address.id)}
					/>
				))}
			{adminAddresses &&
				adminAddresses.data.map((address) => (
					<AddressItem
						key={address.id}
						{...address}
						onEdit={() => {
							dispatch(setAddressIdAction(address.id));
							dispatch(showDialog("save-address"));
						}}
						onDelete={() => handleAdminDelAddress(address.id)}
					/>
				))}
		</article>
	);
});

export default function Address() {
	return <AddressTab />;
}
