"use client";

import { addXP } from "./useXP";

/* =====================================
   ⭐ تجهيز المهام اليومية
=====================================*/
export function updateQuests(){

  if(typeof window==="undefined") return;

  const today = new Date().toISOString().split("T")[0];

  const saved = JSON.parse(localStorage.getItem("quests")||"{}");

  if(saved.date !== today){
    localStorage.setItem("quests",JSON.stringify({
      date:today,
      prayed:false,
      tasbih:false,
      dayComplete:false
    }));
  }
}

/* =====================================
   🕌 عند أول صلاة فقط
=====================================*/
export function questPrayed(){

  updateQuests();

  const q = JSON.parse(localStorage.getItem("quests")||"{}");

  if(q.prayed) return;

  q.prayed = true;

  addXP(40);

  localStorage.setItem("quests",JSON.stringify(q));

  window.dispatchEvent(new Event("xpUpdate"));
}

/* =====================================
   📿 تسبيح — يتحقق مرة واحدة فقط
=====================================*/
export function questTasbih(){

  updateQuests();

  const q = JSON.parse(localStorage.getItem("quests")||"{}");

  if(q.tasbih) return; // 🔥 يمنع التكرار

  const stats = JSON.parse(localStorage.getItem("stats")||"{}");

  if((stats.tasbih||0) >= 100){

    q.tasbih = true;

    addXP(25);

    localStorage.setItem("quests",JSON.stringify(q));

    window.dispatchEvent(new Event("xpUpdate"));
  }
}

/* =====================================
   🔥 يوم صلاة كامل (5 فروض)
=====================================*/
export function questFullDay(){

  updateQuests();

  const q = JSON.parse(localStorage.getItem("quests")||"{}");

  if(q.dayComplete) return;

  const stats =
    JSON.parse(localStorage.getItem("stats")||"{}");

  if((stats.prayed||0) >= 5){

    q.dayComplete = true;

    // ⭐ زيادة عدد الأيام المكتملة
    stats.fullDays = (stats.fullDays||0) + 1;

    addXP(80);

    localStorage.setItem("stats",JSON.stringify(stats));
    localStorage.setItem("quests",JSON.stringify(q));

    window.dispatchEvent(new Event("xpUpdate"));
  }
}

/* =====================================
   🔥 STREAK SYSTEM
=====================================*/
export function updateStreak(){

  const today = new Date().toISOString().split("T")[0];

  const streakData =
    JSON.parse(localStorage.getItem("streak")||"{}");

  if(streakData.last === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate()-1);

  const y = yesterday.toISOString().split("T")[0];

  if(streakData.last === y){
    streakData.count = (streakData.count||0)+1;
  }else{
    streakData.count = 1;
  }

  streakData.last = today;

  localStorage.setItem("streak",JSON.stringify(streakData));

  if(streakData.count===3) addXP(50);
  if(streakData.count===7) addXP(120);
}
