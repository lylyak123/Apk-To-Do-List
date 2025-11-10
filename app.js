function saveTask() {
  localStorage.setItem("dataTask", JSON.stringify(tasks));
}

let tasks = JSON.parse(localStorage.getItem("dataTask")) || [];

const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const task = input.value.trim();
  if (task === "") return;

  const date = new Date().toLocaleDateString('id-ID', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  tasks.push({ text: task, createdAt: date });
  input.value = "";
  saveTask();
  renderTasks();
});

function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    // Bagian teks & tanggal di kiri
    const content = document.createElement("div");
    content.innerHTML = `
      <strong>${task.text}</strong>
      <small class="task-date">Dibuat: ${task.createdAt}</small>
    `;
    li.appendChild(content);

    // Grup tombol di kanan
    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");

    const btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.onclick = () => editTask(index);

    const btnHapus = document.createElement("button");
    btnHapus.textContent = "Hapus";
    btnHapus.onclick = () => deleteTask(index);

    buttonGroup.appendChild(btnEdit);
    buttonGroup.appendChild(btnHapus);
    li.appendChild(buttonGroup);

    list.appendChild(li);
  });
}


renderTasks();