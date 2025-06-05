/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:08 PM - 21/05/2025
 * User: kimin
 **/

type OrderItemResponse = {
  id: number;
  productId: string;
  variantId: string;
  quantity: number;
  compare_price: number;
  regular_price: number;
}

export default OrderItemResponse;