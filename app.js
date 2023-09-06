const taskForm = document.querySelector(".main-form");
const taskInput = document.querySelector(".task-input");
const projectName = document.getElementById("project-name");
const taskList = document.querySelector(".task-list");
const modal = document.querySelector(".modal");
const taskDescription = document.querySelector(".task-description-modal");
const closeBtn = document.querySelector(".close-modal");
const taskDescriptionInput = document.querySelector(".task-description-input");
const saveDescriptionBtn = document.querySelector(".save-description-btn");

// prompt the user to enter project name
projectName.textContent = prompt("Enter project name: ") || "My project";

taskForm.addEventListener("submit", addTask);

const tasksWithDescriptions = [];

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
        completed: false,
        description: "", // Initialize description as empty
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

    // add task item to the unordered list
    taskList.appendChild(taskItem);

    // add task to the array
    tasksWithDescriptions.push(task);
}

// Create an event handler for the task list
taskList.addEventListener("click", handleTaskActions); 

function handleTaskActions(e){
    if (e.target.classList.contains("delete-btn")) {
        const taskId = e.target.getAttribute("data-id");
        const taskItem = e.target.parentElement;

        // find index of the task object element in the array by its data id property
        const taskIndex = tasksWithDescriptions.findIndex(task => task.id === parseInt(taskId));
        
        if (taskIndex !== -1) {  //check if the taskIndex is found in the array
            tasksWithDescriptions.splice(taskIndex, 1); //remove the task object from the array
        }

        taskItem.remove(); //remove task from the ul
    }

    // display task description
    if (e.target.classList.contains("task-text")) {
        const taskId = parseInt(e.target.nextElementSibling.getAttribute("data-id"));
        displayTaskDescription(taskId);
    }
}

function displayTaskDescription (taskId) {
    const task = tasksWithDescriptions.find(task => task.id === taskId);

    if (task){
        const taskDescription = task.description;
        taskDescriptionInput.value = taskDescription;

        modal.style.display = "block";

        saveDescriptionBtn.addEventListener("click", () => {
            task.description = taskDescriptionInput.value;
            modal.style.display = "none";
        })
    }
}

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});
