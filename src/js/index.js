const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    const data = localStorage.getItem("menu");
    return JSON.parse(data);
  },
};

function App() {
  const menu = [];

  const menuForm = document.getElementById("espresso-menu-form");
  const menuFromInput = document.getElementById("espresso-menu-name");
  const menuList = document.getElementById("espresso-menu-list");
  const menuCount = document.querySelector(".menu-count");

  menuForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const menuName = menuFromInput.value;
    if (menuName == "") return;
    menu.push({ name: menuName });
    store.setLocalStorage(menu);
    renderMenuList();
  });

  menuList.addEventListener("click", (event) => {
    const clickedMenuItem = event.target.parentElement;
    if (event.target.classList.contains("menu-edit-button")) {
      updateMenuName(clickedMenuItem);
    }
    if (event.target.classList.contains("menu-remove-button")) {
      removeMenuName(clickedMenuItem);
    }
  });

  const updateMenuName = (clickedMenuItem) => {
    const menuId = clickedMenuItem.dataset.menuId;
    const menuNameItem = clickedMenuItem.querySelector(".menu-name");
    const menuName = menuNameItem.innerText;
    const newMenuName = prompt("수정할 메뉴 이름을 적어주세요.", menuName);
    menu[menuId].name = newMenuName;
    store.setLocalStorage(menu);
    renderMenuList();
  };

  const removeMenuName = (clickedMenuItem) => {
    const menuId = clickedMenuItem.dataset.menuId;
    const menuName = clickedMenuItem.querySelector(".menu-name").innerText;
    if (confirm(`${menuName}을 삭제할까요?`)) {
      menu.splice(menuId, 1);
      store.setLocalStorage(menu);
      renderMenuList();
    }
  };

  const menuItemTemplate = (menu, index) => {
    return `
    <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${menu.name}</span>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      >
        수정
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      >
        삭제
      </button>
    </li>`;
  };

  const renderMenuList = () => {
    const template = menu
      .map((item, index) => {
        return menuItemTemplate(item, index);
      })
      .join("");
    menuList.innerHTML = template;
    updateMenuCount();
  };

  const updateMenuCount = () => {
    const menuCountNum = menuList.querySelectorAll("li").length;
    menuCount.innerText = `총 ${menuCountNum}개`;
    menuFromInput.value = "";
  };
}

App();
