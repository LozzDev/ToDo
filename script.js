const toDoList = document.getElementById("task-container-toDo");  
const toDoInput = document.getElementById("input-to-do");



function addTask(){
    const task = toDoInput.value;
    
    const taskLabel = document.createElement("label");
    const checkboxTask = document.createElement("input");

    checkboxTask.type = "checkbox";
    checkboxTask.classList.add("checkbox-task-toDo");
    taskLabel.classList.add("task-toDo");

    taskLabel.textContent = task;

    taskLabel.appendChild(checkboxTask);
    toDoList.appendChild(taskLabel);

    toDoInput.value = "";
}

function deleteTask(){
    const selectedTasks = document.querySelectorAll(".task-toDo");

    selectedTasks.forEach(task =>{
        task.remove();

    });
}