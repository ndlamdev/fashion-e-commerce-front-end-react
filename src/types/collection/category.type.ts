export type CategoryType = {
  id: number;
  name: string;
  subCategories?: CategoryType[];
};