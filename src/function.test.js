/*
 * @jest-environment jsdom
 */

import { addTodo, removeTodo } from './function.js';

// const fs = require('fs');

let before;
let after;
let inputText;

describe('add a number', () => {
  // beforeAll(() => {
  // document.body.innerHTML = fs.readFileSync('dist/index.html');
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
  // });

  test('Add one new item to the list', () => {
    after = document.querySelectorAll('#lists-todo li');
    expect(after).toHaveLength((before.length + 1));
  });
})

// describe('remove a number', () => {
//   test('remove todo list', () => {
//     document.body.innerHTML = `<div class="list-container">
//         <div class="header">
//             <h1>Today's To Do</h1>
//             <button type="button" id="reload">
//             <i class="fa fa-refresh"></i>
//             </button>
//         </div>
//         <input
//             type="text"
//             name=" text"
//             class="input-todo"
//             id="input-todo"
//             placeholder="Add to your list..."
//         />
//         <ul class="lists" id="lists-todo"></ul>
//         <li class= "list"></li>
//         <button class="clear" type="button" id="clear">
//             Clear all completed
//         </button>
//         </div>`;

//     removeTodo();
//     const list = document.querySelectorAll('.lists');
//     expect(list).toHaveLength(list.length-1);
//   });
// });
