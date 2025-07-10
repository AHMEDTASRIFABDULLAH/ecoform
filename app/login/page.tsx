"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { handelLogin } from "@/api/fetch.js";
import { FormEvent } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
function Login() {
  const { loginUser } = useUser();
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    )?.value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      ?.value;
    try {
      const data = await handelLogin({ email, password });
      alert("Login successful");
      router.push("/dashboard");
      loginUser(data?.user);
      form.reset();
    } catch (error: any) {
      alert("Login failed: " + error.error);
    }
  };
  return (
    <div className="flex pt-10 px-4  justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link href={"/signup"}>
              {" "}
              <Button variant="link">Sign Up</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
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
                  Login
                </Button>
              </CardFooter>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
