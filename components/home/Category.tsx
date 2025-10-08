"use client";
import React, { ChangeEvent, useState } from "react";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export const Category = () => {
  const categorys = ["pizza , ", " lunch "];
  const [category, setCategory] = useState<string>("");

  const addCategoryHandler = () => {
    fetch("http://localhost:4000/categorys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category,
      }),
    });
  };
  const categoryChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };
  return (
    <div className="flex items-center  flex-wrap gap-3 p-4">
      <Badge>{categorys} </Badge>

      <Dialog>
        <form>
          <DialogTrigger asChild>
            <div className="cursor-pointer">
              <Badge>+</Badge>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a category</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-10">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Category name</Label>
                <Input
                  defaultValue={category}
                  value={category}
                  onChange={categoryChangeHandler}
                  id="category"
                  placeholder="Type category name.."
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={addCategoryHandler} type="submit">
                Add category
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};
