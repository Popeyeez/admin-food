"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onCreateUser = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    }
    const result = await fetch(
      "https://backend-food-seven.vercel.app/api/register",
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
    console.log("User created:", result);
  };
  const onLogin = () => {
    router.push("/login");
  };
  return (
    <div className="h-screen flex flex-wrap w-full justify-between p-20">
      <div className="w-60 flex flex-col gap-3 justify-center">
        {step == 1 && (
          <div className="w-60 flex flex-col gap-3 justify-center">
            <p>Email</p>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              className="hover:bg-gray-500 hover:text-white"
              variant="outline"
              onClick={() => setStep(2)}
            >
              Next
            </Button>
            <p className="text-[12px]">Already have an account?</p>
            <Button
              className="hover:bg-gray-500 hover:text-white"
              variant="outline"
              onClick={onLogin}
            >
              Login
            </Button>
          </div>
        )}
        {step == 2 && (
          <div className="w-60 flex flex-col gap-3 justify-center">
            <p>Password</p>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p>Confirm Password</p>
            <Input
              type="password"
              placeholder="ConfirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className="text-red-500">{error}</p>}
            <Button
              className="hover:bg-gray-500 hover:text-white"
              variant="outline"
              onClick={onCreateUser}
            >
              Lets Go
            </Button>
          </div>
        )}
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
