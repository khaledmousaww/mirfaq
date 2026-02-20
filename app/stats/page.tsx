"use client";

import { useEffect, useState } from "react";
import { getXP, getStats } from "../hooks/useXP";
import "./stats.css";

/* ⭐ مستويات RPG PRO ULTRA */
const LEVELS = [
  { level:1, xp:150, days:1, tasbih:99 },
  { level:2, xp:300, days:2, tasbih:150 },
  { level:3, xp:450, days:4, tasbih:250 },
  { level:4, xp:650, days:6, tasbih:350 },
  { level:5, xp:900, days:9, tasbih:500 },
  { level:6, xp:1200, days:12, tasbih:650 },
  { level:7, xp:1500, days:16, tasbih:800 },
  { level:8, xp:1800, days:20, tasbih:1000 },
  { level:9, xp:2100, days:25, tasbih:1200 },
  { level:10,xp:2500, days:30, tasbih:1500 },
];

function getBadge(level:number){
  if(level===3) return "🥉 وسام المجاهد";
  if(level===6) return "🥈 وسام الثبات";
  if(level===9) return "🥇 وسام النور";
  if(level===10) return "💎 وسام الأسطورة";
  return null;
}

export default function StatsPage(){

  const [xp,setXP]=useState(0);
  const [stats,setStats]=useState({
    tasbih:0,
    fullDays:0,
  });

  const [level,setLevel]=useState(1);

  function refresh(){
    const s = getStats();
    setXP(getXP());
    setStats({
      tasbih: s.tasbih || 0,
      fullDays: s.fullDays || 0,
    });
  }

  useEffect(()=>{
    refresh();
    window.addEventListener("xpUpdate",refresh);
    return ()=>window.removeEventListener("xpUpdate",refresh);
  },[]);

  /* ⭐ حساب المستوى الحقيقي */
  useEffect(()=>{
    let currentLevel = 1;

    for(const l of LEVELS){
      if(
        xp >= l.xp &&
        stats.fullDays >= l.days &&
        stats.tasbih >= l.tasbih
      ){
        currentLevel = l.level;
      }
    }

    setLevel(currentLevel);

  },[xp,stats]);

  /* ⭐ Progress bar */
  const next = LEVELS.find(l=>l.level===level+1);

  const prevXP =
    LEVELS.find(l=>l.level===level)?.xp || 0;

  const nextXP = next?.xp || prevXP;

  const progress =
    nextXP===prevXP
      ? 100
      : ((xp-prevXP)/(nextXP-prevXP))*100;

  /* ⭐ Quests حقيقية */
  const QUESTS = [
    {
      id:1,
      title:"🕌 أتمّ يوم صلاة كامل",
      done: stats.fullDays >= 1,
    },
    {
      id:2,
      title:"📿 سبّح 100 مرة",
      done: stats.tasbih >= 100,
    },
    {
      id:3,
      title:"⚡ اجمع 150 XP",
      done: xp >= 150,
    },
  ];

  return(
    <main className="stats-page">

 <h1 className="stats-title">⚔️ نظام الأحصائيات </h1>
      {/* ⭐ اللاعب */}
      <div className="player-box">
        <h2>Level {level}</h2>
        <p>{xp} XP</p>

        <div className="xp-bar">
          <div
            className="xp-fill"
            style={{width:`${Math.min(progress,100)}%`}}
          />
        </div>

        <div className="player-stats">
          <span>📅 أيام مكتملة: {stats.fullDays}</span>
          <span>📿 تسبيح: {stats.tasbih}</span>
        </div>
      </div>

      {/* ⭐ Quests */}
      <div className="quests-box">
        <h3>🎯 المهام</h3>
        {QUESTS.map(q=>(
          <div key={q.id} className={`quest ${q.done?"done":""}`}>
            {q.done?"✅":"⬜"} {q.title}
          </div>
        ))}
      </div>

      {/* ⭐ المستويات */}
      <div className="levels-container">
        {LEVELS.map(l=>{

          const unlocked =
            xp>=l.xp &&
            stats.fullDays>=l.days &&
            stats.tasbih>=l.tasbih;

          const badge = getBadge(l.level);

          return(
            <div
              key={l.level}
              className={`level-card ${unlocked?"unlocked":""}`}
            >

              <div className="level-head">
                <h3>المستوى {l.level}</h3>
                <span>{l.xp} XP</span>
              </div>

              <ul className="steps">
                <li>📅 {l.days} أيام صلاة كاملة</li>
                <li>📿 {l.tasbih} تسبيحة</li>
              </ul>

              {badge && <div className="badge-box">{badge}</div>}
              {unlocked && <div className="done">✔ تم الإنجاز</div>}

            </div>
          )
        })}
      </div>

    </main>
  )
}
