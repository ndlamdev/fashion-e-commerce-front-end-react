import { AddressProps } from "@/components/profile/props/address.props.ts";
import { Button } from "@/components/ui/button.tsx";
import { appDispatch, useAppSelector } from "@/configs/store.config.ts";
import { addressApi, adminAddressApi, useAdminSetDefaultAddressMutation, useSetDefaultAddressMutation } from "@/redux/api/address.api.ts";
import { StarIcon } from "lucide-react";
import { FC, memo, useCallback } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const AddressItem: FC<AddressProps> = memo((props) => {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.profile.addresses_tab.item",
	});
	const { userIdAction } = useAppSelector(state => state.address)
	const [setDefault] = useSetDefaultAddressMutation();
	const [adminSetDefault] = useAdminSetDefaultAddressMutation();
	const handleSetDefaultAddress = useCallback(() => {
		setDefault(props.id)
			.unwrap()
			.then((result) => {
				if (result.code >= 400) {
					toast(t('failure'));
					return;
				}
				appDispatch(addressApi.util.invalidateTags(["Address"]));
				toast(t('success'));
			})
			.catch((error) => {
				console.log(error);
				toast(t('failure'));
			});
	}, [props.id, setDefault, t]);

	const handleAdminSetDefaultAddress = useCallback(() => {
		adminSetDefault({ userId: userIdAction ?? 0, addressId: props.id })
			.unwrap()
			.then((result) => {
				if (result.code >= 400) {
					toast(t('failure'));
					return;
				}
				appDispatch(adminAddressApi.util.invalidateTags(["AdminAddress"]));
				toast(t('success'));
			})
			.catch((error) => {
				console.log(error);
				toast(t('failure'));
			});
	}, [adminSetDefault, props.id, t, userIdAction]);

	return (
		<div className={"border-b py-5"}>
			<div className='flex items-center justify-between max-sm:space-y-3'>
				<div className='flex flex-wrap items-start space-x-3 sm:space-y-4'>
					<span className='text-sm sm:text-lg'>{props.full_name}</span>
					{props.active && <DefaultPlag />}
				</div>
				<p className='flex-none text-sm text-sky-600 sm:text-lg'>
					<span className='cursor-pointer border-r px-3 hover:text-neutral-500' onClick={props.onEdit}>
						{t("update")}
					</span>
					<span className='cursor-pointer px-3 hover:text-neutral-500' onClick={props.onDelete}>
						{t("delete")}
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
						onClick={userIdAction ? handleAdminSetDefaultAddress : handleSetDefaultAddress}
						className={"cursor-pointer rounded-full border-2 bg-white p-4 text-center text-black hover:bg-black hover:text-white"}>
						{t("set_default")}
					</Button>
				)}
			</div>
		</div>
	);
});

const DefaultPlag = memo(() => {
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.profile.addresses_tab.item",
	});
	return (
		<span className={"flex items-center space-x-1 rounded-lg border border-black p-1 text-xs sm:rounded-full sm:p-2 sm:text-base"}>
			<StarIcon className={"size-4 flex-none fill-black"} />
			<span>{t("default")}</span>
		</span>
	);
});

export { AddressItem };

