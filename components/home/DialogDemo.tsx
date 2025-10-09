"use client";
import { ChangeEvent, useState } from "react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function DialogDemo() {
  const [foodName, setFoodName] = useState<string>("");
  const [foodPrice, setFoodPrice] = useState<number>(0);
  const [ingredients, setIngredients] = useState<string>("");
  const addFoodHandler = () => {
    fetch("http://localhost:4000/api/foods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        foodName,
        foodPrice,
        ingredients,
      }),
    });
  };
  const foodNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFoodName(e.target.value);
  };
  const priceChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFoodPrice(Number(e.target.value));
  };
  const IngredientsChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIngredients(e.target.value);
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <div className="w-[270px] h-[240px] border-2 border-dashed border-[#EF4444] flex flex-col gap-2 justify-center items-center cursor-pointer">
            <span className="btn btn-active btn-error">+</span>
            <span className="w-[150px] text-center">
              Add new Dish to Appetizers
            </span>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Dishes info</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="foodName">Food name</Label>
              <Input
                id="foodName"
                name="foodName"
                placeholder="Food name"
                defaultValue={foodName}
                value={foodName}
                onChange={foodNameChangeHandler}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="price">Food price</Label>
              <Input
                type="number"
                name="foodPrice"
                id="foodPrice"
                placeholder="Price"
                defaultValue={0}
                value={foodPrice}
                onChange={priceChangeHandler}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="username-1">Ingredients</Label>
              <Input
                type="text"
                name="Ingredients"
                id="Ingredients"
                placeholder="Ingredients"
                defaultValue={ingredients}
                value={ingredients}
                onChange={IngredientsChangeHandler}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Food image</Label>
              <Input type="file" id="username-1" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button onClick={addFoodHandler} type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
