"use client";

import { useEffect, useState } from "react";

export default function TopBar() {

  const [time,setTime] = useState("");
  const [date,setDate] = useState("");

  useEffect(()=>{

    function update(){
      const now = new Date();

      setTime(
        now.toLocaleTimeString("ar-EG",{
          hour:"2-digit",
          minute:"2-digit",
          second:"2-digit",
          hour12:true
        })
      );

      setDate(
        now.toLocaleDateString("ar-EG",{
          weekday:"long",
          day:"numeric",
          month:"long",
          year:"numeric"
        })
      );
    }

    update();

    const interval = setInterval(update,1000);
    return ()=>clearInterval(interval);

  },[]);

  // ✅ حطينا useEffect التاني جوه الكمبوننت
  useEffect(()=>{

    function warn(){
      alert("⏳ الصلاة بعد دقيقة");
    }

    window.addEventListener("adhanWarning",warn);
    return ()=>window.removeEventListener("adhanWarning",warn);

  },[]);

  return(
    <header className="top-bar">
      <div className="header-left">
        <div className="date-time">
          {time && (
            <>
              <p className="current-date">{date}</p>
              <p className="current-time">{time}</p>
            </>
          )}
        </div>
      </div> 
    </header>
  );
}