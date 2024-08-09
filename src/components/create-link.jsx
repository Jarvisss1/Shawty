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
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { QRCode } from "react-qrcode-logo";
import useFetch from "@/hooks/use-fetch";
import { createUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const CreateLink = () => {
    const {user} = UrlState();
    const navigate = useNavigate();
    let [searchParams,setSearchParams]=useSearchParams();
    const longLink = searchParams.get("createNew");
    const redirectLink = import.meta.env.VITE_REDIRECT_URL;
    let result = redirectLink.replace("https://", "");


    const ref = useRef();

    const[errors,setErrors]=useState({});
    const [formValues, setFormValues] = useState({
        title:"",
        longUrl: longLink || "",
        customUrl:"",
    })

    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        longUrl: yup.string().url("Must be a valid URL").required("Long URL is required"),
        customUrl: yup.string(),
    });

    const handleChange =(e)=>{
        setFormValues({
            ...formValues,
            [e.target.id]:e.target.value,
        })
    }

    const { loading, error,data,fn: fnCreateUrl } = useFetch(
      createUrl,
      { ...formValues, user_id: user.id });

    const createLink = async ()=>{
        setErrors([]);
        try {
            await schema.validate(formValues,{abortEarly:false});
            const canvas = ref.current.canvasRef.current;
            const blob = await new Promise((resolve) => canvas.toBlob(resolve));
            await fnCreateUrl(blob);
        } catch (error) {
            const newErrors={};
            error.inner.forEach((e)=>newErrors[e.path]=e.message);
            setErrors(newErrors);
        }
    }

    useEffect(() => {
        if(error==null && data){
            navigate(`/link/${data[0].id}`);
        }
    }, [errors,data])
    

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

          {formValues?.longUrl && (<QRCode value={formValues?.longUrl} size={200} ref={ref} className="items-center" />)}

          <Input
            id="title"
            placeholder="Short Url's Title"
            value={formValues.title}
            onChange={handleChange}
          />
          {errors.title && <Error message={errors.title} />}

          <Input
            id="longUrl"
            placeholder="Enter your loooong Url"
            value={formValues.longUrl}
            onChange={handleChange}
          />
           {errors.longUrl && <Error message={errors.longUrl} />}

          <div className="flex items-center gap-2">
            <Card className="p-2 w-19/12">{result}</Card>/
            <Input
              id="customUrl"
              placeholder="Custom Url (optional)"
              value={formValues.customUrl}
              onChange={handleChange}
            />
          </div>
          {error && <Error message={error.message} />}
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="destructive" onClick={createLink} >
                {loading ? <BeatLoader size={10} color="white"/> : "Create"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
};

export default CreateLink;
