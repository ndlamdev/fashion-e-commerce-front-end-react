import { SizeName, SuggestInfo } from "@/types/product/productModels.type.ts";

const SIZE_ORDER = ["S", "M", "L", "XL", "2XL", "3XL"];
const sizeSuggestions: Record<SizeName, SuggestInfo> = {
  S: { heightRange: { min: 150, max: 160 }, weightRange: { min: 45, max: 55 } },
  M: { heightRange: { min: 160, max: 170 }, weightRange: { min: 55, max: 65 } },
  L: { heightRange: { min: 170, max: 180 }, weightRange: { min: 65, max: 75 } },
  XL: { heightRange: { min: 180, max: 190 }, weightRange: { min: 75, max: 85 } },
  "2XL": { heightRange: { min: 190, max: 200 }, weightRange: { min: 85, max: 95 } },
  "3XL": { heightRange: { min: 200, max: 210 }, weightRange: { min: 95, max: 105 } },
};

/*
Nếu một size có trong SIZE_ORDER, ta lấy chỉ số (index) của nó.
Nếu một size không có trong SIZE_ORDER, ta cho nó xuống cuối danh sách (SIZE_ORDER.length).
 */
export const sortSizes = (sizes: SizeName[]): SizeName[] => {
  return sizes.sort((a, b) => {
    const indexA = SIZE_ORDER.indexOf(a);
    const indexB = SIZE_ORDER.indexOf(b);

    // Xử lý trường hợp size không tồn tại trong SIZE_ORDER
    return (indexA === -1 ? SIZE_ORDER.length : indexA) -
      (indexB === -1 ? SIZE_ORDER.length : indexB);
  });
};

export const getMinSize = (sizes: SizeName[]): SizeName | undefined => {
  return sortSizes(sizes)[0]; // Phần tử đầu tiên (nhỏ nhất)
};

export const getMaxSize = (sizes: SizeName[]): SizeName | undefined => {
  const sorted = sortSizes(sizes);
  return sorted[sorted.length - 1]; // Phần tử cuối cùng (lớn nhất)
};

export const getSizeSuggestion = (size: SizeName): SuggestInfo | undefined => {
  return sizeSuggestions[size]; // Trả về thông tin nếu tồn tại, undefined nếu không có
};
