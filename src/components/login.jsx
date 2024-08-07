import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import Error from "./error";
import * as Yup from "yup";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { login } from "@/db/authApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

const Login = () => {
  const [errors, setErrors] = useState([]);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const { data, error, loading, fn: fnLogin } = useFetch(login, input);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const longLink = searchParams.get("createNew");

  const {fetchUser} = UrlState();

  useEffect(() => {
    if (error == null && data) {
      fetchUser();
      //   navigate(`/dashboard/${longLink ? `createNew=${longLink}` : ""}`);
      if (longLink) {
        navigate(`/dashboard/createNew=${longLink}`);
      } else {
        navigate(`/dashboard`);
      }

      
    }
  }, [data, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });

      await schema.validate(input, { abortEarly: false });

      await fnLogin();
    } catch (error) {
      const newError = {};
      error?.inner?.forEach((err) => {
        newError[err.path] = err.message;
      });
      setErrors(newError);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            to your account if you already have one
          </CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
            />
            {errors.email && <Error message={errors.email} />}
          </div>
          <div className="space-y-1">
            <Input
              name="password"
              type="password"
              placeholder="password"
              onChange={handleChange}
            />
            {errors.password && <Error message={errors.password} />}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin}>
            {loading ? <BeatLoader size={9} /> : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
