import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from 'react-router-dom';
import Login from '@/components/login';
import SignUp from '@/components/ui/signup';


const Auth = () => {
  const [search]= useSearchParams();

  return (
    <div className="mt-36 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold">
        {search.get("createNew")
          ? "Hold Up lets Login First"
          : "Login / Sign Up"}
      </h1>
      <Tabs defaultValue="Login" className="w-[400px] ">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Login">Login</TabsTrigger>
          <TabsTrigger value="Signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="Login">
          <Login />
        </TabsContent>
        <TabsContent value="Signup"><SignUp/></TabsContent>
      </Tabs>
    </div>
  );
}

export default Auth
