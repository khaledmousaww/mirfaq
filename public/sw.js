self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("marfaq-cache").then((cache) => {
      return cache.addAll(["/"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});



const CACHE_NAME = "ramadan-cache-v1";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/",
        "/ramadan",
        "/lantern1.png",
        "/lantern2.png",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      return res || fetch(event.request);
    })
  );
});

self.addEventListener("push", function(e){

  const data = e.data?.json() || {};

  self.registration.showNotification("مرفاق",{
    body: data.body || "موعد الصلاة الآن",
    icon:"/icon-192.png"
  });

});
