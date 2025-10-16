"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";

export const CreateFoodDialog = ({
  categoryId,
  refetchFoods,
}: {
  categoryId: string;
  refetchFoods: () => Promise<void>;
}) => {
  const [image, setImage] = useState<File | undefined>();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [ingredients, setIngredients] = useState<string>("");
  const [open, setOpen] = useState<boolean>(closed);

  const addFoodHandler = async () => {
    if (!name || !price || !ingredients || !image) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", String(price));
    formData.append("ingredients", ingredients);
    formData.append("image", image);
    formData.append("categoryId", categoryId);

    try {
      const res = await fetch("http://localhost:4000/api/foods", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        alert("Food created successfully!");
        await refetchFoods();
        setOpen(false);
        setName("");
        setPrice(0);
        setIngredients("");
        setImage(undefined);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Failed to create food");
    }
  };

  // const getFoods = async () => {
  //   const res = await fetch("http://localhost:4000/api/foods");
  //   const json = await res.json();

  //   console.log("foods response:", json);

  //   const foodsArray = json.data || json.foods || json;
  //   setFoods(foodsArray);
  // };

  // const getCategories = async () => {
  //   const response = await fetch("http://localhost:4000/api/categories");
  //   const data = await response.json();
  //   setCategories(data.data);
  // };

  // useEffect(() => {
  //   getFoods();
  // }, []);

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div>
      <div className="flex p-8 gap-4 flex-wrap">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className="w-[270px] h-[240px] border-2 border-dashed border-[#EF4444] flex flex-col gap-2 justify-center items-center bg-white">
              <span className="btn btn-active btn-error text-white hover:bg-gray-200 hover:text-black">
                +
              </span>
              <span className="w-[150px] text-center">
                Add new Dish to Appetizers
              </span>
            </div>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Food</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4">
              <div className="grid gap-1">
                <Label htmlFor="name">Dish Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* <div className="grid gap-3">
                {categories.length > 0 && (
                  <Select onValueChange={(value) => setSelectedCategory(value)}>
                    <SelectTrigger className="w-full border border-b-gray-400">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => {
                        return (
                          <SelectItem key={category._id} value={category._id}>
                            {category.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                )}
              </div> */}

              <div className="grid gap-1">
                <Label htmlFor="ingredients">Ingredients</Label>
                <Input
                  id="ingredients"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                />
              </div>

              <div className="grid gap-1">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>

              <div className="grid gap-1">
                <Label htmlFor="image">Image</Label>
                <Input id="image" type="file" onChange={fileChangeHandler} />
              </div>

              <Button
                type="button"
                className="w-fit px-4 py-2 mt-2"
                onClick={addFoodHandler}
              >
                Save changes
              </Button>
            </div>

            <DialogFooter></DialogFooter>
          </DialogContent>
        </Dialog>

        {/* {foods.map((food) => (
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
                <Button
                  onClick={editFoodHandler}
                  className="bg-white rounded-2xl cursor-pointer hover:bg-gray-300"
                >
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
            <span className="text-[12px] font-medium">{food.ingredients}</span>
          </div>
        ))} */}
      </div>
    </div>
  );
};
