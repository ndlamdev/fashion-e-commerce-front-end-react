/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 5:10 PM - 21/05/2025
 * User: kimin
 **/
import OrderStatusEnum from "@/utils/enums/orderStatus.enum.ts";

type OrderStatusResponse = {
  id: number;
  status: OrderStatusEnum;
  note: string;
  lock: string;
  update_at: number[];
}

export default OrderStatusResponse;