const VoucherWalletTab = () =>{
	return (
		<article className={'max-sm:mt-10'}>
			<h1 className={'text-lg lg:text-4xl sm:text-2xl font-bold'}>Ví voucher</h1>
			<p className="italic text-xs sm:text-sm  text-neutral-500 text-center">Bạn chưa lưu mã giảm giá nào!</p>

		</article>
	);
}
export default function VoucherWallet() {
	return <VoucherWalletTab />;
}