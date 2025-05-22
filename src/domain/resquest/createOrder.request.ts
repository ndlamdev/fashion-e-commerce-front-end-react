/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 4:11 AM - 21/05/2025
 * User: kimin
 **/
import PaymentEnum from "@/utils/enums/payment.enum.ts";

type CreateOrderRequest = {
  name: string;
  email: string;
  phone: string;
  address: string;
  ward: string;
  district: string;
  province: string;
  note: string;
  method: PaymentEnum;
  items: VariantRequestType[];
};

export type VariantRequestType = {
  variantId: string;
  quantity: number;
}

export type InfoCustomerCreateOrder = Omit<CreateOrderRequest, "items">

export default CreateOrderRequest;
