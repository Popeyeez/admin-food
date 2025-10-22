import { CategoryType, FoodType } from "@/lib/types";
import { CreateFoodDialog } from "./CreateFoodDialog";
import { Button } from "@/components/ui/button";
import { FiEdit2 } from "react-icons/fi";

export const CategorizedFoods = ({
  foods,
  category,
  refetchFoods,
}: {
  foods: FoodType[];
  category: CategoryType;
  refetchFoods: () => Promise<void>;
}) => {
  console.log(foods);
  return (
    <div className="bg-white rounded-md mx-8 mt-5 border">
      <div className="p-4 rounded-lg bg-white">
        <h2 className="font-semibold text-[30px] mx-8 capitalize">
          {category.name}
        </h2>
        <div className="flex flex-wrap gap-8 p-8 items-center">
          <CreateFoodDialog
            categoryId={category._id}
            refetchFoods={refetchFoods}
          />
          {foods.map((food: FoodType) => (
            <div
              key={food._id}
              className="w-[270px] h-[240px] border-2 border-gray-300 rounded-md p-5"
            >
              <div className="h-[100px] mb-8">
                <img
                  src={food.imageUrl}
                  alt={food.name}
                  className="w-full h-30 object-cover rounded"
                />
                <div className="flex -mt-12 ml-43">
                  <Button className="bg-white rounded-2xl cursor-pointer hover:bg-gray-300">
                    <FiEdit2 color="red" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium text-[14px] text-[#EF4444]">
                  {food.name}
                </span>
                <span className="text-black text-[12px] font-normal">
                  ${food.price}
                </span>
              </div>
              <span className="text-[12px] font-medium">
                {food.ingredients}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
