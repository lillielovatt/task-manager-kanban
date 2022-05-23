var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// The El suffix identifies this as a DOM element; this naming convention will help us keep track of which variables store DOM elements.

// var taskListEl = document.querySelector(".task-list");
// vartaskListEl = document.querySelector("#id-for-ul");

var createTaskHandler = function(){
    var taskItemEl = document.createElement("li");
    taskItemEl.className="task-item";
    taskItemEl.textContent="This is a new task.";
    tasksToDoEl.appendChild(taskItemEl);
}

buttonEl.addEventListener("click", createTaskHandler);

