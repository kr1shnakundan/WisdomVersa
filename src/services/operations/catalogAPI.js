import toast from "react-hot-toast";
import React from 'react'
import { apiConnector } from '../apiconnector'
import { catalogData } from "../apis";
export const getCatalogPageData = async(categoryId)=>{
    const toastId = toast.loading(
        <div className='flex flex-col items-center justify-center gap-1'>
            <p>Loading...</p>
        </div>
    )
     let result = [];
  try{
    const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, 
    {categoryId: categoryId});

    if(!response?.data?.success){
      throw new Error(response?.data?.message);
    }
        
    console.log("REsponse in catalogpage data call :..... ",response)
    result = response?.data;

  }
  catch(error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    toast.error(error.message);
    result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;

}