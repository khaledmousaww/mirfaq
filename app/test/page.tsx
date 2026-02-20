"use client";

import { addXP, getXP, getStats } from "../hooks/useXP";

export default function TestPage(){

  function reset(){
    localStorage.clear();
    alert("تم تصفير البيانات");
    location.reload();
  }

  return(
    <main style={{padding:40,textAlign:"center"}}>

      <h1>🧪 مركز اختبار مرفاق</h1>

      <p>XP الحالي: {getXP()}</p>

      <pre>
        {JSON.stringify(getStats(),null,2)}
      </pre>

      <div style={{display:"flex",gap:10,justifyContent:"center"}}>

        <button onClick={()=>addXP(50)}>
          +50 XP
        </button>

        <button onClick={()=>addXP(200)}>
          Test Level Up
        </button>

        <button onClick={reset}>
          ♻️ Reset Storage
        </button>

      </div>

    </main>
  )
}
