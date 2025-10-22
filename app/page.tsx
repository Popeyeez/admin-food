"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { CategoryType, FoodType } from "@/lib/types";
import { AdminLayout } from "./_components/AdminLayout";
import { CategorizedFoods } from "./_components/CategorizedFoods";
import { useRouter } from "next/navigation";

export default function Page() {
  const [newCategory, setNewCategory] = useState<string>("");

  const [categories, setCategories] = useState<CategoryType[]>([]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [foods, setFoods] = useState<FoodType[]>([]);
  const route = useRouter();
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      route.push("/login");
    }
  }, [route]);

  const getCategories = async () => {
    const response = await fetch(
      "https://backend-food-seven.vercel.app/api/categories"
    );
    const data = await response.json();
    setCategories(data.data);
  };

  const getFoods = async () => {
    const res = await fetch("https://backend-food-seven.vercel.app/api/foods");
    const json = await res.json();

    const foodsArray = json.data || json.foods || json;
    setFoods(foodsArray);
  };

  useEffect(() => {
    getCategories();
    getFoods();
  }, []);

  const newCategoryNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };
  const createCategoryHandler = async () => {
    if (!newCategory) return;

    const res = await fetch("http://localhost:4000/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategory }),
    });
    getCategories();
  };

  const deleteCategoryHandler = async (id: string) => {
    const res = await fetch("http://localhost:4000/api/categories/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setCategories((prev) => prev.filter((category) => category._id !== id));
    }
  };

  return (
    <AdminLayout className="">
      <div className="bg-white mx-8 rounded-md p-3">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <div
              key={category._id}
              className="flex items-center border border-gray-300 rounded-md pr-1"
            >
              <Button className="border-0" variant="outline">
                {category.name}
              </Button>
              <X
                className="hover:bg-gray-500/20 w-4 cursor-pointer"
                onClick={() => deleteCategoryHandler(category._id)}
              />
            </div>
          ))}
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="btn btn-active btn-error rounded-full bg-red-400 text-white cursor-pointer"
              >
                +
              </Button>
            </DialogTrigger>

            <DialogContent className="w-[463px] p-6">
              <DialogHeader>
                <DialogTitle>New category</DialogTitle>
              </DialogHeader>

              <Input
                type="text"
                placeholder="new category"
                value={newCategory}
                onChange={newCategoryNameChangeHandler}
              />

              <Button
                className="mt-4"
                onClick={async () => {
                  await createCategoryHandler();
                  setModalOpen(false);
                  setNewCategory("");
                }}
              >
                Create
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {categories.map((category) => {
        return (
          <CategorizedFoods
            key={category._id}
            refetchFoods={() => getFoods()}
            foods={foods.filter((food) => food.categoryId == category._id)}
            category={category}
          />
        );
      })}
    </AdminLayout>
  );
}
