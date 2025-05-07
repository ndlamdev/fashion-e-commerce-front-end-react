import { Button } from "@/components/ui/button.tsx";
import { AddressItem } from "@/components/profile/AddressItem.tsx";
import { toast } from "sonner";
import { memo, useCallback, useContext, useEffect } from "react";
import { DialogProfileContext } from "@/context/dialogProfileContext.props.ts";
import { useDeleteAddressMutation, useGetAddressesQuery } from "@/services/profile.service.ts";
import { SkeletonTab } from "@/components/profile/tab/SkeletonTab.tsx";
import { useDispatch, useSelector } from "react-redux";
import { setActionId, setDefaultId } from "@/redux/slice/address.slice.ts";
import { RootState } from "@/configs/store.config.ts";

const AddressTab = memo(() => {
	const dispatch = useDispatch();
	const { data: addresses, isLoading: isLoadingAddresses, isError: isErrorAddresses } = useGetAddressesQuery();
	const defaultId = addresses?.data.find((addr) => addr.active)?.id
	useEffect(()=> {
		dispatch(setDefaultId(defaultId));
	}, [addresses, defaultId, dispatch])
	const { actionId } = useSelector((state: RootState) => state.address);
	const [ delAddress ,] = useDeleteAddressMutation();
	const { showDialog } = useContext(DialogProfileContext);
	const handleDelAddress = useCallback( (id: number | undefined) => {
		dispatch(setActionId(id))
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
	}, [dispatch, delAddress, actionId])
	if (isLoadingAddresses) return <SkeletonTab />;
	return (
		<article className={"max-sm:mt-10"}>
			<div className="pb-6 border-b flex flex-wrap justify-between items-center max-sm:space-y-2">
				<h1 className={"text-lg lg:text-4xl sm:text-2xl font-bold"}>Địa chỉ của tôi</h1>
				<Button
					onClick={() => {
						dispatch(setActionId(undefined))
						showDialog("save-address");
					}}
					className={
						"p-2 sm:p-6 text-sm sm:text-lg  text-center text-white bg-black rounded-full hover:bg-sky-600 cursor-pointer uppercase"
					}>
					Thêm địa chỉ mới
				</Button>
			</div>
			<h1 className={"text-base sm:text-xl mt-4 font-bold"}>Sổ địa chỉ</h1>
			{isErrorAddresses && <p>không tìm thấy địa chỉ</p>}
			{addresses && addresses.data.map((address) => <AddressItem key={address.id} {...address} onEdit={() => {
				dispatch(setActionId(address.id));
				showDialog("save-address");
			}} onDelete={() => handleDelAddress(address.id)} />)}
		</article>
	);
});

export default function Address() {
	return <AddressTab />;
}