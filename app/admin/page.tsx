'use client';
import React from 'react';
import { useAuthContext } from '@/context/AuthContext';

function Page() {
  const { firebaseUser, web3AuthUser, magicLinkUser, paperUser } =
    useAuthContext();

  return (
    <>
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <div className='mb-32 grid text-center lg:text-left'>
          {firebaseUser && (
            <div className='group rounded-lg border mb-5 px-5 py-4 transition-colors pattern-wavy pattern-yellow-500 pattern-bg-orange-700 pattern-opacity-100 pattern-size-4'>
              <h2 className={`mb-3 text-2xl font-semibold`}>Firebase</h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                {firebaseUser.email.length > 30
                  ? firebaseUser.email.substring(0, 30) + '...'
                  : firebaseUser.email}
              </p>
              {/* {loading ? (
                <Button variant='contained' disabled>
                  Loading...
                </Button>
              ) : (
                <Button variant='contained' onClick={firebaseSignout}>
                  Signout
                </Button>
              )} */}
            </div>
          )}

          {web3AuthUser && (
            <div className='group rounded-lg border mb-5 px-5 py-4 text-white bg-black pattern-isometric pattern-blue-800 pattern-opacity-100 pattern-size-16'>
              <h2 className={`mb-3 text-2xl font-semibold`}>Web3Auth</h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                {web3AuthUser.length > 30
                  ? web3AuthUser.substring(0, 30) + '...'
                  : web3AuthUser}
              </p>
              {/* {loading ? (
                <Button variant='contained' disabled>
                  Loading...
                </Button>
              ) : (
                <Button variant='contained' onClick={peazeSignout}>
                  Signout
                </Button>
              )} */}
            </div>
          )}

          {magicLinkUser && (
            <div className='group rounded-lg border mb-5 px-5 py-4 transition-colors bg-gradient-to-r bg-opacity-50 border-blue-800 from-indigo-500 via-purple-500 to-pink-500'>
              <h2 className={`mb-3 text-2xl font-semibold `}>Magic Link</h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                {magicLinkUser.substring(0, 30) + '...'}
              </p>
              {/* {loading ? (
                <Button variant='contained' disabled>
                  Loading...
                </Button>
              ) : (
                <Button variant='contained' onClick={magicLinkSignout}>
                  Signout
                </Button>
              )} */}
            </div>
          )}

          {paperUser && (
            <div className='group rounded-lg border mb-5 px-5 py-4 text-white transition-colors bg-gradient-to-r bg-opacity-50 border-blue-800 from-black via-green-500 to-cyan-400'>
              <h2 className={`mb-3 text-2xl font-semibold `}>Paper</h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                {paperUser.substring(0, 30) + '...'}
              </p>
              {/* {loading ? (
                <Button variant='contained' disabled>
                  Loading...
                </Button>
              ) : (
                <Button variant='contained' onClick={magicLinkSignout}>
                  Signout
                </Button>
              )} */}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Page;
