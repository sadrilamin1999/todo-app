// find elements
const container = document.querySelector(".container");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const todoAddButton = document.querySelector(".addTodoButton");
const todoLists = document.querySelector("#lists");
const messageElement = document.querySelector("#message");

// message
const showMessage = (text, status) => {
  messageElement.innerHTML = text;
  messageElement.classList.add(`bg-${status}`);
  setTimeout(() => {
    messageElement.innerHTML = "";
    messageElement.classList.remove(`bg-${status}`);
  }, 1000);
};
// create todo
const createTodo = (todoId, todoValue) => {
  const todoElement = document.createElement("li");
  todoElement.id = todoId;
  todoElement.classList.add("li-style");
  todoElement.innerHTML = `
  <span>${todoValue}</span>
  <sapn><button class="btn" id="deleteButton" >Delete</button></sapn>
  `;
  todoLists.appendChild(todoElement);

  const deleteButton = todoElement.querySelector("#deleteButton");
  deleteButton.addEventListener("click", deleteTodo);
};

// delete todo
const deleteTodo = (event) => {
  const selectedTodo = event.target.parentElement.parentElement;
  todoLists.removeChild(selectedTodo);
  showMessage("Todo is deleted ❌", "danger");

  let todos = getTodosFromLocalStroge();
  todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
  localStorage.setItem("mytodos", JSON.stringify(todos));
};

// get todos from local stroge
const getTodosFromLocalStroge = () => {
  return localStorage.getItem("mytodos")
    ? JSON.parse(localStorage.getItem("mytodos"))
    : [];
};
// add todo
const addTodo = (event) => {
  event.preventDefault();
  const todoValue = todoInput.value;

  // unique id
  const todoId = Date.now().toString();
  createTodo(todoId, todoValue);
  showMessage("Todo is created ✔", "success");

  // add todo to localStorage
  const todos = getTodosFromLocalStroge();
  todos.push({ todoId, todoValue });
  localStorage.setItem("mytodos", JSON.stringify(todos));

  todoInput.value = "";
};
// add eventListener
todoForm.addEventListener("submit", addTodo);
