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
          Shawtyy: Create short, custom URLs with detailed analytics. © 2024
        </div>
    </div>
  )
}

export default AppLayout
