import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [longLink, setLongLink] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) =>{
    e.preventDefault();
    // console.log("Submitted");
    if(longLink) navigate(`/auth?createNew=${longLink}`);

  }
  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        Wanna make a Shorter Link?
        <br />
        Try <span style={{ color: "#36d7b7" }}>Shawtyy</span> Now!
      </h2>
      <form
        action=""
        className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2"
        onSubmit={handleSubmit}
      >
        <Input
          type="url"
          placeholder="Paste your link here"
          value={longLink}
          className="h-full flex-1 py-4 px-4"
          onChange={(e) => {
            setLongLink(e.target.value);
          }}
        />
        <Button className="h-full">Shorten</Button>
      </form>
      <img src="banner.jpg" alt="banner" className=" w-full my-11 md:px-11" />
    </div>
  );
};

export default Landing;
