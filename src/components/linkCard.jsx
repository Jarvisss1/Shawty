import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Download, Trash } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { deleteUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";
import DeleteLinkDialog from "./deleteLinkDialog";

const LinkCard = ({ url, fetchUrls }) => {
  const downloadImg = async () => {
    const response = await fetch(url.qr);
    const blob = await response.blob();
    const urlObject = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlObject;
    a.download = `${url?.title}.png`; // you can change the file name here
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(urlObject);
  };

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url?.id);

  const handleDelete = async () => {
    await fnDelete();
    await fetchUrls();
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
      <img
        src={url.qr}
        alt="QR"
        className="h-32 object-contain ring ring-blue-500 self-center md:self-start"
      />
      <Link to={`/link/${url.id}`} className="flex flex-col flex-1 min-w-0">
        <span className="text-3xl font-bold hover:underline cursor-pointer">
          {url.title}
        </span>
        <span className="text-2xl text-blue-400 font-medium hover:underline cursor-pointer truncate">
          {import.meta.env.VITE_REDIRECT_URL}/
          {url?.custom_url ? url?.custom_url : url?.short_url}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap">
          {url.original_url}
        </span>
        <span className="flex items-end text-gray-400 font-light text-sm flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>

      <div className="flex gap-2">
        <Button variant="ghost">
          <Copy
            onClick={() => {
              navigator.clipboard.writeText(
                `${import.meta.env.VITE_REDIRECT_URL}/${
                  url?.custom_url ? url?.custom_url : url?.short_url
                }`
              );
            }}
          />
        </Button>

        <Button variant="ghost">
          <Download onClick={downloadImg} />
        </Button>

        <Button variant="ghost">
          {loadingDelete ? (
            <BeatLoader size={5} color="white" />
          ) : (
            <DeleteLinkDialog handleDelete={handleDelete} />
          )}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
