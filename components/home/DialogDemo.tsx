"use client";

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
              <Label htmlFor="name-1">Food name</Label>
              <Input id="name-1" placeholder="Food name" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Food price</Label>
              <Input id="username-1" placeholder="Price" />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="username-1">Ingredients</Label>
              <Input id="username-1" placeholder="Ingredients" />
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
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
