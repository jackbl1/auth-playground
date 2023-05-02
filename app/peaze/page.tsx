'use client';
import React from 'react';
import Button from '@mui/material/Button';
import { useAuthContext } from '@/context/AuthContext';
import { PeazeSDK, SupportedNetwork } from '@peaze-labs/react';

function Page() {
  const { peazeUser, setPeazeUser } = useAuthContext();
  const [loading, setLoading] = React.useState(false);

  let peaze: PeazeSDK | null = null;

  const peazeSignin = async () => {
    setLoading(true);
    try {
      const signer = await peaze?.getSigner();
      setPeazeUser(signer?.address);
      window.sessionStorage.setItem('peazeUser', signer?.address || '');
    } catch (e: any) {
      console.error(e.message);
    }
    setLoading(false);
  };

  const peazeSignout = async () => {
    setLoading(true);
    try {
      setPeazeUser(null);
      window.sessionStorage.removeItem('peazeUser');
    } catch (e: any) {
      console.error(e.message);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    const storedPeazeUser = window.sessionStorage.getItem('peazeUser');
    if (storedPeazeUser) {
      setPeazeUser(storedPeazeUser);
    }
  }, [setPeazeUser]);

  React.useEffect(() => {
    peaze = new PeazeSDK({
      id: process.env.NEXT_PUBLIC_PEAZE_PROJECT_ID || '',
      key: process.env.NEXT_PUBLIC_PEAZE_PROJECT_KEY || '',
      environment: 'STAGING',
      network: {
        chainId: SupportedNetwork.PolygonMumbai,
      },
    });
  }, []);
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
      {peazeUser && (
        <div className='group rounded-lg border mb-5 px-5 py-4 text-white bg-black pattern-isometric pattern-blue-800 pattern-opacity-100 pattern-size-16'>
          <h2 className={`mb-3 text-2xl font-semibold`}>Peaze</h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{peazeUser}</p>
          {loading ? (
            <Button variant='contained' disabled>
              Loading...
            </Button>
          ) : (
            <Button variant='contained' onClick={peazeSignout}>
              Signout
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default Page;
