"use client";
import { Badge } from "@/components/ui/badge";
import { AdminLayout } from "../_components/AdminLayout";
import { CreateFoodDialog } from "../_components/CreateFoodDialog";
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

interface Category {
  _id: string;
  name: string;
}

export default function ProductPage() {
  const [newCategory, setNewCategory] = useState<string>("");

  const [categories, setCategories] = useState<Category[]>([]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const getCategories = async () => {
    const res = await fetch("http://localhost:4000/api/categories");
    const { data } = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
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
  };

  const deleteCategoryHandler = async (id: string) => {
    const res = await fetch("http://localhost:4000/api/categories/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    }
  };

  return (
    <AdminLayout className="">
      <div className="bg-white mx-8 rounded-md p-3">
        <div className="flex flex-wrap gap-2 mx-8">
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
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-gray-500/20 my-2"
              >
                +
              </Badge>
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
      <CreateFoodDialog />
    </AdminLayout>
  );
}
