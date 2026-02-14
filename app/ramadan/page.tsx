"use client";
import RamadanNavbar from "../components/RamadanNavbar";
import RamadanFooter from "../components/RamadanFooter";

import "./ramadan.css";

type Day = {
  day: number;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
};

const DATA: Day[] = [
{day:1,fajr:"05:06",sunrise:"06:33",dhuhr:"12:09",asr:"15:20",maghrib:"17:45",isha:"19:03"},
{day:2,fajr:"05:05",sunrise:"06:32",dhuhr:"12:09",asr:"15:21",maghrib:"17:46",isha:"19:04"},
{day:3,fajr:"05:04",sunrise:"06:31",dhuhr:"12:09",asr:"15:21",maghrib:"17:47",isha:"19:04"},
{day:4,fajr:"05:03",sunrise:"06:30",dhuhr:"12:09",asr:"15:22",maghrib:"17:47",isha:"19:05"},
{day:5,fajr:"05:03",sunrise:"06:29",dhuhr:"12:09",asr:"15:22",maghrib:"17:48",isha:"19:06"},
{day:6,fajr:"05:02",sunrise:"06:29",dhuhr:"12:08",asr:"15:22",maghrib:"17:49",isha:"19:06"},
{day:7,fajr:"05:01",sunrise:"06:28",dhuhr:"12:08",asr:"15:23",maghrib:"17:50",isha:"19:07"},
{day:8,fajr:"05:00",sunrise:"06:26",dhuhr:"12:08",asr:"15:23",maghrib:"17:50",isha:"19:08"},
{day:9,fajr:"04:59",sunrise:"06:25",dhuhr:"12:08",asr:"15:24",maghrib:"17:51",isha:"19:08"},
{day:10,fajr:"04:58",sunrise:"06:24",dhuhr:"12:08",asr:"15:24",maghrib:"17:52",isha:"19:09"},
{day:11,fajr:"04:57",sunrise:"06:23",dhuhr:"12:08",asr:"15:25",maghrib:"17:52",isha:"19:10"},
{day:12,fajr:"04:56",sunrise:"06:22",dhuhr:"12:08",asr:"15:25",maghrib:"17:53",isha:"19:10"},
{day:13,fajr:"04:55",sunrise:"06:21",dhuhr:"12:07",asr:"15:25",maghrib:"17:54",isha:"19:11"},
{day:14,fajr:"04:54",sunrise:"06:20",dhuhr:"12:07",asr:"15:26",maghrib:"17:55",isha:"19:12"},
{day:15,fajr:"04:53",sunrise:"06:19",dhuhr:"12:07",asr:"15:26",maghrib:"17:55",isha:"19:12"},
{day:16,fajr:"04:52",sunrise:"06:18",dhuhr:"12:07",asr:"15:26",maghrib:"17:56",isha:"19:13"},
{day:17,fajr:"04:50",sunrise:"06:17",dhuhr:"12:06",asr:"15:27",maghrib:"17:57",isha:"19:14"},
{day:18,fajr:"04:49",sunrise:"06:16",dhuhr:"12:06",asr:"15:27",maghrib:"17:57",isha:"19:14"},
{day:19,fajr:"04:48",sunrise:"06:15",dhuhr:"12:06",asr:"15:27",maghrib:"17:58",isha:"19:15"},
{day:20,fajr:"04:47",sunrise:"06:13",dhuhr:"12:06",asr:"15:27",maghrib:"17:59",isha:"19:16"},
{day:21,fajr:"04:46",sunrise:"06:12",dhuhr:"12:06",asr:"15:28",maghrib:"17:59",isha:"19:16"},
{day:22,fajr:"04:45",sunrise:"06:11",dhuhr:"12:05",asr:"15:28",maghrib:"18:00",isha:"19:17"},
{day:23,fajr:"04:43",sunrise:"06:10",dhuhr:"12:05",asr:"15:28",maghrib:"18:01",isha:"19:18"},
{day:24,fajr:"04:42",sunrise:"06:09",dhuhr:"12:05",asr:"15:28",maghrib:"18:01",isha:"19:18"},
{day:25,fajr:"04:41",sunrise:"06:08",dhuhr:"12:04",asr:"15:29",maghrib:"18:02",isha:"19:19"},
{day:26,fajr:"04:40",sunrise:"06:06",dhuhr:"12:04",asr:"15:29",maghrib:"18:03",isha:"19:20"},
{day:27,fajr:"04:39",sunrise:"06:05",dhuhr:"12:04",asr:"15:29",maghrib:"18:03",isha:"19:20"},
{day:28,fajr:"04:37",sunrise:"06:04",dhuhr:"12:04",asr:"15:29",maghrib:"18:04",isha:"19:21"},
{day:29,fajr:"04:36",sunrise:"06:03",dhuhr:"12:03",asr:"15:29",maghrib:"18:04",isha:"19:22"},
{day:30,fajr:"04:35",sunrise:"06:02",dhuhr:"12:03",asr:"15:29",maghrib:"18:05",isha:"19:22"},
];

/* 🔥 تحويل الوقت من 24 ساعة إلى 12 ساعة مع AM / PM */
function format12(time: string) {
  const [h, m] = time.split(":").map(Number);

  const ampm = h >= 12 ? "PM" : "AM";

  // تحويل 24 → 12
  let hour12 = h % 12;
  if (hour12 === 0) hour12 = 12;

  return `${hour12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

/* 🔥 حساب السحور = قبل الفجر بساعة */
function getSuhur(fajr:string){
  let [h,m]=fajr.split(":").map(Number);
  h = h-1;
  if(h<0) h=23;
  return `${h}:${m.toString().padStart(2,"0")}`;
}

export default function RamadanPage(){
  return(
    <main className="ramadan-page">

      {/* ⭐ مكان الفوانيس — حط صورك هنا */}
      <img src="/f.png" className="lantern lantern-left"/>
      <img src="/f.png" className="lantern lantern-right"/>
      
    


<RamadanNavbar />


      <div className="moon"/>
      <div className="stars"/>

      <h1 className="title">إمساكية شهر رمضان 2026</h1>
      <h3 className='title'>(كل  عام وحضراتكم بخير)</h3>

      <div className="cards">
        {DATA.map(d=>(
          <div key={d.day} className="ramadan-card">

            <div className="card-head">
              <h3>{d.day} رمضان</h3>
            </div>

            <div className="times">
              <p>السحور: {format12(getSuhur(d.fajr))}</p>
              <p>الفجر: {format12(d.fajr)}</p>
              <p>الشروق: {format12(d.sunrise)}</p>
              <p>الظهر: {format12(d.dhuhr)}</p>
              <p>العصر: {format12(d.asr)}</p>
              <p>المغرب: {format12(d.maghrib)}</p>
              <p>العشاء: {format12(d.isha)}</p>
            </div>

          </div>
        ))}
      </div>

      {/* 🔥 سبونسر اخر الصفحة */}
      <div className="sponsor">
        <p>مقدمة من</p>
        <strong>El Khaled Tech</strong>
      </div>
<RamadanFooter />

    </main>
  )
}
