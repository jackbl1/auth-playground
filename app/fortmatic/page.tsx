'use client';
import React from 'react';
import Button from '@mui/material/Button';
import { useAuthContext } from '@/context/AuthContext';
import Cookies from 'js-cookie';
import Fortmatic from 'fortmatic';
import Web3 from 'web3';

function Page() {
  const { fortmaticUser, setFortmaticUser } = useAuthContext();
  const [loading, setLoading] = React.useState(false);

  //let fm: any = null;
  //let web3: any = null;

  const fortmaticSignin = async (fm: any) => {
    setLoading(true);
    try {
      console.log(fm);
      const accounts = await fm?.user.login();
      console.log(accounts);
      //   web3.eth.getAccounts((err: any, accounts: any) => {
      //     if (err) throw err;
      //     let address = accounts[0];
      //     console.log(address);
      //   });
      Cookies.set('fortmaticUser', accounts?.[0] || '');
      setFortmaticUser(accounts?.[0]);
    } catch (e: any) {
      console.error(e);
    }
    setLoading(false);
  };

  const fortmaticSignout = () => {
    setLoading(true);
    try {
      //fm?.user.logout();
      setFortmaticUser(null);
      Cookies.remove('fortmaticUser');
    } catch (e: any) {
      console.error(e);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    const fm = new Fortmatic('pk_test_53D49050103F2885');
    console.log(fm);
    const web3 = new Web3(fm?.getProvider() as any);
    fortmaticSignin(fm);
  }, []);

  return (
    <div className='flex flex-col items-center justify-between p-4'>
      <h1 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-black to-purple-300'>
        Sign in with Fortmatic
      </h1>
      <div className='h-24'>
        {fortmaticUser ? (
          <>You're signed in with Fortmatic!</>
        ) : (
          <>
            {loading ? (
              <Button variant='contained' disabled>
                Loading...
              </Button>
            ) : (
              <Button variant='contained' onClick={fortmaticSignin}>
                Sign In
              </Button>
            )}
          </>
        )}
      </div>
      {fortmaticUser && (
        <div className='group rounded-lg border mb-5 px-5 py-4 text-white transition-colors bg-gradient-to-r bg-opacity-50 border-blue-800 from-purple-800 via-black to-purple-800'>
          <h2 className={`mb-3 text-2xl font-semibold `}>Fortmatic</h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            {fortmaticUser}
          </p>
          {loading ? (
            <Button variant='contained' disabled>
              Loading...
            </Button>
          ) : (
            <Button variant='contained' onClick={fortmaticSignout}>
              Signout
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default Page;
