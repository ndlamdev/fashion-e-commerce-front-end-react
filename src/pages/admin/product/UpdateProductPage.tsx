/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 09:10 AM - 14/04/2025
 *  User: Lam Nguyen
 **/

import { useParams } from "react-router";
import { useEffect } from "react";
import CreateProductPage from "@/pages/admin/product/CreateProductPage.tsx";
import { useTranslation } from "react-i18next";

function UpdateProductPage() {
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
  }, [id]);
	const { t } = useTranslation(undefined, {
		keyPrefix: "page.admin.products"
	});

  return <CreateProductPage titlePage={t('update_info_product')} />;
}

export default UpdateProductPage;
