import './style.css';
import {
  addTodo, displayList, getData, getEdit, saveEdit,
} from './function.js';
import clearAll from './completed.js';

window.onload = () => {
  getData();
  displayList();
};

const reload = document.getElementById('reload');
reload.addEventListener('click', () => {
  window.location.reload();
});

const desc = document.querySelector('#input-todo');
desc.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    if (!getEdit())addTodo();
    else saveEdit();
  }
});


clearAll();



