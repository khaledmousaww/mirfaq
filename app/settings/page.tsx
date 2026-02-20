"use client";

import { useEffect, useState } from "react";
import { getXP } from "../hooks/useXP";
import "./settings.css";

type Settings={
  nightMode:boolean;
  rpg:boolean;
  lanterns:boolean;
  stars:boolean;
  moon:boolean;
  xpPopup:boolean;
  adhanSound:boolean;
  vibration:boolean;
};

const DEFAULT:Settings={
  nightMode:false,
  rpg:true,
  lanterns:true,
  stars:true,
  moon:true,
  xpPopup:true,
  adhanSound:false,
  vibration:true
};

export default function SettingsPage(){

  const [data,setData]=useState<Settings>(DEFAULT);
  const [xp,setXP]=useState(0);
  const [ready,setReady]=useState(false);

  useEffect(()=>{

    const saved=localStorage.getItem("settings_pro");

    if(saved){
      setData(JSON.parse(saved));
    }

    setXP(getXP());
    setReady(true);

  },[]);

  function update(key:keyof Settings){

    const updated={
      ...data,
      [key]:!data[key]
    };

    setData(updated);
    localStorage.setItem("settings_pro",JSON.stringify(updated));

    if(key==="nightMode"){
      document.body.classList.toggle("dark-mode",!data.nightMode);
    }
  }

  if(!ready) return null;

  const level=Math.floor(xp/150)+1;

  return(
    <main className="settings-ultra">

      <h1>⚙️ مركز التحكم — مرفاق</h1>

      <div className="player-box">
        Level {level} — {xp} XP
      </div>

      {/* ===== تجربة المستخدم ===== */}
      <section className="card">
        <h2>🎮 تجربة المستخدم</h2>
        <Item title="صوت الأذان" active={data.adhanSound} onClick={()=>update("adhanSound")}/>
        <Item title="اهتزاز عند الضغط" active={data.vibration} onClick={()=>update("vibration")}/>
        <Item title="XP Popup" active={data.xpPopup} onClick={()=>update("xpPopup")}/>
      </section>

      {/* ===== رمضان ===== */}
      <section className="card">
        <h2>🌙 زينة رمضان</h2>
        <Item title="الفوانيس" active={data.lanterns} onClick={()=>update("lanterns")}/>
        <Item title="النجوم الليلية" active={data.stars} onClick={()=>update("stars")}/>
        <Item title="الهلال الذهبي" active={data.moon} onClick={()=>update("moon")}/>
      </section>

      {/* ===== النظام ===== */}
      <section className="card">
        <h2>⚔️ نظام الإنجازات</h2>
        <Item title="تشغيل RPG" active={data.rpg} onClick={()=>update("rpg")}/>
      </section>

      {/* ===== المظهر ===== */}
      <section className="card">
        <h2>🎨 المظهر</h2>
        <Item title="الوضع الليلي" active={data.nightMode} onClick={()=>update("nightMode")}/>
      </section>

      {/* ===== Advanced ===== */}
      <section className="card danger">
        <h2>🧨 إعادة ضبط</h2>

        <button onClick={()=>{localStorage.clear();location.reload();}}>
          إعادة ضبط التطبيق بالكامل
        </button>

      </section>

    </main>
  );
}

function Item({title,active,onClick}:{title:string;active:boolean;onClick:()=>void}){

  return(
    <div className="setting-item" onClick={onClick}>
      <span>{title}</span>
      <div className={`toggle ${active?"on":""}`}><span/></div>
    </div>
  );
}
