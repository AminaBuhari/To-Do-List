/* eslint-disable no-use-before-define */
/* eslint-disable no-loop-func */
let addlists = [];
let isEditing = false;
let todoEdit = null;
const save = () => {
  localStorage.setItem('addlists', JSON.stringify(addlists));
};

const getData = () => {
  const listData = JSON.parse(localStorage.getItem('addlists'));
  if (listData == null) {
    addlists = [];
  } else {
    addlists = listData;
  }
};
const toggleListCheck = (todo) => {
  addlists = addlists.map((addlist_) => {
    if (addlist_.index === todo.index) {
      return { ...todo, completed: !addlist_.completed };
    }
    return addlist_;
  });
  save();
};

const displayList = () => {
  const listElement = document.getElementById('lists-todo');
  listElement.innerHTML = '';
  for (let i = 0; i < addlists.length; i += 1) {
    const todoElement = document.createElement('li');
    todoElement.classList.add('list');

    // todo-Content
    const todoContent = document.createElement('div');
    todoContent.classList.add('listblock');

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('name', 'checkbox');
    checkbox.checked = addlists[i].completed;
    checkbox.addEventListener('change', () => {
      toggleListCheck(addlists[i]);
    });

    const desc = document.createElement('p');
    desc.innerText = addlists[i].description;

    todoContent.appendChild(checkbox);
    todoContent.appendChild(desc);

    const listButton = document.createElement('div');
    listButton.classList.add('actions');
    const toEdit = document.createElement('button');
    toEdit.classList.add('edit');
    toEdit.classList.add('hide');
    toEdit.setAttribute('type', 'button');
    toEdit.innerHTML = '<i class="fa fa-edit"></i>';
    toEdit.addEventListener('click', () => {
      editTodo(addlists[i]);
    });

    const removeList = document.createElement('button');
    removeList.classList.add('delete');
    removeList.classList.add('hide');
    removeList.setAttribute('type', 'button');
    removeList.innerHTML = '<i class="fa fa-trash">';
    removeList.addEventListener('click', () => {
      removeTodo(addlists[i].index);
    });

    const settingBtn = document.createElement('button');
    settingBtn.classList.add('elipse');
    settingBtn.setAttribute('type', 'button');
    settingBtn.innerHTML = '<i class="fa fa-ellipsis-v"></i>';
    settingBtn.addEventListener('click', () => {
      toEdit.classList.toggle('hide');
      removeList.classList.toggle('hide');
    });

    listButton.appendChild(toEdit);
    listButton.appendChild(removeList);
    listButton.appendChild(settingBtn);

    todoElement.appendChild(todoContent);
    todoElement.appendChild(listButton);
    listElement.appendChild(todoElement);
  }
  save();
};

const addTodo = () => {
  const desc = document.querySelector('#input-todo');
  if (desc.value) {
    const completed = false;
    const description = desc.value;
    const index = addlists.length + 1;
    addlists.push({ completed, description, index });
    displayList();
    save();
    desc.value = null;
  }
};

const editTodo = (todo) => {
  isEditing = true;
  todoEdit = todo;
  const desc = document.querySelector('#input-todo');
  desc.value = todo.description;
  desc.focus();
};

const saveEdit = () => {
  const desc = document.querySelector('#input-todo');
  if (desc.value) {
    addlists = addlists.map((todo) => {
      if (todo.index === todoEdit.index) {
        return { ...todo, description: desc.value };
      } return todo;
    });
    displayList();
    save();
    desc.value = null;
    isEditing = false;
    todoEdit = null;
  }
};

const removeTodo = (index_) => {
  addlists.splice((index_ - 1), 1);
  addlists = addlists.map(
    (todo, index) => (
      { completed: todo.completed, description: todo.description, index: index + 1 }
    ),
  );
  displayList();
};

const getEdit = () => isEditing;

const clearDoneList = () => {
  const completedaddlists = addlists.filter((todo) => todo.completed);
  if (completedaddlists.length > 0) {
    completedaddlists.forEach((todo) => {
      removeTodo(todo.index);
      clearDoneList();
    });
  }
};

export {
  addTodo, getData, displayList, removeTodo, getEdit, saveEdit, clearDoneList, editTodo,
};
