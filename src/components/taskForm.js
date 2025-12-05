document.getElementById("taskForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!title) {
    alert("El título es obligatorio");
    return;
  }

  try {
    const newTask = {
      title: title,
      description: description,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await addTask(newTask);
    alert("Tarea guardada");
    document.getElementById("taskForm").reset();

    setTimeout(() => {
      window.location.href = "../../index.html";
    }, 1000);
  } catch (error) {
    console.error("Error:", error);
    alert("Error al guardar la tarea");
  }
});

function goBack() {
  window.location.href = "../../index.html";
}