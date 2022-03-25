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

const getIsEditing = () => isEditing;

const clearCompleted = () => {
  const completedTodos = addlists.filter((todo) => todo.completed);
  if (completedTodos.length > 0) {
    completedTodos.forEach((todo) => {
      removeTodo(todo.index);
      clearCompleted();
    });
  }
};

export {
  addTodo, getData, displayList, removeTodo, getIsEditing, saveEdit, clearCompleted,
};
