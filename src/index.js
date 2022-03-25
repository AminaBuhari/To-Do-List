import './style.css';
import {
  addTodo, displayList, getData, getIsEditing, saveEdit, clearCompleted,
} from './function.js';

window.onload = () => {
  getData();
  displayList();
};

const refreshBtn = document.getElementById('reload');
refreshBtn.addEventListener('click', () => {
  window.location.reload();
});

const desc = document.querySelector('#input-todo');
desc.addEventListener('keyup', (event) => {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    event.preventDefault();
    if (!getIsEditing())addTodo();
    else saveEdit();
  }
});

const clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', () => {
  clearCompleted();
});
