const DB_NAME = 'ToDoProDB';
const DB_VERSION = 1;
const STORE_NAME = 'tasks';

let db;

function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('completed', 'completed', { unique: false });
        objectStore.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };

    request.onsuccess = () => {
      db = request.result;
      console.log('IndexedDB inicializada');
      resolve(db);
    };

    request.onerror = () => {
      console.error('Error en IndexedDB:', request.error);
      reject(request.error);
    };
  });
}

function addTask(taskData) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.add(taskData);

    request.onsuccess = () => {
      console.log('Tarea guardada con ID:', request.result);
      resolve(request.result);
    };

    request.onerror = () => {
      console.error('Error al agregar tarea:', request.error);
      reject(request.error);
    };
  });
}

function getAllTasks() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      console.error('Error al obtener tareas:', request.error);
      reject(request.error);
    };
  });
}

function updateTask(taskId, updatedData) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.get(taskId);

    request.onsuccess = () => {
      const task = request.result;
      const updatedTask = { ...task, ...updatedData, updatedAt: new Date().toISOString() };
      const updateRequest = objectStore.put(updatedTask);

      updateRequest.onsuccess = () => {
        resolve(updatedTask);
      };

      updateRequest.onerror = () => {
        reject(updateRequest.error);
      };
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

function deleteTask(taskId) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.delete(taskId);

    request.onsuccess = () => {
      console.log('Tarea eliminada:', taskId);
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

function getTaskById(taskId) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const objectStore = transaction.objectStore(STORE_NAME);
    const request = objectStore.get(taskId);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

initDB().catch(error => console.error('Error fatal:', error));