// Mostrar notificación con Notification API
function showNotification(title, options = {}) {
  if ("Notification" in window) {
    // Pedir permiso si no lo tiene
    if (Notification.permission === "granted") {
      new Notification(title, {
        icon: "./src/assets/icons/icon-192.png",
        ...options
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, {
            icon: "./src/assets/icons/icon-192.png",
            ...options
          });
        }
      });
    }
  }
}