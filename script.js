document.addEventListener('DOMContentLoaded', () => {

    const addButton = document.getElementById('add-task-btn');  
    const taskInput = document.getElementById('task-input');     
    const taskList = document.getElementById('task-list');       

    const STORAGE_KEY = 'tasks';

    let tasks = [];

    function saveTasksToLocalStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }

      @param {{id: number|string, text: string}} taskObj
    
    function createTaskElement(taskObj) {
        const li = document.createElement('li');
        li.textContent = taskObj.text;
        li.dataset.id = String(taskObj.id); 

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        removeBtn.onclick = () => {

            taskList.removeChild(li);

            tasks = tasks.filter(t => String(t.id) !== String(taskObj.id));

            saveTasksToLocalStorage();
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

     @param {string|null} taskTextParam 

    function addTask(taskTextParam = null) {
        const rawText = taskTextParam !== null ? taskTextParam : taskInput.value;
        const taskText = String(rawText).trim();

        if (taskText === "") {
            if (taskTextParam === null) {
                alert("Please enter a task");
            }
            return;
        }

        const taskObj = {
            id: Date.now() + Math.floor(Math.random() * 1000),
            text: taskText
        };

        tasks.push(taskObj);
        saveTasksToLocalStorage();

        createTaskElement(taskObj);

        if (taskTextParam === null) {
            taskInput.value = "";
        }
    }

    function loadTasks() {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

        if (Array.isArray(stored)) {
            tasks = stored.map(item => {
                if (item && typeof item === 'object' && 'text' in item && 'id' in item) {
                    return { id: item.id, text: String(item.text) };
                } else {
                    return { id: Date.now() + Math.floor(Math.random() * 1000), text: String(item) };
                }
            });

            tasks.forEach(taskObj => createTaskElement(taskObj));
        } else {
            tasks = [];
            saveTasksToLocalStorage();
        }
    }

    addButton.addEventListener('click', () => addTask());

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
});

