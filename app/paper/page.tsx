'use client';
import React from 'react';
import Button from '@mui/material/Button';
import { useAuthContext } from '@/context/AuthContext';
import { PaperEmbeddedWalletSdk } from '@paperxyz/embedded-wallet-service-sdk';
import Cookies from 'js-cookie';

function Page() {
  const { paperUser, setPaperUser } = useAuthContext();
  const [loading, setLoading] = React.useState(false);

  let paper: PaperEmbeddedWalletSdk | null = null;

  const paperSignin = async () => {
    setLoading(true);
    try {
      const accounts = await paper?.auth.loginWithPaperModal();
      setPaperUser(accounts?.user.walletAddress);
      Cookies.set('paperUser', accounts?.user.walletAddress || '');
    } catch (e: any) {
      console.error(e.message);
    }
    setLoading(false);
  };

  const paperSignout = async () => {
    setLoading(true);
    try {
      await paper?.auth.logout();
      Cookies.remove('paperUser');
      setPaperUser(null);
    } catch (e: any) {
      console.error(e.message);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    paper = new PaperEmbeddedWalletSdk({
      clientId: process.env.NEXT_PUBLIC_PAPER_CLIENT_ID || '',
      chain: 'Mumbai',
    });
  }, []);

  return (
    <div className='flex flex-col items-center justify-between p-4'>
      <h1 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-black via-green-500 to-cyan-400'>
        Sign in with Paper
      </h1>
      <div className='h-24'>
        {paperUser ? (
          <>You're signed in with Paper!</>
        ) : (
          <>
            {loading ? (
              <Button variant='contained' disabled>
                Loading...
              </Button>
            ) : (
              <Button variant='contained' onClick={paperSignin}>
                Sign In
              </Button>
            )}
          </>
        )}
      </div>
      {paperUser && (
        <div className='group rounded-lg border mb-5 px-5 py-4 text-white transition-colors bg-gradient-to-r bg-opacity-50 border-blue-800 from-black via-green-500 to-cyan-400'>
          <h2 className={`mb-3 text-2xl font-semibold `}>Paper</h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{paperUser}</p>
          {loading ? (
            <Button variant='contained' disabled>
              Loading...
            </Button>
          ) : (
            <Button variant='contained' onClick={paperSignout}>
              Signout
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default Page;
