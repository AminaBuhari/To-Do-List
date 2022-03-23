import './style.css';

const listElement = document.getElementById('lists-todo');
const lists = [
  {
    index: 1,
    description: 'lorem',
    completed: false,
  },
  {
    index: 2,
    description: 'Wash',
    completed: false,
  },
];

lists.forEach((list) => {
  const listHTML = `<li class="list">
<div class="listblock">
  <input type="checkbox" name="checkbox" />
  <p>${list.description}</p>
</div>
<button class="elipse"><i class="fa fa-ellipsis-v"></i></button>
</li>`;
  listElement.insertAdjacentHTML('beforeend', listHTML);
});

window.onload = () => {

};