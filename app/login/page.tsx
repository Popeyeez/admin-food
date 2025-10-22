"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (localStorage) {
      const loggedInEmail = localStorage.getItem("userEmail");
      if (loggedInEmail) {
        router.push("/");
      }
    }
  }, []);

  const onLogin = async () => {
    const result = await fetch(
      "https://backend-food-seven.vercel.app/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const response = await result.json();
    if (response.success) {
      localStorage.setItem("userEmail", email);
      router.push("/");
    } else {
      alert("Login failed");
    }
  };

  const onRegister = () => {
    router.push("/register");
  };

  return (
    <div className="h-screen flex flex-wrap w-full justify-between p-20">
      <div className="w-60 flex flex-col gap-3 justify-center">
        <h3 className="text-[22px] pb-5 font-semibold">Log in</h3>
        <p>Email</p>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          className="hover:bg-gray-500 hover:text-white"
          variant="outline"
          onClick={onLogin}
        >
          Login
        </Button>
        <Button
          className="hover:bg-gray-500 hover:text-white"
          variant="outline"
          onClick={onRegister}
        >
          Register
        </Button>
      </div>

      <img
        src="https://learn.g2.com/hubfs/food%20delivery%20tech%20gloss-ai.jpg"
        alt=""
        className="w-[850px] h-[667px] object-cover rounded-md"
      />
    </div>
  );
};

export default Page;
