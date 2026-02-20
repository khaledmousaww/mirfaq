"use client";

/* ========================================
   🔥 نظام XP مركزي + Event Lock
======================================== */

let LOCKS: Record<string, number> = {};

/* ⭐ قفل يمنع التكرار */
function isLocked(key: string, delay = 400) {
  const now = Date.now();
  const last = LOCKS[key] || 0;

  if (now - last < delay) return true;

  LOCKS[key] = now;
  return false;
}

export function getXP() {
  if (typeof window === "undefined") return 0;
  return Number(localStorage.getItem("xp") || 0);
}

export function getStats() {
  if (typeof window === "undefined")
    return { tasbih: 0, prayed: 0, fullDays: 0 };

  return JSON.parse(
    localStorage.getItem("stats") ||
      '{"tasbih":0,"prayed":0,"fullDays":0}'
  );
}

/* ================= XP ================= */

export function addXP(amount: number) {
  if (typeof window === "undefined") return;

  // ⭐ منع تكرار XP السريع
  if (isLocked("xp")) return;

  const current = getXP();
  localStorage.setItem("xp", String(current + amount));

  window.dispatchEvent(new Event("xpUpdate"));
}

/* ================= PRAYED ================= */

export function addPrayed() {
  if (typeof window === "undefined") return;

  if (isLocked("prayed")) return;

  const stats = getStats();
  stats.prayed = (stats.prayed || 0) + 1;

  localStorage.setItem("stats", JSON.stringify(stats));
}

/* ================= TASBIH ================= */

export function addTasbih() {
  if (typeof window === "undefined") return;

  if (isLocked("tasbih")) return;

  const stats = getStats();
  stats.tasbih = (stats.tasbih || 0) + 1;

  localStorage.setItem("stats", JSON.stringify(stats));
}

/* ================= BADGES ================= */

export function unlockBadge(id: string) {
  if (typeof window === "undefined") return;

  const badges = JSON.parse(localStorage.getItem("badges") || "[]");

  if (!badges.includes(id)) {
    badges.push(id);
    localStorage.setItem("badges", JSON.stringify(badges));
  }
}

/* ================= HOOK ================= */

export function useXP() {
  return {
    addXP,
    addPrayed,
    addTasbih,
    unlockBadge,
    getXP,
    getStats,
  };
}
