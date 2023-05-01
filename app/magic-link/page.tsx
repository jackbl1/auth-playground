"use client";
import React from "react";
import Button from "@mui/material/Button";
import { useAuthContext } from "@/context/AuthContext";

function Page() {
  const { magicLinkUser, magicLinkSignin } = useAuthContext();

  return (
    <div className="flex flex-col items-center justify-between p-4">
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Sign in with Magic Link
      </h1>
      <div className="h-24">
        {magicLinkUser ? (
          <>You're logged in with Magic Link!</>
        ) : (
          <Button variant="contained" onClick={magicLinkSignin}>
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
}

export default Page;
