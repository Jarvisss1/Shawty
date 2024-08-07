import Header from '@/components/header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
      <main className=' min-h-screen container'>

        <Header/>
        {/* body  */}
        <Outlet/>

      </main>

        <div className=' mt-10 text-center bg-gray-800 p-10'>
          made by jarvisss1
        </div>
    </div>
  )
}

export default AppLayout
