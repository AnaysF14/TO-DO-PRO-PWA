// Cargar y mostrar todas las tareas
async function loadTasks() {
  try {
    const tasks = await getAllTasks();
    const container = document.getElementById("taskList");
    container.innerHTML = "";

    if (tasks.length === 0) {
      container.innerHTML = "<p>No hay tareas. ¡Agrega una!</p>";
      return;
    }

    tasks.forEach((task) => {
      const div = document.createElement("div");
      div.className = "task";
      div.classList.toggle("completed", task.completed);

      const buttonsDiv = document.createElement("div");
      buttonsDiv.className = "buttons";

      // Botón Completar/Desmarcar
      const completeBtn = document.createElement("button");
      completeBtn.type = "button";
      completeBtn.textContent = task.completed ? "Desmarcar" : "Completar";
      completeBtn.onclick = () => toggleComplete(task.id);

      // Botón Editar
      const editBtn = document.createElement("button");
      editBtn.type = "button";
      editBtn.textContent = "Editar";
      editBtn.onclick = () => editTask(task.id);

      // Botón Eliminar
      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.textContent = "Eliminar";
      deleteBtn.onclick = () => removeTask(task.id);

      buttonsDiv.appendChild(completeBtn);
      buttonsDiv.appendChild(editBtn);
      buttonsDiv.appendChild(deleteBtn);

      div.innerHTML = `
        <p><strong>${task.title}</strong></p>
        <p>${task.description || "Sin descripción"}</p>
        <small>Creada: ${new Date(task.createdAt).toLocaleDateString()}</small>
      `;

      div.appendChild(buttonsDiv);
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Error al cargar tareas:", error);
  }
}

// Marcar tarea como completada
async function toggleComplete(taskId) {
  try {
    const task = await getTaskById(taskId);
    task.completed = !task.completed;
    await updateTask(taskId, { completed: task.completed });

    // Vibración y notificación
    if (navigator.vibrate) navigator.vibrate(90);
    if (task.completed) {
      showNotification("✓ Tarea completada", task.title);
    }

    loadTasks();
  } catch (error) {
    console.error("Error al completar tarea:", error);
  }
}

// Editar tarea
function editTask(taskId) {
  window.location.href = `./src/views/editTask.html?id=${taskId}`;
}

// Eliminar tarea
async function removeTask(taskId) {
  if (confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
    try {
      await deleteTask(taskId);
      showNotification("Tarea eliminada", "Se eliminó correctamente");
      loadTasks();
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      alert("Error al eliminar la tarea");
    }
  }
}