"use client";

import { useEffect, useState } from "react";
import { getXP, getStats } from "../hooks/useXP";
import "./achievements.css";

/* =========================================
   👑 MEDALS SYSTEM
========================================= */

const MEDALS = [
  { id:"rafiq", name:"🥉 وسام الرفيق", level:2 },
  { id:"thabit", name:"🥈 وسام الثبات", level:4 },
  { id:"hema", name:"🥇 وسام الهمة", level:6 },
  { id:"noor", name:"🌙 وسام النور", level:8 },
  { id:"legend", name:"👑 وسام مرفاق الأسطوري", level:10 },
];

/* =========================================
   🎖️ TITLES
========================================= */
function getTitle(level:number){
  if(level>=10) return "👑 الأسطورة";
  if(level>=8) return "🌙 صاحب النور";
  if(level>=6) return "⚔️ المجتهد";
  if(level>=4) return "🕌 ثابت";
  if(level>=2) return "🌱 السالك";
  return "✨ مبتدئ";
}

/* =========================================
   ⭐ LEVEL SYSTEM (متوافق مع Stats Page)
========================================= */
function calcLevel(xp:number){
  const LEVELS = [150,300,450,650,900,1200,1500,1800,2100,2500];
  let level = 1;

  LEVELS.forEach((l,i)=>{
    if(xp>=l) level=i+1;
  });

  return level;
}

export default function AchievementsPage(){

  const [xp,setXP]=useState(0);
  const [stats,setStats]=useState({
    tasbih:0,
    fullDays:0
  });
  const [level,setLevel]=useState(1);

  function refresh(){
    setXP(getXP());
    setStats(getStats());
  }

  useEffect(()=>{
    refresh();
    window.addEventListener("xpUpdate",refresh);
    return ()=>window.removeEventListener("xpUpdate",refresh);
  },[]);

  useEffect(()=>{
    setLevel(calcLevel(xp));
  },[xp]);

  const title = getTitle(level);

  const heroMedal =
    MEDALS.filter(m=>level>=m.level).slice(-1)[0];

  const nextXP =
    [150,300,450,650,900,1200,1500,1800,2100,2500][level] || 2500;

  const prevXP =
    [0,150,300,450,650,900,1200,1500,1800,2100][level-1] || 0;

  const progress =
    ((xp-prevXP)/(nextXP-prevXP))*100;

  return(
    <main className="achievements-page">

      {/* ================= PLAYER CARD ================= */}
      <div className="player-card glow-soft">

        <h1>🏆 سجل الإنجازات</h1>
        <h2>{title}</h2>

        <div className="player-stats">
          <span>Level {level}</span>
          <span>{xp} XP</span>
        </div>

        <div className="xp-bar">
          <div
            className="xp-fill"
            style={{width:`${Math.min(progress,100)}%`}}
          />
        </div>

      </div>

      {/* ================= HERO MEDAL ================= */}
      {heroMedal && (
        <div className="hero-medal glow-strong">
          <h2>{heroMedal.name}</h2>
          <p>وسامك الحالي</p>
        </div>
      )}

      {/* ================= LOG BOX ================= */}
      <div className="log-box">
        <h3>📜 إحصائياتك</h3>

        <ul>
          <li>🕌 أيام مكتملة: {stats.fullDays}</li>
          <li>📿 مجموع التسبيح: {stats.tasbih}</li>
          <li>⭐ مجموع XP: {xp}</li>
        </ul>
      </div>

      {/* ================= MEDALS GRID ================= */}
      <div className="medals-grid">

        {MEDALS.map(m=>{
          const unlocked = level>=m.level;

          return(
            <div
              key={m.id}
              className={`medal-card ${unlocked?"unlocked":"locked"}`}
            >
              <h3>{unlocked ? m.name : "🔒 وسام مخفي"}</h3>
              <p>
                {unlocked
                  ? "تم فتح الوسام"
                  : `يفتح عند المستوى ${m.level}`}
              </p>
            </div>
          )
        })}

      </div>

    </main>
  );
}
