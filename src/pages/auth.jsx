import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useSearchParams } from "react-router-dom";
import Login from "@/components/login";
import SignUp from "@/components/signup";
import { UrlState } from "@/context";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const longlink = searchParams.get("createNew");
  const navigate = useNavigate();

  const { isAuthenticated, loading } = UrlState();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      const targetPath = longlink
        ? `/dashboard?createNew=${longlink}`
        : "/dashboard";
      console.log("Navigating to:", targetPath);
      navigate(targetPath);
    }
  }, [loading, isAuthenticated]);

  return (
    <div className="mt-20 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold">
        {longlink ? "Hold Up lets Login First" : "Login / Sign Up"}
      </h1>
      <Tabs defaultValue="Login" className="min-w-[200px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Login">Login</TabsTrigger>
          <TabsTrigger value="Signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="Login">
          <Login />
        </TabsContent>
        <TabsContent value="Signup">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
