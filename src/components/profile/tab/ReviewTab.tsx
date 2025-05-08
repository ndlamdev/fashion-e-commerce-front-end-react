const ReviewTab = () => {
	return (
		<article className={'max-sm:mt-10'}>
			<h1 className={"text-lg lg:text-4xl sm:text-2xl font-bold	 font-bold"}>Đánh giá và phản hồi</h1>
			<h2 className={"text-neutral-500 text-sm sm:text-lg mt-3"}>Đơn hàng của bạn</h2>
			<p className="text-center italic text-neutral-500 text-xs sm:text-base">Bạn chưa có đánh giá nào...</p>
		</article>
	);
};

export default function Review() {
	return <ReviewTab />;
}