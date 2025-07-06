// script.js
window.addEventListener('DOMContentLoaded', init);

function init() {
  setupIndexPage();
  setupDashboardPage();
}

/** ===== Landing Page Logic ===== */
function setupIndexPage() {
  const path = window.location.pathname;
  if (!path.endsWith('index.html') && !path.endsWith('/')) return;

  const form = document.getElementById('user-form');
  const nameIn = document.getElementById('name');
  const dobIn = document.getElementById('dob');
  const errorMsg = document.getElementById('error-msg');

  // Restrict DOB to at least 10 years old
  const today = new Date();
  today.setFullYear(today.getFullYear() - 10);
  dobIn.max = today.toISOString().split('T')[0];

  // Redirect if already registered
  if (localStorage.getItem('user')) {
    return window.location.replace('app.html');
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    errorMsg.textContent = '';

    const name = nameIn.value.trim();
    const dobStr = dobIn.value;
    if (!name || !dobStr) {
      errorMsg.textContent = 'All fields are required.';
      return;
    }

    const parsedDob = new Date(dobStr);
    if (isNaN(parsedDob.getTime())) {
      errorMsg.textContent = 'Please enter a valid date.';
      return;
    }

    const age = calculateAge(parsedDob);
    if (age < 10) {
      errorMsg.textContent = 'You must be at least 10 years old.';
      return;
    }
    if (age > 100) {
      errorMsg.textContent = 'Please enter a realistic age (less than 100 years).';
      return;
    }

    localStorage.setItem('user', JSON.stringify({ name, dob: dobStr }));
    window.location.replace('app.html');
  });

}

function calculateAge(dob) {
  const diff = Date.now() - dob.getTime();
  return Math.abs(new Date(diff).getUTCFullYear() - 1970);
}

/** ===== Dashboard Logic ===== */
function setupDashboardPage() {
  const path = window.location.pathname;
  if (!path.endsWith('app.html')) return;

  // User check
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user.name) {
    return window.location.replace('index.html');
  }

  document.getElementById('user-name').textContent = user.name;
  document.getElementById('avatar').src =
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=4f46e5&color=fff&rounded=true`;

  document.getElementById('sign-out').addEventListener('click', () => {
    localStorage.clear();
    window.location.replace('index.html');
  });

  // Task handling
  const STORAGE_KEY = 'tasks';
  let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

  if (!tasks.length) {
    fetchInitialTasks().then(fetched => {
      tasks = fetched;
      saveTasks(STORAGE_KEY, tasks);
      renderTasks(tasks);
    }).catch(console.error);
  } else {
    renderTasks(tasks);
  }

  // Add new task
  document.getElementById('add-btn').addEventListener('click', () => {
    const input = document.getElementById('new-task');
    const text = input.value.trim();
    if (!text) return;
    tasks.push({
      id: uuid(),
      text: text,
      stage: 'todo',
      modified: new Date().toISOString(),
    });
    saveTasks(STORAGE_KEY, tasks);
    renderTasks(tasks);
    input.value = '';
  });
}

// Simple UUID generator
function uuid() {
  return 'xxxxxxxx'.replace(/x/g, () =>
    ((Math.random() * 16) | 0).toString(16)
  );
}

// Fetch dummy todos
async function fetchInitialTasks() {
  const res = await fetch('https://dummyjson.com/todos');
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const { todos } = await res.json();
  return todos.slice(0, 10).map(t => ({
    id: uuid(),
    text: t.todo,
    stage: 'todo',
    modified: new Date().toISOString(),
  }));
}

// Persist tasks
function saveTasks(key, tasks) {
  localStorage.setItem(key, JSON.stringify(tasks));
}

// Render all three lists
function renderTasks(tasks) {
  const stages = ['todo', 'completed', 'archived'];

  stages.forEach(stage => {
    const ul = document.getElementById(`${stage}-list`);
    const count = document.getElementById(`count-${stage}`);
    ul.innerHTML = '';
    const subset = tasks.filter(t => t.stage === stage);
    count.textContent = subset.length;

    subset.forEach(task => {
      const li = document.createElement('li');
      li.className = 'task-card';
      li.draggable = true;
      li.dataset.id = task.id;
      li.innerHTML = `
        <div class="task-text">${task.text}</div>
        <time>${new Date(task.modified).toLocaleString()}</time>
      `;

      // Drag handlers
      li.addEventListener('dragstart', () => li.classList.add('dragging'));
      li.addEventListener('dragend', () => li.classList.remove('dragging'));

      // Action buttons
      const divelement = document.createElement('div');
      divelement.className = 'task-actions';
      addButtons(divelement, task.id, tasks);
      li.appendChild(divelement);

      ul.appendChild(li);
    });
  });

  // Drag & Drop zones
  // ✅ Fixed Drag & Drop zones
  stages.forEach(stage => {
    const ul = document.getElementById(`${stage}-list`);

    ul.addEventListener('dragover', e => {
      e.preventDefault();
      const dragging = document.querySelector('.dragging');
      if (!dragging) return;

      const after = getDragAfter(ul, e.clientY);
      if (after) ul.insertBefore(dragging, after);
      else ul.appendChild(dragging);
    });

    ul.addEventListener('dragenter', () => {
      ul.classList.add('drag-over'); // for visual cue
    });

    ul.addEventListener('dragleave', () => {
      ul.classList.remove('drag-over'); // remove on leave
    });

    ul.addEventListener('drop', e => {
      e.preventDefault();
      ul.classList.remove('drag-over'); // clean up visual
      const dragging = document.querySelector('.dragging');
      const id = dragging.dataset.id;
      changeStageById(id, stage, tasks);
    });
  });

}

// Find insertion point
function getDragAfter(container, y) {
  const items = [...container.querySelectorAll('.task-card:not(.dragging)')];
  return items.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    return offset < 0 && offset > closest.offset
      ? { offset, element: child }
      : closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Create action buttons
function addButtons(container, id, tasks) {
  const task = tasks.find(t => t.id === id);
  const map = {
    todo: [['Complete', 'btn-complete', 'completed'], ['Archive', 'btn-archive', 'archived']],
    completed: [['Move to Todo', 'btn-move', 'todo'], ['Archive', 'btn-archive', 'archived']],
    archived: [['Move to Todo', 'btn-move', 'todo'], ['Move to Completed', 'btn-complete', 'completed']],
  };

  function changeStageById(id, newStage, tasks) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    task.stage = newStage;
    task.modified = new Date().toISOString();
    saveTasks('tasks', tasks);
    renderTasks(tasks);
  }


  map[task.stage].forEach(([label, cls, newStage]) => {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.className = cls;
    btn.addEventListener('click', () => changeStageById(id, newStage, tasks));
    container.appendChild(btn);
  });
}

