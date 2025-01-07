const toDoList = document.getElementById("task-container-toDo");
const toDoInput = document.getElementById("input-to-do");


function addTask() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = toDoInput.value.trim();

    if (task === "") {
        return;
    }

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    createTaskElement(task, toDoList, "checkbox-task-toDo", "task-toDo");
    toDoInput.value = "";
}

function deleteCompletedTasksToDo() {
    const taskLabels = document.querySelectorAll(".task-toDo");
    const remainingTasks = [];

    taskLabels.forEach(label => {
        const checkbox = label.querySelector(".checkbox-task-toDo");
        if (!checkbox.checked) {
            remainingTasks.push(label.textContent.trim());
        } else {
            label.remove(); // Elimina la tarea completada de la lista visual
        }
    });

    // Actualiza el localStorage con las tareas restantes
    localStorage.setItem("tasks", JSON.stringify(remainingTasks));
}


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        createTaskElement(task, toDoList, "checkbox-task-toDo", "task-toDo");
    });

    const doingTasks = JSON.parse(localStorage.getItem("doingTasks")) || [];
    const doingList = document.getElementById("doingList");
    doingTasks.forEach(task => {
        createTaskElement(task, doingList, "checkbox-task-doing", "task-doing");
    });

    const doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];
    const doneList = document.getElementById("task-container-done");
    doneTasks.forEach(task => {
        createTaskElement(task, doneList, "checkbox-task-done", "task-done", true);
    });
}


function createTaskElement(task, parentList, checkboxClass, labelClass, isStrikethrough = false) {
    const taskLabel = document.createElement("label");
    const checkboxTask = document.createElement("input");

    checkboxTask.type = "checkbox";
    checkboxTask.classList.add(checkboxClass);
    taskLabel.classList.add(labelClass);
    taskLabel.textContent = task;

    if (isStrikethrough) {
        taskLabel.style.textDecoration = "line-through";
    }

    taskLabel.prepend(checkboxTask);
    parentList.appendChild(taskLabel);
}


function sendTaskSelectedToDoing() {
    const taskLabels = document.querySelectorAll(".task-toDo");
    const doingList = document.getElementById("doingList");

    const doingTasks = JSON.parse(localStorage.getItem("doingTasks")) || [];
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    taskLabels.forEach(label => {
        const checkbox = label.querySelector(".checkbox-task-toDo");
        if (checkbox.checked) {
            const task = label.textContent.trim();

            
            createTaskElement(task, doingList, "checkbox-task-doing", "task-doing");

            
            doingTasks.push(task);
            const updatedTasks = tasks.filter(t => t !== task);

            
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            localStorage.setItem("doingTasks", JSON.stringify(doingTasks));

            
            label.remove();
        }
    });
}


function deleteCompletedTasksDoing() {
    const taskLabels = document.querySelectorAll(".task-doing");
    const remainingTasks = [];

    taskLabels.forEach(label => {
        const checkbox = label.querySelector(".checkbox-task-doing");
        if (!checkbox.checked) {
            remainingTasks.push(label.textContent.trim());
        } else {
            label.remove();
        }
    });

    localStorage.setItem("doingTasks", JSON.stringify(remainingTasks));
}


function sendTaskSelectedToDone() {
    const taskLabels = document.querySelectorAll(".task-doing");
    const doneList = document.getElementById("task-container-done");

    const doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];
    const doingTasks = JSON.parse(localStorage.getItem("doingTasks")) || [];

    taskLabels.forEach(label => {
        const checkbox = label.querySelector(".checkbox-task-doing");
        if (checkbox.checked) {
            const task = label.textContent.trim();

            
            createTaskElement(task, doneList, "checkbox-task-done", "task-done", true);

            
            doneTasks.push(task);
            const updatedTasks = doingTasks.filter(t => t !== task);

            
            localStorage.setItem("doingTasks", JSON.stringify(updatedTasks));
            localStorage.setItem("doneTasks", JSON.stringify(doneTasks));

            
            label.remove();
        }
    });
}


function deleteCompletedTasksDone() {
    const taskLabels = document.querySelectorAll(".task-done");
    const remainingTasks = [];

    taskLabels.forEach(label => {
        const checkbox = label.querySelector(".checkbox-task-done");
        if (!checkbox.checked) {
            remainingTasks.push(label.textContent.trim());
        } else {
            label.remove();
        }
    });

    localStorage.setItem("doneTasks", JSON.stringify(remainingTasks));
}


function selectAllToDo() {
    const checkboxes = document.querySelectorAll(".checkbox-task-toDo");
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
}

function selectAllDoing() {
    const checkboxes = document.querySelectorAll(".checkbox-task-doing");
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
}

function selectAllDone() {
    const checkboxes = document.querySelectorAll(".checkbox-task-done");
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
}


window.onload = loadTasks;
