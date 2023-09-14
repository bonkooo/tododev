const taskForm = document.querySelector(".main-form");
const taskInput = document.querySelector(".task-input");
const projectName = document.getElementById("project-name");
const taskList = document.querySelector(".task-list");
const modal = document.querySelector(".modal");
const taskDescriptionInput = document.querySelector(".task-description-input");
const saveDescriptionBtn = document.querySelector(".save-description-btn");
const editIcon = document.getElementById("edit-project-name");
const closeBtn = document.querySelector(".close-modal")

// load project name from local storage
let storedProjectName = localStorage.getItem("projectName");
if (!storedProjectName) {
  storedProjectName = prompt("Enter project name:") || "My Project";
  localStorage.setItem("projectName", storedProjectName);
}
projectName.textContent = storedProjectName;

// load tasks from local storage on page load
let tasksWithDescriptions = JSON.parse(localStorage.getItem("tasks")) || [];

// populate the UI with tasks from local storage
function populateTasks() {
  taskList.innerHTML = "";
  tasksWithDescriptions.forEach(task => {
    addTaskToList(task);
  });
}

populateTasks();

// edit project name
editIcon.addEventListener("click", () => {
  const newProjectName = prompt("Enter a new project name:", projectName.textContent);

  if (newProjectName !== null) {
    projectName.textContent = newProjectName;
    localStorage.setItem("projectName", newProjectName);
  }
});

taskForm.addEventListener("submit", addTask);

// create task object from user input
function addTask(e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter valid task name...");
    return;
  }

  const task = {
    text: taskText,
    id: Date.now(),
    completed: false,
    description: "", 
  };

  addTaskToList(task);
  taskInput.value = "";

  // save the updated tasks to local storage
  tasksWithDescriptions.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasksWithDescriptions));
}

// create task item element and add it to the list of tasks
function addTaskToList(task) {
  const taskItem = document.createElement("li");
  taskItem.innerHTML = `
    <span class="task-text">${task.text}</span>
    <button data-id="${task.id}" class="delete-btn">Delete</button>
  `;

  if (task.completed) {
    taskItem.classList.add("completed");
  }

  // add task item to the unordered list
  taskList.appendChild(taskItem);
}

// create an event handler
taskList.addEventListener("click", handleTaskActions);

function handleTaskActions(e) {
  if (e.target.classList.contains("delete-btn")) {
    const taskId = e.target.getAttribute("data-id");
    const taskItem = e.target.parentElement;

    // find index of the task object element in the array by its data id
    const taskIndex = tasksWithDescriptions.findIndex(task => task.id === parseInt(taskId));

    if (taskIndex !== -1) {
      // check if the taskIndex is found in the array
      tasksWithDescriptions.splice(taskIndex, 1); // remove the task object from the array
      // save the updated tasks to local storage after deletion
      localStorage.setItem("tasks", JSON.stringify(tasksWithDescriptions));
    }

    taskItem.remove(); // remove task from the ul
  }

  // display task description
  if (e.target.classList.contains("task-text")) {
    const taskId = parseInt(e.target.nextElementSibling.getAttribute("data-id"));
    displayTaskDescription(taskId);
  }
}

function displayTaskDescription(taskId) {
  const task = tasksWithDescriptions.find(task => task.id === taskId);

  if (task) {
    const taskDescription = task.description;
    taskDescriptionInput.value = taskDescription;

    modal.style.display = "block";

    saveDescriptionBtn.addEventListener("click", () => {
      task.description = taskDescriptionInput.value;
      modal.style.display = "none";
      // save the updated tasks to local storage after editing description
      localStorage.setItem("tasks", JSON.stringify(tasksWithDescriptions));
    });
  }
}

document.body.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
