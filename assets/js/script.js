var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var tasks=[];

// The El suffix identifies this as a DOM element; this naming convention will help us keep track of which variables store DOM elements.

// var taskListEl = document.querySelector(".task-list");
// vartaskListEl = document.querySelector("#id-for-ul");

var taskFormHandler = function (event) {
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    formEl.reset();
    var isEdit = formEl.hasAttribute("data-task-id");
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status:'to do'
        };

        createTaskEl(taskDataObj);
    }
};

var completeEditTask = function(taskName, taskType, taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.querySelector("h3.task-name").textContent=taskName;
    taskSelected.querySelector("span.task-type").textContent=taskType;
    for(let i=0; i<tasks.length; i++){
        if(tasks[i].id===parseInt(taskId)){
            tasks[i].name=taskName;
            tasks[i].type=taskType;
        }
    }
    saveTasks();
    alert("Task updated!");
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent="Add Task";
};

var createTaskEl = function (taskDataObj) {
    // create list
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    // add HTML to div, then to list
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    // adds list to ul
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    tasksToDoEl.appendChild(listItemEl);

    taskDataObj.id=taskIdCounter;
    tasks.push(taskDataObj);
    saveTasks();
    // increase task counter for next unique id
    taskIdCounter++;

};

var createTaskActions = function (taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = 'task-actions';

    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (let i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        // append to select element
        statusSelectEl.appendChild(statusOptionEl);
    }
    return actionContainerEl;
};

var taskButtonHandler = function (event) {
    var targetEl = event.target;
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    } else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var deleteTask = function (taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
    var updatedTaskArr=[];
    for(let i=0; i<tasks.length; i++){
        if(tasks[i].id !== parseInt(taskId)){
            updatedTaskArr.push(tasks[i]);
        }
    }
    tasks=updatedTaskArr;
    saveTasks();
};

var editTask = function (taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    // why can't I just pull out class=task-name here?
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
};

var taskStatusChangeHandler=function(event){
    // it didn't create a copy of the task. It actually moved the task item from its original location in the DOM into the other <ul>.
    // It's important to note that the variable taskSelected didn't create a second <li>.
    var targetEl=event.target;
    var taskId=targetEl.getAttribute("data-task-id");
    var statusValue = targetEl.value.toLowerCase();
    var taskSelected=document.querySelector(".task-item[data-task-id='"+taskId+"']");
    if(statusValue==="to do"){
        tasksToDoEl.appendChild(taskSelected);
    } else if(statusValue==="in progress"){
        tasksInProgressEl.appendChild(taskSelected);
    } else if(statusValue==="completed"){
        tasksCompletedEl.appendChild(taskSelected);
    }
    for(let i=0; i<tasks.length; i++){
        if(tasks[i].id===parseInt(taskId)){
            tasks[i].status=statusValue;
        }
    }
    saveTasks();
};

var saveTasks = function(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}


// Gets task items from localStorage.
// Converts tasks from the string format back into an array of objects.
// Iterates through a tasks array and creates task elements on the page from it.
var loadTasks= function(){
    var savedTasks = localStorage.getItem("tasks");
    if(tasks===null){
        return false;
    }
    savedTasks=JSON.parse(savedTasks);
    console.log(savedTasks);
    console.log(savedTasks[1].name);
    console.log(savedTasks[1]);
    for(let i=0;i<savedTasks.length;i++){
        createTaskEl(savedTasks[i]);
    }

    // for(let i=0;i<tasks.length;i++){
    //     tasks[i].id=taskIdCounter;
    //     // why?what? If we don't reset the taskId here, we could end up with the random Ids they had before, leading to 2 tasks having the same ID.
    //     // since Ids don't really need to be saved, and are only used/necessary for uniqueness purposes, then it makes sense
    //     // to tie them to the counter we created, restarting them at 0....length-1, every time we reload.
    //     var listItemEl = document.createElement("li");
    //     listItemEl.className = "task-item";
    //     listItemEl.setAttribute("data-task-id", tasks[i].id);

    //     // create div
    //     var taskInfoEl = document.createElement("div");
    //     taskInfoEl.className = "task-info";

    //     // add HTML to div, then to list
    //     taskInfoEl.innerHTML = "<h3 class='task-name'>" + tasks[i].name + "</h3><span class='task-type'>" + tasks[i].type + "</span>";
    //     listItemEl.appendChild(taskInfoEl);

    //     // adds list to ul
    //     var taskActionsEl = createTaskActions(tasks[i].id);
    //     listItemEl.appendChild(taskActionsEl);
    //     if(tasks[i].status==="to do"){
    //         listItemEl.querySelector("select[name='status-change']").selectedIndex =0;
    //         tasksToDoEl.appendChild(listItemEl);
    //     } else if(tasks[i].status==="in progress"){
    //         listItemEl.querySelector("select[name='status-change']").selectedIndex =1;
    //         tasksInProgressEl.appendChild(listItemEl);
    //     } else if(tasks[i].status==="completed"){
    //         listItemEl.querySelector("select[name='status-change']").selectedIndex =2;
    //         tasksCompletedEl.appendChild(listItemEl);
    //     }

    //     taskIdCounter++;
    // }
}

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);

// using submit allows us to either click OR enter key
// using "click" removes the enter key option

loadTasks();
