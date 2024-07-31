import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'
import { BarLoader } from 'react-spinners';

const Dashboard = () => {
  return (
    <div className='flex flex-col gap-2'>
      
      {true && <BarLoader width={"100%"} color="#36b7d7" />}
      <div className='grid grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clicks Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>0</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard
