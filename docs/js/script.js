
const itemTemplate = document.querySelector("#list-item-template");
const list = document.querySelector("#list-container");

const items = [];
const animationDuration = 800;

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

function displayItem(item, atTop = false, appear = false) {
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

      const index = items.indexOf(item);
      if (index !== items.length - 1) {
        itemNode.classList.remove('list-item_appear');
        itemNode.classList.add('list-item_disappear');
        setTimeout(() => {
          items.splice(index, 1);
          list.removeChild(itemNode);
  
          itemNode.classList.remove('list-item_disappear');
          itemNode.classList.add('list-item_appear');
          
          items.push(item);
          storeItems();
          list.appendChild(itemNode);
        }, animationDuration);
      }
    } else {
      itemNode.classList.remove('list-item_checked');
    }
  });

  const deleteButton = itemNode.querySelector('.list-item__delete-button');
  deleteButton.innerText = '\u00d7';
  deleteButton.addEventListener('click', (e) => {
    e.stopPropagation();

    itemNode.classList.add('list-item_disappear');
    setTimeout(() => {
      const index = items.indexOf(item);
      items.splice(index, 1);
      storeItems();
      list.removeChild(itemNode);
    }, animationDuration);
  });

  if (atTop) {
    list.prepend(itemNode);
  } else {
    list.appendChild(itemNode);
  }

  if (appear) {
    itemNode.classList.add('list-item_appear');
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
  displayItem(newItem, true, true);
  storeItems();

  addTodoInput.value = '';
}

addTodoButton.addEventListener('click', () => {
  addItem();
});

addTodoInput.addEventListener('keyup', (e) => {
  if (e.ctrlKey || e.altKey || e.shiftKey) {
    return;
  }

  if (e.key === 'Enter') {
    addItem();
  } else if (e.key === 'Escape') {
    addTodoInput.value = '';
  }
}, true);


function deleteItem(index) {
  if (items.length > 0) {
    const itemNodes = list.querySelectorAll('.list-item');

    itemNodes[index].classList.add('list-item_disappear');
    setTimeout(() => {
      items.splice(index, 1);
      storeItems();
      list.removeChild(itemNodes[index]);
    }, animationDuration);
  } else {
    return;
  }
}

const deleteFirstButton = document.querySelector(".menu__button_first");
deleteFirstButton.addEventListener('click', () => {
  deleteItem(0);
});

const deleteLastButton = document.querySelector(".menu__button_last");
deleteLastButton.addEventListener('click', () => {
  deleteItem(items.length - 1);
});

function clearList() {
  if (items.length > 0) {
    const itemNodes = list.querySelectorAll('.list-item');
    itemNodes.forEach(itemNode => itemNode.classList.add('list-item_disappear'));
    setTimeout(() => {
      items.splice(0, items.length);
      localStorage.clear();
      list.removeChild(itemNodes);
    }, animationDuration);
  } else {
    return;
  }
}

const clearListButton = document.querySelector(".menu__button_upper");
clearListButton.addEventListener('click', () => {
  clearList();
});

function selectOddItems() {
  const itemNodes = list.querySelectorAll('.list-item');
  for (var i = 1; i < itemNodes.length + 1; i++) {
    if (i % 2 == 1) {
      itemNodes[i - 1].classList.toggle('list-item_odd');
    }
  }
}

const selectOddButton = document.querySelector(".menu__button_odd");
selectOddButton.addEventListener('click', () => {
  selectOddItems();
});

function selectEvenItems() {
  const itemNodes = list.querySelectorAll('.list-item');
  for (var i = 1; i < itemNodes.length + 1; i++) {
    if (i % 2 == 0) {
      itemNodes[i - 1].classList.toggle('list-item_even');
    }
  }
}

const selectEvenButton = document.querySelector(".menu__button_even");
selectEvenButton.addEventListener('click', () => {
  selectEvenItems();
});


const currentItems = loadItems();
currentItems
  .forEach((item) => {
    displayItem(item);
  });