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

export const CreateFoodDialog = () => {
  const [image, setImage] = useState<File | undefined>();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [ingredients, setIngredients] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const addFoodHandler = async () => {
    if (!name || !price || !image || !ingredients || !category) {
      alert("All fields are required");
      return;
    }

    const form = new FormData();

    form.append("name", name);
    form.append("price", String(price));
    form.append("image", image); // File object
    form.append("ingredients", ingredients);
    form.append("category", category);

    try {
      const response = await fetch("http://localhost:4000/api/foods", {
        method: "POST",
        body: form,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Food created successfully!");
        setName("");
        setPrice(0);
        setImage(undefined);
        setIngredients("");
        setCategory("");
      } else {
        alert(data.error || "Failed to create food");
      }
    } catch (error) {
      alert("Failed to create food");
    }
  };
  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const priceChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };
  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };
  const ingredientsChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIngredients(e.target.value);
  };
  const categoryChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };
  return (
    <div className="p-8">
      <Dialog>
        <DialogTrigger asChild>
          <div className="w-[270px] h-[240px] border-2 border-dashed border-[#EF4444] flex flex-col gap-2 justify-center items-center  bg-white">
            <span className="btn btn-active btn-error">+</span>
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
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={nameChangeHandler}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={price}
                onChange={priceChangeHandler}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" onChange={fileChangeHandler} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="ingredients">Ingredients</Label>
              <Input
                id="ingredients"
                name="ingredients"
                value={ingredients}
                onChange={ingredientsChangeHandler}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={category}
                onChange={categoryChangeHandler}
              />
            </div>
            <Button
              type="submit"
              size={"sm"}
              className="w-fit px-4 py-[10px]"
              onClick={addFoodHandler}
            >
              <p className="leading-5"> Save changes</p>
            </Button>
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
