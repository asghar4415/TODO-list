function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskcont = document.getElementById("tasks-container");

    if (taskInput.value.trim() !== "") {
        var taskElement = document.createElement("div");
        taskElement.className = "task";

        var taskTextElement = document.createElement("div");
        var taskText = document.createTextNode(taskInput.value);
        taskTextElement.appendChild(taskText);
        taskElement.appendChild(taskTextElement);

        taskElement.style.fontSize = "14px";
        taskElement.style.padding = "10px";
        taskElement.style.margin = "10px";
        taskElement.style.borderRadius = "5px";

        var editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.onclick = function () {
            editTask(taskTextElement, taskElement);
        };
        taskElement.appendChild(editButton);

        editButton.style.backgroundColor = "#8d99c5";

        editButton.style.color = "#fff";
        editButton.style.border = "none";
        editButton.style.padding = "7px";
        editButton.style.borderRadius = "4px";
        editButton.style.cursor = "pointer";


        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = function () {
            taskcont.removeChild(taskElement);
        };
        taskElement.appendChild(deleteButton);

        deleteButton.style.backgroundColor = "#8d99c5";

        deleteButton.style.color = "#fff";
        deleteButton.style.border = "none";
        deleteButton.style.padding = "7px";
        deleteButton.style.borderRadius = "4px";
        deleteButton.style.cursor = "pointer";

        var doneButton = document.createElement("button");
        doneButton.innerHTML = "Done";
        doneButton.onclick = function () {
            taskcont.removeChild(taskElement);
        };
        taskElement.appendChild(doneButton);

        doneButton.style.backgroundColor = "#8d99c5";
        doneButton.style.color = "#fff";
        doneButton.style.border = "none";
        doneButton.style.padding = "7px";
        doneButton.style.borderRadius = "4px";
        doneButton.style.cursor = "pointer";



        taskcont.appendChild(taskElement);

        taskInput.value = "";
    }
}

function editTask(taskTextElement, taskElement) {

    var editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = taskTextElement.innerText;

    taskElement.replaceChild(editInput, taskTextElement);

    var editButton = taskElement.querySelector("button");
    editButton.innerHTML = "Save";

    editButton.onclick = function () {
        taskTextElement.innerText = editInput.value;
        editButton.innerHTML = "Edit";
        editButton.onclick = function () {
            editTask(taskTextElement, taskElement);
        };
    };
}

