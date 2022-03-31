/*
 * @jest-environment jsdom
 */

import { addTodo, removeTodo } from './function.js';

describe('add a number', () => {
  test('Add one new item to the list', () => {
    document.body.innerHTML = `<div class="list-container">
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
        <li class= "list"></li>
        </ul>
        <button class="clear" type="button" id="clear">
            Clear all completed
        </button>
        </div>`;

    const list = document.querySelectorAll('.list');
    expect(list).toHaveLength(1);
  });
})

describe('remove a number', () => {
  test('remove todo list', () => {
    document.body.innerHTML = `<div class="list-container">
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
        <ul class="lists" id="lists-todo"></ul>
        <li class= "list"></li>
        <button class="clear" type="button" id="clear">
            Clear all completed
        </button>
        </div>`;

    removeTodo();
    const list = document.querySelectorAll('.lists');
    expect(list).toHaveLength(list.length-1);
  });
});
