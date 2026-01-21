"use client";

import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import InputField from "../InputField";

const Header = () => {
  const [query, setQuery] = useState("");
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email?.split("@")[0] || "User");
      } else {
        setUserName(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/public");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="flex flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-medium">Hello {userName || "User"} 👋🏼,</h1>
      <div className="flex items-center gap-4">
        <InputField
          value={query}
          onChange={setQuery}
          placeholder="Search"
          type="search"
          icon={<img src="/Icons/search.svg" className="w-5 h-5" />}
          bgClass="bg-gray-100"
        />
        <button onClick={handleLogout} className="p-2" aria-label="Logout">
          <FiLogOut className="text-gray-600 w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
