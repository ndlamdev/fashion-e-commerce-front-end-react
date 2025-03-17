type SizeName = 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL' | string;

interface SuggestInfo {
  heightRange: {min: number, max: number };
  weightRange: {min: number, max: number };
}

type ProductModelType = {
  id: number;
  name: string;
  sizes: SizeName[];
  imageUrls: string[];
  codeColor: string;
  codeModel: string;
  descriptionSizeInfo?: Record<SizeName, SuggestInfo>;
}
export type {SuggestInfo, SizeName, ProductModelType}
