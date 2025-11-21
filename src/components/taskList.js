function loadTasks() {
  getTasks((tasks) => {
    const container = document.getElementById("taskList");
    container.innerHTML = "";

    tasks.forEach((t) => {
      const div = document.createElement("div");
      div.className = "task";

      div.innerHTML = `
        <p><strong>${t.title}</strong></p>
        <p>${t.description}</p>
        <button onclick="completeTask(${t.id})">Completar</button>
        <button onclick="edit(${t.id})">Editar</button>
        <button onclick="deleteTask(${t.id}); loadTasks()">Eliminar</button>
      `;

      container.appendChild(div);
    });
  });
}

function completeTask(id) {
  navigator.vibrate(90);

  getTasks((tasks) => {
    const task = tasks.find((t) => t.id === id);
    task.completed = true;
    updateTaskDB(task);

    showNotification("Tarea completada", task.title);
    loadTasks();
  });
}

function edit(id) {
  window.location.href = `../views/editTask.html?id=${id}`;
}

document.addEventListener("DOMContentLoaded", loadTasks);
