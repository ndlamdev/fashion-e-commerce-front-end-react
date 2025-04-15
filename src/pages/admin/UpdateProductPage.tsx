import { useParams } from "react-router";
import { useEffect } from "react";
import CreateProductPage from "@/pages/admin/CreateProductPage.tsx";

function UpdateProductPage() {
	const { id } = useParams();

	useEffect(() => {
		console.log(id);
	}, [id]);

	return <CreateProductPage titlePage={"Update product"} />;
}

export default UpdateProductPage;
