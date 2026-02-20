"use client";

import { useState } from "react";
import { AZKAR } from "../data/azkarData";
import "./azkar.css";

const TABS = [
  {id:"morning",title:"☀️ أذكار الصباح"},
  {id:"evening",title:"🌙 أذكار المساء"},
  {id:"sleep",title:"😴 أذكار النوم"},
  {id:"afterPrayer",title:"🕌 بعد الصلاة"},
];

export default function AzkarPage(){

  const [active,setActive]=useState("morning");
  const [progress,setProgress]=useState<Record<string,number>>({});

  const list = AZKAR[active as keyof typeof AZKAR];

  function handleClick(i:number){

    const key = `${active}_${i}`;
    const max = list[i].count;
    const current = progress[key] || 0;

    if(current>=max) return;

    setProgress({
      ...progress,
      [key]:current+1
    });
  }

  return(
    <main className="azkar-page">

      <h1 className="title">📿 الأذكار اليومية</h1>

      {/* ⭐ التابات */}
      <div className="tabs">
        {TABS.map(t=>(
          <button
            key={t.id}
            className={`tab ${active===t.id?"active":""}`}
            onClick={()=>setActive(t.id)}
          >
            {t.title}
          </button>
        ))}
      </div>

      {/* ⭐ الأذكار */}
      <div className="azkar-list">

        {list.map((z,i)=>{

          const key=`${active}_${i}`;
          const current=progress[key]||0;
          const done=current>=z.count;

          return(
            <div
              key={i}
              className={`zikr-card ${done?"done":""}`}
              onClick={()=>handleClick(i)}
            >
              <p className="zikr-text">{z.text}</p>

              <div className="counter">
                {current} / {z.count}
              </div>
            </div>
          )
        })}

      </div>

    </main>
  )
}
