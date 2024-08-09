import DeviceStats from "@/components/device-stats";
import LocationStats from "@/components/location-stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UrlState } from "@/context";
import { getClicksForSingleUrl } from "@/db/apiClicks";
import { deleteUrl, getSingleUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import DeleteLinkDialog from "@/components/deleteLinkDialog";

const Link = () => {
  const { id } = useParams();
  const { user } = UrlState();

  const navigate = useNavigate();

  const {
    loading,
    error,
    data: url,
    fn: fnGetSingleUrl,
  } = useFetch(getSingleUrl, { id, user_id: user?.id });
  const {
    loading: loadingStats,
    error: errorStats,
    data: stats,
    fn: fnGetStats,
  } = useFetch(getClicksForSingleUrl, id);
  const {
    loading: loadingDelete,
    error: errorDelete,
    fn: fnDelete,
  } = useFetch(deleteUrl, id);

  useEffect(() => {
    fnGetSingleUrl();
    fnGetStats();
  }, []);

  if (error) navigate("/dashboard");

  let link = "";

  if (url) {
    link = url?.custom_url ? url?.custom_url : url?.short_url;
  }

  const downloadImg = async () => {
    const response = await fetch(url.qr);
    const blob = await response.blob();
    const urlObject = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = urlObject;
    a.download = `${url?.title}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(urlObject);
  };

  const handleDelete = async () => {
    await fnDelete();
    navigate("/dashboard");
  };

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}

      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5 w-full">
          <span className="text-4xl sm:text-6xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <a
            href={`${import.meta.env.VITE_REDIRECT_URL}/${link}`}
            target="_blank"
            className="text-xl sm:text-3xl p-1 mr-1 text-blue-400 font-bold hover:underline cursor-pointer"
          >
            {`${import.meta.env.VITE_REDIRECT_URL}/${link}`}
          </a>

          <a
            href={url?.original_url}
            target="_blank"
            className="flex items-center  gap-1 hover:underline cursor-pointer"
          >
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>
          <span className="flex items-end  font-extralight text-xs sm:text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>

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

            <Button variant="ghost" className="w-2">
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <DeleteLinkDialog handleDelete={handleDelete} />
              )}
            </Button>
          </div>
          <img
            src={url?.qr}
            alt="qr"
            className=" sm:w-[300px] md:w-full self-center sm:self-start ring ring-blue-400 p-1 object-contain"
          />
        </div>

        <Card className="w-full sm:w-3/5">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-4xl font-bold">
              Stats
            </CardTitle>
          </CardHeader>
          {stats && stats?.length ? (
            <CardContent className="flex flex-col gap-5">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats?.length}</p>
                </CardContent>
              </Card>

              <Card>
                <LocationStats stats={stats} />
              </Card>

              <Card>
                <DeviceStats statsData={stats} />
              </Card>
            </CardContent>
          ) : (
            <CardContent>
              <p>
                {loadingStats === false
                  ? "No Statistics yet"
                  : "Loading Statistics"}
              </p>
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default Link;
