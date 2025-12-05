let taskId = null;

// Obtener ID de la URL
const params = new URLSearchParams(window.location.search);
taskId = parseInt(params.get("id"));

// Cargar datos de la tarea
async function loadTaskData() {
  if (!taskId) {
    alert("Error: No se especificó tarea");
    window.location.href = "../../index.html";
    return;
  }

  try {
    const task = await getTaskById(taskId);
    if (!task) {
      alert("Tarea no encontrada");
      window.location.href = "../../index.html";
      return;
    }

    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description || "";
  } catch (error) {
    console.error("Error al cargar tarea:", error);
    alert("Error al cargar la tarea");
  }
}

// Guardar cambios
document.getElementById("editForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!title) {
    alert("El título es obligatorio");
    return;
  }

  try {
    await updateTask(taskId, { title, description });
    alert("Tarea actualizada");

    setTimeout(() => {
      window.location.href = "../../index.html";
    }, 1000);
  } catch (error) {
    console.error("Error:", error);
    alert("Error al actualizar la tarea");
  }
});

function goBack() {
  window.location.href = "../../index.html";
}

// Cargar datos al abrir
document.addEventListener("DOMContentLoaded", () => {
  initDB().then(() => {
    loadTaskData();
  });
});