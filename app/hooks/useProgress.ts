export function getProgress(){
  return JSON.parse(localStorage.getItem("playerProgress")||"{}");
}

export function setProgress(data:any){
  localStorage.setItem("playerProgress",JSON.stringify(data));
  window.dispatchEvent(new Event("xpUpdate"));
}
