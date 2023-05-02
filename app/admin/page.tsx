'use client';
import React from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Cookies from 'js-cookie';

function Page() {
  const { firebaseUser, firebaseSignout, magicLinkUser, magicLinkSignout } =
    useAuthContext();

  const [peazeUser, setPeazeUser] = React.useState<string | null>('');

  React.useEffect(() => {
    const peazeUserFromCookies = Cookies.get('peazeUser');
    if (peazeUserFromCookies) {
      setPeazeUser(peazeUserFromCookies);
    } else {
      setPeazeUser(null);
    }
  }, [peazeUser]);

  return (
    <>
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <div className='mb-32 grid text-center lg:text-left'>
          {firebaseUser && (
            <div className='group rounded-lg border mb-5 px-5 py-4 transition-colors border-red-700 bg-orange-500'>
              <h2 className={`mb-3 text-2xl font-semibold`}>Firebase</h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                {firebaseUser.email}
              </p>
              <Button variant='contained' onClick={firebaseSignout}>
                Signout
              </Button>
            </div>
          )}

          {peazeUser && (
            <div className='group rounded-lg border mb-5 px-5 py-4 text-white bg-black pattern-isometric pattern-blue-800 pattern-opacity-100 pattern-size-16'>
              <h2 className={`mb-3 text-2xl font-semibold`}>Peaze</h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                {peazeUser}
              </p>
              <Button
                variant='contained'
                onClick={() => {
                  Cookies.remove('peazeUser');
                }}
              >
                Signout
              </Button>
            </div>
          )}

          {magicLinkUser && (
            <div className='group rounded-lg border mb-5 px-5 py-4 transition-colors bg-gradient-to-r bg-opacity-50 border-blue-800 from-indigo-500 via-purple-500 to-pink-500'>
              <h2 className={`mb-3 text-2xl font-semibold `}>Magic Link</h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                {magicLinkUser}
              </p>
              <Button variant='contained' onClick={magicLinkSignout}>
                Signout
              </Button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Page;
