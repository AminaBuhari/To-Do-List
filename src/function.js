/* eslint-disable no-use-before-define */
/* eslint-disable no-loop-func */
let todos = [];
let isEditing = false;
let todoEdit = null;
const saveData = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const getData = () => {
  const formData = JSON.parse(localStorage.getItem('todos'));
  if (formData == null) {
    todos = [];
  } else {
    todos = formData;
  }
};
const toggleTodoStatus = (todo) => {
  todos = todos.map((todo_) => {
    if (todo_.index === todo.index) {
      return { ...todo, completed: !todo_.completed };
    }
    return todo_;
  });
  saveData();
};

const displayTodos = () => {
  const listElement = document.getElementById('todos-list');
  listElement.innerHTML = '';
  for (let i = 0; i < todos.length; i += 1) {
    const todoElement = document.createElement('li');
    todoElement.classList.add('todo');

    // todo-Content
    const todoContent = document.createElement('div');
    todoContent.classList.add('todo-content');

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('name', 'checkbox');
    checkbox.checked = todos[i].completed;
    checkbox.addEventListener('change', () => {
      toggleTodoStatus(todos[i]);
    });

    const desc = document.createElement('p');
    desc.innerText = todos[i].description;

    todoContent.appendChild(checkbox);
    todoContent.appendChild(desc);

    // action buttons
    const actionBtns = document.createElement('div');
    actionBtns.classList.add('actions');
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.classList.add('hidden');
    editBtn.setAttribute('type', 'button');
    editBtn.innerHTML = '<i class="fa fa-edit"></i>';
    editBtn.addEventListener('click', () => {
      editTodo(todos[i]);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.classList.add('hidden');
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.innerHTML = '<i class="fa fa-trash">';
    deleteBtn.addEventListener('click', () => {
      removeTodo(todos[i].index);
    });

    const moreBtn = document.createElement('button');
    moreBtn.classList.add('more-btn');
    moreBtn.setAttribute('type', 'button');
    moreBtn.innerHTML = '<i class="fa fa-ellipsis-v"></i>';
    moreBtn.addEventListener('click', () => {
      editBtn.classList.toggle('hidden');
      deleteBtn.classList.toggle('hidden');
    });

    actionBtns.appendChild(editBtn);
    actionBtns.appendChild(deleteBtn);
    actionBtns.appendChild(moreBtn);

    todoElement.appendChild(todoContent);
    todoElement.appendChild(actionBtns);
    listElement.appendChild(todoElement);
  }
  saveData();
};

const addTodo = () => {
  const desc = document.querySelector('#add-todo');
  if (desc.value) {
    const completed = false;
    const description = desc.value;
    const index = todos.length + 1;
    todos.push({ completed, description, index });
    displayTodos();
    saveData();
    desc.value = null;
  }
};

const editTodo = (todo) => {
  isEditing = true;
  todoEdit = todo;
  const desc = document.querySelector('#add-todo');
  desc.value = todo.description;
  desc.focus();
};

const saveEdit = () => {
  const desc = document.querySelector('#add-todo');
  if (desc.value) {
    todos = todos.map((todo) => {
      if (todo.index === todoEdit.index) {
        return { ...todo, description: desc.value };
      } return todo;
    });
    displayTodos();
    saveData();
    desc.value = null;
    isEditing = false;
    todoEdit = null;
  }
};

const removeTodo = (index_) => {
  todos.splice((index_ - 1), 1);
  todos = todos.map(
    (todo, index) => (
      { completed: todo.completed, description: todo.description, index: index + 1 }
    ),
  );
  displayTodos();
};

const getIsEditing = () => isEditing;

const clearCompleted = () => {
  const completedTodos = todos.filter((todo) => todo.completed);
  if (completedTodos.length > 0) {
    completedTodos.forEach((todo) => {
      removeTodo(todo.index);
      clearCompleted();
    });
  }
};

export {
  addTodo, getData, displayTodos, removeTodo, getIsEditing, saveEdit, clearCompleted,
};
