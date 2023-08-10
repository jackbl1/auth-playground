'use client';
import React from 'react';
import Button from '@mui/material/Button';
import { useAuthContext } from '@/context/AuthContext';
import { Web3Auth } from '@web3auth/modal';
import Cookies from 'js-cookie';

function Page() {
  const { web3AuthUser, setWeb3AuthUser } = useAuthContext();
  const [loading, setLoading] = React.useState(false);

  let web3Auth: Web3Auth | null = null;

  const web3AuthSignin = async () => {
    setLoading(true);
    await web3Auth?.initModal();
    try {
      await web3Auth?.connect();
      const info = await web3Auth?.getUserInfo();
      console.log(info);
      const email = info?.email;
      setWeb3AuthUser(email || '');
      Cookies.set('web3AuthUser', email || '');
    } catch (e: any) {
      console.error(e.message);
    }
    setLoading(false);
  };

  const web3AuthSignout = async () => {
    setLoading(true);
    try {
      await web3Auth?.logout();
      Cookies.remove('web3AuthUser');
      setWeb3AuthUser(null);
    } catch (e: any) {
      console.error(e.message);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    web3Auth = new Web3Auth({
      clientId:
        'BHI3mKrjKrp1TN4l7gvUVgFvUV9Sww4BQi9Q7GKNSPxsJIP8Uz0J5kKWDDnXm1za-3a_UKLjZJYbTuu4rEqlB_Y',
      chainConfig: {
        chainNamespace: 'eip155',
        chainId: '0x1',
        rpcTarget: 'https://rpc.ankr.com/eth',
      },
    });
  }, []);

  return (
    <div className='flex flex-col items-center justify-between p-4'>
      <h1 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-black'>
        Sign in with Web3Auth
      </h1>
      <div className='h-24'>
        {web3AuthUser ? (
          <>You're signed in with Web3Auth!</>
        ) : (
          <>
            {loading ? (
              <Button variant='contained' disabled>
                Loading...
              </Button>
            ) : (
              <Button variant='contained' onClick={web3AuthSignin}>
                Sign In
              </Button>
            )}
          </>
        )}
      </div>
      {web3AuthUser && (
        <div className='group rounded-lg border mb-5 px-5 py-4 text-white bg-black pattern-isometric pattern-blue-800 pattern-opacity-100 pattern-size-16'>
          <h2 className={`mb-3 text-2xl font-semibold `}>Web3Auth</h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            {web3AuthUser}
          </p>
          {loading ? (
            <Button variant='contained' disabled>
              Loading...
            </Button>
          ) : (
            <Button variant='contained' onClick={web3AuthSignout}>
              Signout
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default Page;
