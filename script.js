const input = document.getElementById('todo-input');
const button = document.getElementById('add-todo-button');
const list = document.getElementById('todo-list');

// Load todos from localStorage
const saved = localStorage.getItem('todos');
let todos = saved ? JSON.parse(saved) : [];

function saveTodos(){
    // save current todos array to localstorage
    localStorage.setItem('todos', JSON.stringify(todos));
}

function createTodoNode(todo, index){
    const li = document.createElement('li');
    li.className = 'todo-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed; 
    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        saveTodos();
        render();
    });
    
    const todoText = document.createElement('span');
    todoText.className = 'todo-text';
    todoText.textContent = todo.text;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        saveTodos();
        render();
    });
    
    li.appendChild(checkbox);
    li.appendChild(todoText);
    li.appendChild(deleteBtn);
    return li;
}

function render(){
    list.innerHTML = '';
    if (todos.length === 0) {
        list.innerHTML = '<div class="empty-message">No todos yet. Add one to get started! 🚀</div>';
        return;
    }
    todos.forEach((todo, index) => {
        const todoNode = createTodoNode(todo, index);
        list.appendChild(todoNode);
    });
}

function addTodo(){
    const text = input.value.trim();
    if (text) {
        todos.push({ text: text, completed: false });
        saveTodos();
        input.value = '';
        render();
    }
}

// Event listeners
button.addEventListener('click', addTodo);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Initial render
render();