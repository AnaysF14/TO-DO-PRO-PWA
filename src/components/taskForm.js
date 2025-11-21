function saveTask() {
  const task = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    completed: false
  };

  addTask(task);
  window.location.href = "../../index.html";
}

function updateTask() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  getTasks((tasks) => {
    const task = tasks.find((t) => t.id === id);

    task.title = document.getElementById("title").value;
    task.description = document.getElementById("description").value;

    updateTaskDB(task);
    window.location.href = "../../index.html";
  });
}
