/**
 * Author: Nguyen Dinh Lam
 * Email: kiminonawa1305@gmail.com
 * Phone number: +84 855354919
 * Create at: 11:04AM - 19/03/2025
 * User: lam-nguyen
 **/
import VoucherType from "@/types/VoucherType.ts";

type VoucherProps = VoucherType & { onClick?: () => void; selected?: boolean };

export default VoucherProps;
