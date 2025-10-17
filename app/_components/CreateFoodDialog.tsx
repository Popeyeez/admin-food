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

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div>
      <div className="flex gap-4 flex-wrap">
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
              </div>{" "}
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
      </div>
    </div>
  );
};
