'use client';
import React from 'react';
import Button from '@mui/material/Button';
import { useAuthContext } from '@/context/AuthContext';

function Page() {
  const { peazeUser, peazeSignin, peazeSignout } = useAuthContext();

  return (
    <div className='flex flex-col items-center justify-between p-4'>
      <h1 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-black'>
        Sign in with Peaze
      </h1>
      <div className='h-24'>
        {peazeUser ? (
          <>
            <div>You're logged in with Peaze!</div>
            <Button variant='contained' onClick={peazeSignout}>
              Sign Out
            </Button>
          </>
        ) : (
          <Button variant='contained' onClick={peazeSignin}>
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
}

export default Page;
