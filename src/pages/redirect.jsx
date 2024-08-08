import { createClick } from '@/db/apiClicks';
import { getLongUrl } from '@/db/apiUrls';
import useFetch from '@/hooks/use-fetch';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';


const Redirect = () => {
  const {id} = useParams();
  const {loading, data : url, fn : fnGetLongUrl} = useFetch(getLongUrl,id);

  const {loading : loadingCreateClick , error, fn : fnCreateClick} = useFetch(createClick,{
    id: url?.id,
    original_url: url?.original_url
  })

  useEffect(()=>{
    fnGetLongUrl();
  },[])

  useEffect(()=>{
    if(!loading && url){
      fnCreateClick();
    }
  },[loading])

  if(loading || loadingCreateClick){
    return(
      <>
      <BarLoader width={"100%"} color="#36d7b7" />
      <br />
      Redirecting...
      </>
    )
  }

  return null;
}

export default Redirect
