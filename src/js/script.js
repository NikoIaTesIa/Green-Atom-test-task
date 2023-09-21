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

function displayItem(item) {
  items.push(item);

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

  list.appendChild(itemNode);
}

const currentItems = loadItems();
currentItems
  .forEach((item) => {
    displayItem(item);
  });