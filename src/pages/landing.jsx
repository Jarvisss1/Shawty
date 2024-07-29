import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react'

const Landing = () => {
  return <div className='flex flex-col items-center'>
    <h2 className='my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold'>

    Wanna make a Shorter Link?
    <br />
    Try Shawty Now!

    </h2>
    <form action="" className='sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2'>
      <Input placeholder='Paste your link here' />
      <Button>Shorten</Button>
    </form>
    <img src="banner.jpg" alt="banner" className=' w-full my-11 md:px-11'/>

  </div>;
}

export default Landing
