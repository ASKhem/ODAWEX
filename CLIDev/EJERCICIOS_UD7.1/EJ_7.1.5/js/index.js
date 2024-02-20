// index.js
import TaskList from './taskList.js';

const taskContainer = document.getElementById("task-container");
const taskInput = document.getElementById("task-input");
let taskList = new TaskList([]);

window.addEventListener("load", init);

function init() {
    cargarTareas();
}

function cargarTareas() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tareas = JSON.parse(this.responseText);
            taskList = new TaskList(tareas);
            loadTasks();
            taskContainer.addEventListener("click", cambiarEstado);
        }
    };
    xhr.open("GET", "tareas.json", true);
    xhr.send();
}

function loadTasks() {
    taskContainer.innerHTML = "";
    taskList.tasks.forEach((task) => {
        const li = document.createElement("li");
        const p = document.createElement("p");
        const input = document.createElement("input");
        const label = document.createElement("label");

        input.type = "checkbox";
        input.className = "task-checkbox";

        label.appendChild(input);
        label.appendChild(p);

        p.innerHTML = task.text;

        if (task.estado) {
            li.classList.add("completed");
            input.checked = true;
        }

        li.appendChild(label);
        taskContainer.appendChild(li);
    });
}

function cambiarEstado(event) {
    if (event.target.matches(".task-checkbox")) {
        const taskText = event.target.nextElementSibling.innerHTML;
        const task = taskList.findTask(taskText);
        if (!task.estado) {
            taskList.markTaskAsCompleted(task);
        } else {
            taskList.markTaskAsUncompleted(task);
        }
        loadTasks();
    }
}

document.getElementById("task-add").addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value;
    if (taskList.addTask(taskText)) {
        document.getElementById("error").innerHTML = taskList.addTask(taskText);
    } else {
        document.getElementById("error").innerHTML = "";
    }
    loadTasks();
    taskInput.value = "";
}