import { CollectionFilterProps } from "@/components/collection/props/collectionFilter.props.ts";

export const mockCollectionFilters: CollectionFilterProps =
  {
    color: [
      {name: "red", codeColor : "#BF3131" },
      {name: "blue", codeColor : "#57B4BA" },
      {name: "pink", codeColor : "#FF2DF1" },
      {name: "red", codeColor : "#BF3131" },
      {name: "blue", codeColor : "#57B4BA" },
      {name: "pink", codeColor : "#FF2DF1" },
      {name: "red", codeColor : "#BF3131" },
      {name: "blue", codeColor : "#57B4BA" },
      {name: "pink", codeColor : "#FF2DF1" },
      {name: "red", codeColor : "#BF3131" },
      {name: "blue", codeColor : "#57B4BA" },
      {name: "pink", codeColor : "#FF2DF1" },
    ],
    size: ["S", "M", "L", "XL"],
    categoryGroup: [
      {
        id: 1,
        name: "Clothing",
      },
      { id: 2, name: "T-Shirts" },
      { id: 3, name: "Hoodies" },
    ],
    material: ["Cotton", "Polyester"],
    fitWith: ["Jeans", "Sneakers"],
  }
// {
//   color: ["white", "gray", "navy"],
//   size: ["M", "L"],
//   categoryGroup: [
//     {
//       id: 3,
//       name: "Footwear",
//       subCategories: [
//         { id: 31, name: "Sneakers" },
//         { id: 32, name: "Boots" },
//       ],
//     },
//   ],
//   material: ["Leather", "Mesh"],
//   fitWith: ["Trousers", "Jackets"],
// },
// {
//   color: ["green", "yellow"],
//   size: ["XS", "S", "M"],
//   categoryGroup: [
//     {
//       id: 4,
//       name: "Outerwear",
//       subCategories: [{ id: 41, name: "Jackets" }, { id: 42, name: "Coats" }],
//     },
//   ],
//   material: ["Nylon", "Wool"],
//   fitWith: ["Shirts", "Boots"],
// },
