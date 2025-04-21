import { Button } from "@/components/ui/button.tsx";
import { AddressProps } from "@/components/profile/props/address.props.ts";
import { addressExamples } from "@/assets/data/address.data.ts";
import { AddressItem } from "@/components/profile/AddressItem.tsx";
import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext.tsx";
import { toast } from "sonner";

const AddressTab = () => {
	const data: AddressProps[] = addressExamples;
	const { showDialog } = useContext(GlobalContext);
	return (
		<article>
			<div className="pb-6 border-b flex justify-between items-center">
				<h1 className={"text-4xl font-bold"}>Địa chỉ của tôi</h1>
				<Button
					onClick={() => showDialog('save-address')}
					className={
					"p-6 text-center text-white bg-black rounded-full hover:bg-sky-600 text-lg cursor-pointer uppercase"
				}>
					Thêm địa chỉ mới
				</Button>
			</div>
			<h1 className={"text-xl mt-4 font-bold"}>Sổ địa chỉ</h1>
				{data.length > 0 && data.map((address) => <AddressItem key={address.id} {...address} onEdit={() => showDialog('save-address')} onDelete={() => {
					toast('xóa địa chỉ thành công')
				}} />)}
		</article>
	);
};

export default function Address() {
	return <AddressTab />;
}