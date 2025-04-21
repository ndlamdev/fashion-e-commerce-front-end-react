const ReviewTab = () => {
	return (
		<article>
			<h1 className={"text-4xl font-bold"}>Đánh giá và phản hồi</h1>
			<h2 className={"text-neutral-500 text-lg mt-3"}>Đơn hàng của bạn</h2>
			<p className="text-center italic text-neutral-500">Bạn chưa có đánh giá nào...</p>
		</article>
	);
};

export default function Review() {
	return <ReviewTab />;
}