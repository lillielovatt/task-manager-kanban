var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// The El suffix identifies this as a DOM element; this naming convention will help us keep track of which variables store DOM elements.

// var taskListEl = document.querySelector(".task-list");
// vartaskListEl = document.querySelector("#id-for-ul");

var createTaskHandler = function(event){
    event.preventDefault();
    
    var taskItemEl = document.createElement("li");
    taskItemEl.className="task-item";
    taskItemEl.textContent="This is a new task.";
    tasksToDoEl.appendChild(taskItemEl);
}

formEl.addEventListener("submit", createTaskHandler);
// using submit allows us to either click OR enter key
// using "click" removes the enter key option
