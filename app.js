const taskForm = document.querySelector(".main-form");
const taskInput = document.querySelector(".task-input");
const projectName = document.getElementById("project-name");
const taskList = document.querySelector(".task-list");
const modal = document.querySelector(".modal");
const taskDescription = document.querySelector(".task-description-modal")
const closeBtn = document.querySelector(".close-modal");

// prompt the user to enter project name
projectName.textContent = prompt("Enter project name: ") || "My project";

taskForm.addEventListener("submit", addTask);

// create task object from user input
function addTask(e){
    e.preventDefault();
    const taskText = taskInput.value.trim();

    if (taskText === ""){
        alert("Please enter valid task name...");
        return;
    }

    const task = {
        text: taskText,
        id: Date.now(),
        completed: false
    }

    addTaskToList(task)
    taskInput.value = "";
}

// create task item element and add it to the list of tasks
function addTaskToList(task) {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <span class="task-text">${task.text}</span>
        <button data-id="${task.id}" class="delete-btn">Delete</button>
    `;

    if (task.completed) {
        taskItem.classList.add('completed');
    }

    taskList.appendChild(taskItem);
}

// Create an event handler for the task list
taskList.addEventListener("click", handleTaskActions); 

function handleTaskActions(e){
    if (e.target.classList.contains("delete-btn")) {
        const taskId = e.target.getAttribute("data-id");
        const taskItem = e.target.parentElement;
        
        taskItem.remove();
    }
}