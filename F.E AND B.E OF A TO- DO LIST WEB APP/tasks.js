// JavaScript code

function Task(title) {
  this.title = title;
  this.completed = false;
}

// Array to store tasks
var tasks = [];

// Function to handle the click event on the add task button
function addTask() {
  var taskInput = document.getElementById("task-input");
  var taskTitle = taskInput.value.trim();

  if (taskTitle !== "") {
    // Create a new Task object
    var task = new Task(taskTitle);

    // Add the task to the tasks array
    tasks.push(task);

    // Clear the input field
    taskInput.value = "";

    // Update the task list
    generateTaskList();
  }
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  generateTaskList();
}

// Function to toggle task completion status
function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  generateTaskList();
}

// Function to generate the task list
function generateTaskList() {
  var taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach(function (task, index) {
    var listItem = document.createElement("li");

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function () {
      toggleTaskCompletion(index);
    });

    var title = document.createElement("span");
    title.innerText = task.title;

    if (task.completed) {
      title.classList.add("completed");
    }

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.className = "delete-btn";
    deleteButton.addEventListener("click", function () {
      deleteTask(index);
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(title);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
  });
}

// Function to initialize the task list
function initializeTaskList() {
  generateTaskList();
}

// Call the initializeTaskList function to load existing tasks on page load
initializeTaskList();
