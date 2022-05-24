var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// The El suffix identifies this as a DOM element; this naming convention will help us keep track of which variables store DOM elements.

// var taskListEl = document.querySelector(".task-list");
// vartaskListEl = document.querySelector("#id-for-ul");

var taskFormHandler = function(event){
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    
    createTaskEl(taskDataObj); 
}

var createTaskEl = function(taskDataObj){ 
    // create list
    var listItemEl = document.createElement("li");
    listItemEl.className="task-item";
    
    // create div
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className ="task-info";

    // add HTML to div, then to list
    taskInfoEl.innerHTML= "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type +  "</span>";
    listItemEl.appendChild(taskInfoEl);

    // adds list to ul
    tasksToDoEl.appendChild(listItemEl);

}

formEl.addEventListener("submit", taskFormHandler);

// using submit allows us to either click OR enter key
// using "click" removes the enter key option
