const addButton = document.getElementById('add-button');
const clearButton = document.getElementById('clear-completed-button');
const emptyButton = document.getElementById('empty-button');
const saveButton = document.getElementById('save-button');
const toDoEntryBox = document.getElementById('todo-entry-box');
const toDoList = document.getElementById('todo-list');

addButton.addEventListener('click', addToDoItem);
clearButton.addEventListener('click', clearCompletedToDoItems);
emptyButton.addEventListener('click', emptyList);
saveButton.addEventListener('click', saveList);

function addToDoItem() {
  const itemText = toDoEntryBox.value;
  newToDoItem(itemText, false);
}

function clearCompletedToDoItems() {
  var completedItems = toDoList.getElementsByClassName('completed');
  while (completedItems.length > 0) {
    completedItems.item(0).remove();
  }
}

function emptyList() {
  var toDoItems = toDoList.children;
  while (toDoItems.length > 0) {
    toDoItems.item(0).remove();
  }
}

function saveList() {
  var toDos = [];
  for (var i = 0; i < toDoList.children.length; i++) {
    let toDo = toDoList.children.item(i);
    let toDoInfo = {
      'task': toDo.innerText,
      'completed': toDo.classList.contains('completed')
    };
    toDos.push(toDoInfo);
  }
  localStorage.setItem('toDos', JSON.stringify(toDos));
}

function newToDoItem(itemText, completed) {
  var toDoItem = document.createElement('li');
  var toDoText = document.createTextNode(itemText);
  toDoItem.appendChild(toDoText);
  if (completed) {
    toDoItem.classList.add('completed');
  }
  toDoList.appendChild(toDoItem);
  toDoItem.addEventListener('dblclick', toggleToDoItemState);
}

function toggleToDoItemState() {
  if (this.classList.contains('completed')) {
    this.classList.remove('completed');
  } else {
    this.classList.add('completed');
  }
}

function loadList() {
  if (localStorage.getItem('toDos') != null) {
    var toDos = JSON.parse(localStorage.getItem('toDos'));
    for (var i = 0; i < toDos.length; i++) {
      var toDo = toDos[i];
      newToDoItem(toDo.task, toDo.completed);
    }
  }
}

loadList()
