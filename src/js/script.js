const itemTemplate = document.querySelector("#list-item-template");
const list = document.querySelector("#list-container");

const items = [];

function storeItems() {
  localStorage.setItem('todo-list', JSON.stringify(items));
}

function loadItems() {
  let storedItems = localStorage.getItem('todo-list');
  if (!storedItems) {
    return [
      { title: 'Register in CaseLab JS', checked: false },
      { title: 'Take the JS test', checked: false },
      { title: 'Complete test task', checked: false },
      { title: 'Share Github repository', checked: false },
      { title: 'Get an internship at Green Atom', checked: false }
    ];
  }

  storedItems = JSON.parse(storedItems);
  return storedItems;
}

function displayItem(item, atTop = false) {
  if (atTop) {
    items.unshift(item);
  } else {
    items.push(item);
  }

  const itemNode = itemTemplate.content.firstElementChild
    .cloneNode(true);

  const itemTitle = itemNode.querySelector('.list-item__title > *');
  itemTitle.innerText = item.title;

  if (item.checked) {
    itemNode.classList.add('list-item_checked');
  }
  
  itemNode.addEventListener('click', (e) => {
    item.checked = !item.checked;
    storeItems();
    if (item.checked) {
      itemNode.classList.toggle('list-item_checked');
    } else {
      itemNode.classList.remove('list-item_checked');
    }
  });

  const itemCross = itemNode.querySelector('.list-item__cross');
  itemCross.innerText = '\u00d7';

  if (atTop) {
    list.prepend(itemNode);
  } else {
    list.appendChild(itemNode);
  }
}


const addTodoButton = document.querySelector("#todo-add-button");
const addTodoInput = document.querySelector("#todo-input-box");

function addItem() {
  const title = addTodoInput.value;
  if (!title) {
    return;
  }

  const newItem = {
    title, 
    checked: false, 
  };
  displayItem(newItem, false);
  storeItems();

  addTodoInput.value = '';
}

addTodoButton.addEventListener('click', () => {
  addItem();
});



const currentItems = loadItems();
currentItems
  .forEach((item) => {
    displayItem(item);
  });