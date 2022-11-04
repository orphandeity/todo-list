//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

//Functions

function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Add todo to localStorage
    saveLocalTodos(todoInput.value);
    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-sharp fa-solid fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
    //Clear todo input value
    todoInput.value = '';

}

function deleteCheck(e) {
    const item = e.target;
    //Delete todo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitioned', function() {
            todo.remove();
        })
        
    }
    //Check mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
    filterTodo();
}

function filterTodo() {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (filterOption.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                console.log('completed');
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                console.log('uncompleted');
                break;
        }
    });
}


function saveLocalTodos(todo) {
    //Check for existing todos
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        //Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        
        //Check Mark Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fa-sharp fa-solid fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //Check Trash Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //Append to list
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}