"use client";
import React from "react";
import Button from "@mui/material/Button";
import { useAuthContext } from "@/context/AuthContext";

function Page() {
  const { peazeUser, peazeSignin } = useAuthContext();

  return (
    <div className="flex flex-col items-center justify-between p-4">
      <div className="block h-12 justify-center font-bold ">
        Sign in with Peaze
      </div>
      <div className="h-24">
        {peazeUser ? (
          <>You're logged in with Peaze!</>
        ) : (
          <Button variant="contained" onClick={peazeSignin}>
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
}

export default Page;
