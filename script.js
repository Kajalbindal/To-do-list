const addTaskButton = document.getElementById('addTaskButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage on page load
window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => {
    addTaskToDOM(task.text, task.completed);
  });
};

// Add Task Button Click Handler
addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }
  addTaskToDOM(taskText, false);
  saveTask(taskText, false);
  taskInput.value = ""; // Clear input
});

// Add Task to DOM
function addTaskToDOM(taskText, completed) {
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');
  if (completed) taskItem.classList.add('completed');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;

  const taskName = document.createElement('span');
  taskName.textContent = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-btn');

  // Event Listeners
  checkbox.addEventListener('change', () => {
    taskItem.classList.toggle('completed');
    updateLocalStorage();
  });

  deleteButton.addEventListener('click', () => {
    taskList.removeChild(taskItem);
    updateLocalStorage();
  });

  // Append Elements
  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskName);
  taskItem.appendChild(deleteButton);
  taskList.appendChild(taskItem);
}

// Save task to localStorage
function saveTask(text, completed) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text, completed });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update localStorage after checkbox or delete
function updateLocalStorage() {
  const updatedTasks = [];
  document.querySelectorAll('.task-item').forEach(item => {
    const text = item.querySelector('span').textContent;
    const completed = item.querySelector('input[type="checkbox"]').checked;
    updatedTasks.push({ text, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
