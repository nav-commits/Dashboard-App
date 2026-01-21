"use client";

import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const auth = getAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card bgClass="bg-white p-8 shadow-md" className="w-full max-w-md m-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isRegister ? "Register" : "Login"}
        </h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Enter your email"
            bgClass="bg-white"
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
            bgClass="bg-white"
          />
          <Button
            type="submit"
            text={isRegister ? "Register" : "Login"}
            textColor="#FFFFFF"
            bgColor="#5932EA"
            className="w-full hover:bg-indigo-700 transition"
          />
        </form>
        <p className="mt-4 text-center text-gray-600 text-sm">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setIsRegister(!isRegister)}
            className="text-[#5932EA] hover:underline cursor-pointer transition"
          >
            {isRegister ? "Login" : "Register"}
          </span>
        </p>
      </Card>
    </div>
  );
}
