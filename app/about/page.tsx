import React from 'react';

function Page() {
  return (
    <div className='flex flex-col items-center justify-between p-4'>
      <div className='max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow mb-5'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>
          About Auth Playground
        </h5>
        <p className='font-normal text-gray-700'>
          Auth Playground is a way to explore different authentication plug-ins
          for your webApp
        </p>
      </div>
      <div className='max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow mb-5'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>
          Built by Jack Bloomfeld
        </h5>
        <p className='font-normal text-gray-700'>
          I noticed a lot of people were having trouble with authentication.
          There's a million different plugins and nowhere to test out the pros
          and cons. I built this open source tool to help developers pick the
          best authentication for their apps.
        </p>
      </div>
    </div>
  );
}

export default Page;
