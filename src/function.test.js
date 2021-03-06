/*
 * @jest-environment jsdom
 */

import {
  addTodo, removeTodo, editTodo, saveEdit, toggleListCheck, clearDoneList,
} from './function.js';

let before;
let after;
let inputText;
const ourHtml = `
<div class="list-container">
    <div class="header">
        <h1>Today's To Do</h1>
        <button type="button" id="reload">
        <i class="fa fa-refresh"></i>
        </button>
    </div>
    <input
        type="text"
        name=" text"
        class="input-todo"
        id="input-todo"
        placeholder="Add to your list..."
    />
    <ul class="lists" id="lists-todo">
    </ul>
    <button class="clear" type="button" id="clear">
        Clear all completed
    </button>
</div>
`;

describe('add a number', () => {
  beforeAll(() => {
    document.body.innerHTML = ourHtml;
    before = document.querySelectorAll('#lists-todo li');
    inputText = document.getElementById('input-todo');
    inputText.value = 'Mock Test';
    addTodo();
  });

  test('Add one new item to the list', () => {
    after = document.querySelectorAll('#lists-todo li');
    expect(after).toHaveLength((before.length + 1));
  });

  test('Add one new item into Local Storage', () => {
    const arr = JSON.parse(localStorage.addlists);
    expect(arr.length).toBe((before.length + 1));
  });
});

describe('delete a number', () => {
  beforeAll(() => {
    document.body.innerHTML = ourHtml;
    inputText = document.getElementById('input-todo');
    inputText.value = 'Mock Test';
  });

  beforeEach(() => {
    addTodo();
    before = document.querySelectorAll('#lists-todo li');
    removeTodo(1);
  });

  test('delete one new item to the list', () => {
    after = document.querySelectorAll('#lists-todo li');
    expect(after).toHaveLength((before.length - 1));
  });

  test('Remove one item from Local Storage', () => {
    const arr = JSON.parse(localStorage.addlists);
    expect(arr).toHaveLength((before.length - 1));
  });
});

describe('Edit the todo', () => {
  beforeAll(() => {
    document.body.innerHTML = ourHtml;
    inputText = document.getElementById('input-todo');
    inputText.value = 'Mock Test';
    addTodo();
    const arr = JSON.parse(localStorage.addlists);
    editTodo(arr[0]);
  });

  test('edit the test', () => {
    const arr = JSON.parse(localStorage.addlists);
    expect(arr[0].description).toEqual(inputText.value);
  });

  test('edit the test', () => {
    saveEdit();
    const arr = JSON.parse(localStorage.addlists);
    expect(arr[0].description).not.toEqual(inputText.value);
  });
});

describe('Update the status of the todo', () => {
  beforeAll(() => {
    document.body.innerHTML = ourHtml;
    inputText = document.getElementById('input-todo');
    inputText.value = 'Mock Test';
    addTodo();
  });

  test('check default status', () => {
    const arr = JSON.parse(localStorage.addlists);
    expect(arr[0].completed).toBe(false);
  });

  test('check updated status', () => {
    const arr = JSON.parse(localStorage.addlists);
    toggleListCheck(arr[0]);
    const array = JSON.parse(localStorage.addlists);
    expect(array[0].completed).toBe(true);
  });
});

describe('Clear all completed todos', () => {
  test('check updated status', () => {
    clearDoneList();
    const arr = JSON.parse(localStorage.addlists);
    expect(arr.length).toBe(1);
  });
});