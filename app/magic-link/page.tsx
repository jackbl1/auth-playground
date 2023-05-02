'use client';
import React from 'react';
import Button from '@mui/material/Button';
import { useAuthContext } from '@/context/AuthContext';
import Cookies from 'js-cookie';
import { Magic } from 'magic-sdk';

function Page() {
  const { magicLinkUser, setMagicLinkUser } = useAuthContext();
  const [loading, setLoading] = React.useState(false);

  let magic: Magic | null = null;

  const magicLinkSignin = async () => {
    setLoading(true);
    try {
      const accounts = await magic?.wallet.connectWithUI();
      setMagicLinkUser(accounts?.[0]);
      Cookies.set('magicLinkUser', accounts?.[0] || '');
    } catch (e: any) {
      console.error(e.message);
    }
    setLoading(false);
  };

  const magicLinkSignout = async () => {
    setLoading(true);
    try {
      await magic?.user.logout();
      Cookies.remove('magicLinkUser');
      setMagicLinkUser(null);
    } catch (e: any) {
      console.error(e.message);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY || '', {
      network: 'mainnet',
    });
  }, []);

  return (
    <div className='flex flex-col items-center justify-between p-4'>
      <h1 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
        Sign in with Magic Link
      </h1>
      <div className='h-24'>
        {magicLinkUser ? (
          <>You're signed in with Magic Link!</>
        ) : (
          <>
            {loading ? (
              <Button variant='contained' disabled>
                Loading...
              </Button>
            ) : (
              <Button variant='contained' onClick={magicLinkSignin}>
                Sign In
              </Button>
            )}
          </>
        )}
      </div>
      {magicLinkUser && (
        <div className='group rounded-lg border mb-5 px-5 py-4 transition-colors bg-gradient-to-r bg-opacity-50 border-blue-800 from-indigo-500 via-purple-500 to-pink-500'>
          <h2 className={`mb-3 text-2xl font-semibold `}>Magic Link</h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            {magicLinkUser}
          </p>
          {loading ? (
            <Button variant='contained' disabled>
              Loading...
            </Button>
          ) : (
            <Button variant='contained' onClick={magicLinkSignout}>
              Signout
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default Page;
