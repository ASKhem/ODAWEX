class TaskList {
    constructor(tareas) {
        this.tasks = tareas;
    }

    addTask(text) {
        const task = this.findTask(text);
        if (task && task.estado === false) {
            return "La tarea ya existe";
        } else {
            this.tasks.push({ text, estado: false });
        }
    }

    markTaskAsCompleted(task) {
        const index = this.tasks.indexOf(task);
        if (index > -1) {
            this.tasks[index].estado = true;
        }
    }

    markTaskAsUncompleted(task) {
        const index = this.tasks.indexOf(task);
        if (index > -1) {
            this.tasks[index].estado = false;
        }
    }

    findTask(text) {
        return this.tasks.find((task) => task.text === text);
    }
}

export default TaskList;