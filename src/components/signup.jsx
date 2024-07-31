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
import { signUp } from "@/db/authApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

const SignUp = () => {
  const [errors, setErrors] = useState([]);
  const [input, setInput] = useState({
    name:"",
    email: "",
    password: "",
    profile_pic:null
  });

  const { data, error, loading, fn: fnSignUp } = useFetch(signUp, input);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const longLink = searchParams.get("createNew");

  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error == null && data) {
      //   navigate(`/dashboard/${longLink ? `createNew=${longLink}` : ""}`);
      if (longLink) {
        navigate(`/dashboard/createNew=${longLink}`);
      } else {
        navigate(`/dashboard`);
      }

      fetchUser();
    }
  }, [loading, error]);

  const handleChange = (e) => {
    const { name, value ,files} = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile pic is required"),
      });

      await schema.validate(input, { abortEarly: false });

      await fnSignUp();
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
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>if you are new here</CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Input
              name="name"
              type="text"
              placeholder="Name"
              onChange={handleChange}
            />
            {errors.name && <Error message={errors.name} />}
          </div>

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
              placeholder="Password"
              onChange={handleChange}
            />
            {errors.password && <Error message={errors.password} />}
          </div>

          <div className="space-y-1">
            <Input
              name="profile_pic"
              type="file"
              accept="image/*"
              placeholder="Profile Pic"
              onChange={handleChange}
            />
            {errors.profile_pic && <Error message={errors.profile_pic} />}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSignUp}>
            {loading ? <BeatLoader size={9} color="#36d7b7" /> : "Create Account"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
