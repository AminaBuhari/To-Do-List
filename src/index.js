import './style.css';
const addList = document.querySelector('input');
let isEditing = false;
let editTodo = null;

class Todo{
  constructor ({index, description, completed}) {
    this.index =index;
    this.description= description;
    this.completed=completed ;
  }
}

class Alltodo {


  lists = [];
  constructor (lists) {
    this.lists = lists;
  }

  addTodo(todo){
    this.lists.push(todo)
    this.save()
  }

  removeList(list) {
   this.lists.splice(list.index-1, 1);
   this.save()
  }
  save() {
    localStorage.setItem('lists', JSON.stringify(this.lists));
  }

  getsave() {
    
    return JSON.parse(localStorage.getItems('lists'))
  }

 
 editlist(todo) {
  isEditing = true;
  addList.value = todo.description;
  editTodo = todo;
  }

  

  saveEdit() {
    editTodo= null;
    isEditing = false;
    addList.value = null;
    listData.save(); 
 }

  showList() {
    for (let i = 0; i < this.lists.length; i += 1) {
      document.getElementById('lists-todo').innerHTML += 
       `<li class="list">
      <div class="listblock">
        <input type="checkbox" name="checkbox" value = ${this.lists[i].completed} />
        <p>${this.lists[i].description}</p>
      </div>
      <button class="elipse" id ="edit" onclick="${this.editlist(this.lists[i])}"><i class="fa fa-edit"></i></button>
      <button class="elipse" id ="delete"><i class="fa fa-trash"></i></button>
      <button class="elipse"><i class="fa fa-ellipsis-v"></i></button>
      </li>`;  
    }
  }
}


 
let listData = new Alltodo(JSON.parse(localStorage.getItem('lists'))??[]);
listData.showList();





addList.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    if (addList.value !== null) {
   if(!isEditing){
    let list = new Todo ({index:listData.lists.length+1, description: addList.value, completed:false});
    listData.addTodo(list);
   } else{
     
    listData.lists = listData.lists.map((todo)=>{
      if(todo.index === editTodo.index){
      return {...todo,description:  addList.value}
      }else{ return todo;
      }
    });
    
   }
   listData.saveEdit();
   } // window.location.reload()
  }
});

const reloadIcon = document.getElementById("reload");
reloadIcon.addEventListener ('click', (event) => {
  window.location.reload()

})

// onclick = "${this.removeList(this.lists[i])}"
// const edit = document.getElementById('edit'); 
// edit.addEventListener (('onclick', (event) => {
//   if ()
// });