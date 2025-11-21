const CACHE_NAME = "todo-pro-cache-v1";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/src/styles/main.css",
  "/src/app.js",
  "/src/components/db.js",
  "/src/components/api.js",
  "/src/components/taskList.js",
  "/src/components/taskForm.js",
  "/src/components/notifications.js",
  "/src/views/home.html",
  "/src/views/addTask.html",
  "/src/views/editTask.html",
  "/src/assets/icons/icon-192.png",
  "/src/assets/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
