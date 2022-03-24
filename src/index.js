import './style.css';
class List {
  constructor (todo) {
    this.todo = todo;
  }
}

class Alltodo {
  constructor (lists) {
    this.lists = lists;
  }

  addTodo(list){
    this.lists.push(list)
    this.save()
  }

  removeList(list) {
   const listIndex = this.lists.findIndex((listItem) => listItem === list)
   this.lists.splice(listIndex, 1);
   this.save()
  }
  save() {
    localStorage.setItem('lists', JSON.stringify(this.lists));
  }

  getsave() {
    return JSON.parse(localStorage.getItems('lists'))
  }

  showList() {
    for (let i = 0; i < this.lists.length; i += 1) {
      document.getElementById('lists-todo').innerHTML += 
       `<li class="list">
      <div class="listblock">
        <input type="checkbox" name="checkbox" />
        <p>${this.lists[i].todo}</p>
      </div>
      <button class="elipse"><i class="fa fa-ellipsis-v"></i></button>
      </li>`;  
    }
  }
}
 
let listData = new Alltodo(JSON.parse(localStorage.getItem('lists'))??[]);
listData.showList();

const addList = document.querySelector('input');
addList.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    if (addList.value !== null) {
    let list = new List(addList.value);
    addList.addTodo(list);
    addList.reset();
  }
  }
});

