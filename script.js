const taskInput = document.querySelector("#newtask input");
const taskSection = document.querySelector(".tasks");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// press enter also adds task
taskInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

document.querySelector("#push").onclick = function () {
  addTask();
};

function addTask() {
  console.log("trying to add task");
  if (taskInput.value.trim() === "") {
    alert("Enter something before adding!");
    return;
  }
  tasks.push({ text: taskInput.value, completed: false });
  save();
  showTasks();
  taskInput.value = "";
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  save();
  showTasks();
}

function deleteTask(index) {
  console.log("deleting task at", index);
  tasks.splice(index, 1);
  save();
  showTasks();
}

function editTask(index) {
  let newText = prompt("Edit task:", tasks[index].text);
  if (newText && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    save();
    showTasks();
  }
}

function updateProgress() {
  let total = tasks.length;
  let done = tasks.filter(t => t.completed).length;
  let percent = total === 0 ? 0 : Math.round((done / total) * 100);

  document.getElementById("progress-bar").style.width = percent + "%";
  document.getElementById("progress-text").textContent =
    `${done}/${total} tasks completed (${percent}%)`;
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTasks() {
  taskSection.innerHTML = "";
  tasks.forEach((task, i) => {
    taskSection.innerHTML += `
      <div class="task">
        <div class="left">
          <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleTask(${i})">
          <p class="${task.completed ? "checked" : ""}">${task.text}</p>
        </div>
        <div class="actions">
          <div class="edit" onclick="editTask(${i})"><i class="uil uil-edit"></i></div>
          <div class="delete" onclick="deleteTask(${i})"><i class="uil uil-trash"></i></div>
        </div>
      </div>`;
  });
  updateProgress();
}

document.getElementById("clear-all").addEventListener("click", () => {
  if (tasks.length === 0) {
    alert("Nothing to clear!");
    return;
  }
  if (confirm("Delete everything?")) {
    tasks = [];
    save();
    showTasks();
  }
});

showTasks();
