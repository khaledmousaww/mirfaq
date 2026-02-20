"use client";
import { useEffect, useState } from "react";

export default function XPPopup(){

  const [show,setShow]=useState(false);

  useEffect(()=>{

    function handler(){
      setShow(true);
      setTimeout(()=>setShow(false),1200);
    }

    window.addEventListener("xpUpdate",handler);

    return ()=>window.removeEventListener("xpUpdate",handler);

  },[]);

  if(!show) return null;

  return(
    <div className="xp-popup">
      ⭐ +XP
    </div>
  )
}



