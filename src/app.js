// Registrar Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}

// Cargar tareas al abrir la página
document.addEventListener("DOMContentLoaded", () => {
  initDB().then(() => {
    loadTasks();
  });
});