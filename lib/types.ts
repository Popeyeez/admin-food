export type FoodType = {
  _id: string;
  name: string;
  price: number;
  ingredients: string;
  categoryId: string;
  imageUrl: string;
};

export type CategoryType = {
  _id: string;
  name: string;
};
