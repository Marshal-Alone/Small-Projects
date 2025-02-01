// DOM Elements
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const tasksList = document.getElementById('tasks-list');
const taskTemplate = document.getElementById('task-template');
const tasksCount = document.querySelector('.tasks-count');
const clearCompletedBtn = document.getElementById('clear-completed');
const filterBtns = document.querySelectorAll('.filter-btn');

// State
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

// Functions
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTasksCount() {
    const activeTasks = tasks.filter(task => !task.completed).length;
    tasksCount.textContent = `${activeTasks} task${activeTasks !== 1 ? 's' : ''} left`;
}

function createTaskElement(task) {
    const taskElement = taskTemplate.content.cloneNode(true);
    const taskItem = taskElement.querySelector('.task-item');
    const taskText = taskElement.querySelector('.task-text');
    const completeBtn = taskElement.querySelector('.complete-btn');
    const editBtn = taskElement.querySelector('.edit-btn');
    const deleteBtn = taskElement.querySelector('.delete-btn');

    taskItem.dataset.id = task.id;
    taskText.textContent = task.text;
    
    if (task.completed) {
        taskItem.classList.add('completed');
        completeBtn.style.color = 'white';
        completeBtn.style.background = 'var(--completed)';
        completeBtn.style.borderColor = 'var(--completed)';
    }

    // Complete task
    completeBtn.addEventListener('click', () => {
        task.completed = !task.completed;
        taskItem.classList.toggle('completed');
        if (task.completed) {
            completeBtn.style.color = 'white';
            completeBtn.style.background = 'var(--completed)';
            completeBtn.style.borderColor = 'var(--completed)';
        } else {
            completeBtn.style.color = 'transparent';
            completeBtn.style.background = 'transparent';
            completeBtn.style.borderColor = '#e5e7eb';
        }
        saveTasks();
        updateTasksCount();
        renderTasks();
    });

    // Edit task
    editBtn.addEventListener('click', () => {
        const newText = prompt('Edit task:', task.text);
        if (newText !== null && newText.trim() !== '') {
            task.text = newText.trim();
            taskText.textContent = task.text;
            saveTasks();
        }
    });

    // Delete task
    deleteBtn.addEventListener('click', () => {
        tasks = tasks.filter(t => t.id !== task.id);
        taskItem.remove();
        saveTasks();
        updateTasksCount();
    });

    return taskElement;
}

function renderTasks() {
    tasksList.innerHTML = '';
    let filteredTasks = tasks;

    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => {
        tasksList.appendChild(createTaskElement(task));
    });

    updateTasksCount();
}

// Event Listeners
addBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text !== '') {
        const newTask = {
            id: Date.now().toString(),
            text: text,
            completed: false
        };
        tasks.push(newTask);
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }
});

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});

clearCompletedBtn.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

// Initial render
renderTasks();
