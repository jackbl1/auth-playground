"use client";
import React from "react";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const handleSignin = async (event: any) => {
    event.preventDefault();

    //sign in here

    return router.push("/admin");
  };
  return (
    <div className="grid place-items-center h-screen">
      <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Coming Soon
      </h1>
    </div>
  );
}

export default Page;
