'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-6'>
      <h1 className='text-2xl font-bold text-sky-700'>Auth Playground</h1>
      <div className='mb-32 grid text-center lg:text-left'>
        <Link
          href='/firebase'
          className='group rounded-lg border border-gray-300 mb-5 px-5 py-4 transition-colors hover:pattern-wavy pattern-yellow-500 pattern-bg-orange-700 pattern-opacity-100 pattern-size-4'
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Firebase
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <div className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Sign in using email or socials with Firebase
          </div>
        </Link>

        <Link
          href='/peaze'
          className='group rounded-lg border border-gray-300 mb-5 px-5 py-4 hover:text-white hover:bg-black hover:pattern-isometric pattern-blue-800 pattern-opacity-100 pattern-size-16'
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Peaze
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Sign in using email with Peaze
          </p>
        </Link>

        <Link
          href='/magic-link'
          className='group rounded-lg border border-gray-300 mb-5 px-5 py-4 transition-colors hover:bg-gradient-to-r bg-opacity-50 hover:border-emerald-400 from-indigo-500 via-purple-500 to-pink-500'
        >
          <h2 className={`mb-3 text-2xl font-semibold `}>
            Magic Link
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Sign in using email, socials, or crypto wallet with Magic Link
          </p>
        </Link>

        <Link
          href='/paper'
          className='group rounded-lg border border-gray-300 mb-5 px-5 py-4 transition-colors hover:text-white hover:bg-gradient-to-r bg-opacity-50 hover:border-blue-800 from-black via-green-500 to-cyan-400'
        >
          <h2 className={`mb-3 text-2xl font-semibold `}>
            Paper
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Sign in using email, socials, or crypto wallet with Paper
          </p>
        </Link>

        <Link
          href='/web3-auth'
          className='group rounded-lg border border-gray-300 px-5 py-4 transition-colors hover:border-gray-500 hover:pattern-zigzag pattern-blue-200 pattern-bg-white bg-opacity-100 pattern-size-8'
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Web3 Auth
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Sign in using email, socials, or crypto wallet with Web3 Auth
          </p>
        </Link>
      </div>
    </main>
  );
}
