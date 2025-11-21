let db;

const request = indexedDB.open("todoDB", 1);

request.onupgradeneeded = (event) => {
  db = event.target.result;
  const store = db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
  store.createIndex("completed", "completed", { unique: false });
};

request.onsuccess = (event) => {
  db = event.target.result;
};

function addTask(task) {
  const tx = db.transaction("tasks", "readwrite");
  tx.objectStore("tasks").add(task);
}

function getTasks(callback) {
  const tx = db.transaction("tasks", "readonly");
  const store = tx.objectStore("tasks");
  const tasks = [];

  store.openCursor().onsuccess = function (event) {
    const cursor = event.target.result;
    if (cursor) {
      tasks.push(cursor.value);
      cursor.continue();
    } else {
      callback(tasks);
    }
  };
}

function updateTaskDB(task) {
  const tx = db.transaction("tasks", "readwrite");
  tx.objectStore("tasks").put(task);
}

function deleteTask(id) {
  const tx = db.transaction("tasks", "readwrite");
  tx.objectStore("tasks").delete(id);
}
