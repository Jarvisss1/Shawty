import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { UrlState } from "@/context";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "./ui/input";
import Error from "./error";
import { Card } from "./ui/card";
import { useState } from "react";
import * as yup from "yup";

const CreateLink = () => {
    const {user} = UrlState();
    const navigate = useNavigate();
    let [searchParams,setSearchParams]=useSearchParams();
    const longLink = searchParams.get("createNew");

    const{errors,setErrors}=useState({});
    const [formValues, setFormValues] = useState({
        title:"",
        longUrl: longLink || "",
        customUrl:"",
    })

    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        longUrl: yup.string().url("Must be a valid URL").required("Long URL is required"),
        customUrl: yup.string().matches(/^[a-zA-Z0-9]+$/,"Custom URL should only contain alphanumeric characters"),
    });

    const handleChange =(e)=>{
        setFormValues({
            ...formValues,
            [e.target.id]:e.target.value,
        })
    }
  return (
      <Dialog defaultOpen={longLink} onOpenChange={(res)=>{if(!res) setSearchParams({})}}>
        <DialogTrigger>
          <Button variant="destructive">Create new Link</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-mid">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Create New{" "}
            </DialogTitle>
          </DialogHeader>

          <Input
            id="title"
            placeholder="Short Url's Title"
            value={formValues.title}
            onChange={handleChange}
          />
          <Error message={"some error"} />

          <Input
            id="longUrl"
            placeholder="Enter your loooong Url"
            value={formValues.longUrl}
            onChange={handleChange}
          />
          <Error message={"some error"} />

          <div className="flex items-center gap-2">
            <Card className="p-2 w-3/4">url-shortner-vercel.com</Card>/
            <Input
              id="customUrl"
              placeholder="Custom Url (optional)"
              value={formValues.customUrl}
              onChange={handleChange}
            />
          </div>
          <Error message={"some error"} />
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="destructive">
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
};

export default CreateLink;
