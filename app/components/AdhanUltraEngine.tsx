"use client";

import { useEffect, useRef } from "react";

/* ===========================================
        🕌 ULTRA ADHAN ENGINE (MANUAL MODE)
=========================================== */

type Settings = {
  volume:number;
  preAdhan:number;
  prayers:{
    [key:string]:{
      enabled:boolean;
      sound:string;
    }
  }
};

const DEFAULT_SETTINGS:Settings = {
  volume:0.8,
  preAdhan:5,
  prayers:{
    fajr:{enabled:true,sound:"makkah"},
    dhuhr:{enabled:true,sound:"madinah"},
    asr:{enabled:true,sound:"makkah"},
    maghrib:{enabled:true,sound:"madinah"},
    isha:{enabled:true,sound:"makkah"},
  }
};

export default function AdhanUltraEngine(){

  const audioRef = useRef<HTMLAudioElement|null>(null);

  function getTimes(){

    const saved =
      JSON.parse(localStorage.getItem("manualPrayerTimes")||"null");

    if(saved) return saved;

    return {
      fajr:"05:00",
      dhuhr:"12:00",
      asr:"15:00",
      maghrib:"18:00",
      isha:"19:30"
    };
  }

  function play(sound:string){

    const settings:Settings =
      JSON.parse(localStorage.getItem("adhanSettings")||"null")
      || DEFAULT_SETTINGS;

    if(audioRef.current){
      audioRef.current.pause();
    }

    const audio = new Audio(`/adhan/${sound}.mp3`);
    audio.volume = settings.volume ?? 0.8;
    audio.play().catch(()=>{});

    audioRef.current = audio;
  }

  function checkAdhan(){

    const times = getTimes();

    const settings:Settings =
      JSON.parse(localStorage.getItem("adhanSettings")||"null")
      || DEFAULT_SETTINGS;

    const now = new Date();

    const hh = now.getHours().toString().padStart(2,"0");
    const mm = now.getMinutes().toString().padStart(2,"0");

    const current = `${hh}:${mm}`;

    Object.entries(times).forEach(([name,time]:any)=>{

      const prayerSettings = settings.prayers[name];
      if(!prayerSettings?.enabled) return;

      if(current===time){
        play(prayerSettings.sound);
      }

      const [h,m]=time.split(":").map(Number);

      const pre = new Date();
      pre.setHours(h,m-settings.preAdhan,0,0);

      const preHH = pre.getHours().toString().padStart(2,"0");
      const preMM = pre.getMinutes().toString().padStart(2,"0");

      if(current===`${preHH}:${preMM}`){
        new Notification("اقترب موعد الصلاة 🕌");
      }

    });
  }

  useEffect(()=>{

    const loop = setInterval(()=>{
      checkAdhan();
    },15000);

    return ()=>clearInterval(loop);

  },[]);

  return null;
}