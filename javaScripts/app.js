//ToDo Application Start

//Selectors
const LOCAL_STORAGE_KEY = "todoList";

const inputTitle = document.getElementById("task-title");
const inputSubtitle = document.getElementById("task-subtitle");
const inputNote = document.getElementById("task-note");
const inputPriority = document.getElementById("task-priority");

const todoForm = document.getElementById("todo-form");
const modal = document.getElementById("exampleModal");
const modalTitle = document.getElementById("modal-label");

const tableBody = document.getElementById("table-body");

const saveButton = document.getElementById("save-button");

//Local Storage
const saveToStorage = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoStore));
};

const todoStore = localStorage.getItem(LOCAL_STORAGE_KEY)
  ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  : [];

//Create New Todo
let mode = "new";
let currentTodo;

const renderList = () => {
  tableBody.innerHTML = "";
  todoStore.forEach((todo, index) => {
    const editBtn = (id) =>
      `<button type="button" class="fas fa-pen" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editTodo(${id})"></button>`;
    const dltBtn = (id) =>
      `<button type="button" class="fas fa-trash" onclick="deleteTodo(${id})"></button>`;
    const checkBtn = (id, isCompleted) =>
      `<button type="button" class="btn btn-success complete-btn" onclick="markAsDone(${id})">${
        !isCompleted ? "Done" : "Mark as undone"
      }</button>`;
    const html = `
      <tr class="${todo.done ? "completed" : ""}">
        <th scope="row">${index + 1}</th>
        <td>${todo.title}</td>
        <td>${todo.subTitle}</td>
        <td>${todo.priority}</td>
        <td>${editBtn(index)} ${dltBtn(index)} ${checkBtn(
      index,
      todo.done
    )}</td>
      </tr>
      `;
    tableBody.innerHTML += html;
  });
};

//Delete Button
const deleteTodo = (id) => {
  todoStore.splice(id, 1);
  saveToStorage();
  renderList();
};

// Done Button
const markAsDone = (id) => {
  todoStore[id].done = !todoStore[id].done;
  saveToStorage();
  renderList();
};

//Edit Button
const editTodo = (id) => {
  mode = "edit";
  currentTodo = id;
  modalTitle.innerText = `Edit Task ${todoStore[id].title}`;
  // Set input values
  inputTitle.value = todoStore[id].title;
  inputSubtitle.value = todoStore[id].subTitle;
  inputNote.value = todoStore[id].note;
  inputPriority.value = todoStore[id].priority;
};

// Validation For The Title of the task
const validateForm = () => {
  if (!inputTitle.value) return alert("You should fill in the title!");
  return true;
};

//reset
const reset = () => {
  mode = "new";
  modalTitle.innerText = "New Task";
  todoForm.reset();
};

const handleSubmit = () => {
  if (validateForm() !== true) return;

  if (mode === "new") {
    todoStore.push({
      title: inputTitle.value,
      subTitle: inputSubtitle.value,
      note: inputNote.value,
      priority: inputPriority.value,
      done: false,
    });
    saveToStorage();
    renderList();
    reset();
  }

  if (mode === "edit") {
    todoStore[currentTodo] = {
      title: inputTitle.value,
      subTitle: inputSubtitle.value,
      note: inputNote.value,
      priority: inputPriority.value,
      done: todoStore[currentTodo].done,
    };
    saveToStorage();
    renderList();
    reset();
  }
};

saveButton.addEventListener("click", handleSubmit);
renderList();
