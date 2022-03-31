/*
 * @jest-environment jsdom
 */

import { addTodo, removeTodo, getData } from './function.js';

let before;
let after;
let inputText;

describe('add a number', () => {
  beforeAll(() => {
    document.body.innerHTML = `
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
    document.body.innerHTML = `
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
})
