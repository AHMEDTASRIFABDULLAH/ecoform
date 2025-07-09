"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { handelSignup } from "@/api/fetch.js";

import Link from "next/link";
import { useUser } from "@/context/UserContext";

function SignUp() {
  const { loginUser } = useUser();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (
      form.elements.namedItem("text") as HTMLInputElement
    )?.value.trim();
    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    )?.value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      ?.value;

    try {
      const data = await handelSignup({ name, email, password });
      alert("Signup successful");
      form.reset();
    } catch (error: any) {
      alert("Signup failed: " + error.error);
    }
  };
  return (
    <div className="flex pt-10 px-4  justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Signup to your account</CardTitle>
          <CardDescription>
            Enter your email below to signup to your account
          </CardDescription>
          <CardAction>
            <Link href={"/login"}>
              <Button variant="link">Login</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="text">Name</Label>
                <Input id="text" type="text" placeholder="Name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <CardFooter className="flex-col gap-2 p-0 w-full">
                <Button type="submit" className="w-full">
                  Signup
                </Button>
              </CardFooter>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
export default SignUp;
