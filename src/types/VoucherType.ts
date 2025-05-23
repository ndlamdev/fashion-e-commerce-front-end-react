/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 9:29PM - 13/03/2025
 * User: lam-nguyen
 **/
import PaymentEnum from "@/utils/enums/payment.enum.ts";

type VoucherType = {
  code: string;
  detail: string;
  expiryDate: Date;
  condition?: {
    minPrice?: number;
    payment?: PaymentEnum;
    blacklist?: string[];
  };
  remaining: number;
  maxDiscount?: number;
  percentDiscount?: number;
  totalDiscount?: number;
};

export default VoucherType;
