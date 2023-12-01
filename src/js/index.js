import MenuApi from "./api/index.js";

function App() {
  const menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  let currentCategory = "espresso";

  const menuForm = document.getElementById("menu-form");
  const menuFromInput = document.getElementById("menu-name");
  const menuList = document.getElementById("menu-list");
  const menuCount = document.querySelector(".menu-count");
  const menuNav = document.querySelector("nav");
  const menuHeading = document.querySelector(".heading h2");

  const updateMenuName = async (clickedMenuItem) => {
    const menuId = clickedMenuItem.dataset.menuId;
    const menuNameItem = clickedMenuItem.querySelector(".menu-name");
    const menuName = menuNameItem.innerText;
    const newMenuName = prompt("수정할 메뉴 이름을 적어주세요.", menuName);
    await MenuApi.putChnagedMenuName(currentCategory, newMenuName, menuId);
    await renderMenuList();
  };

  const removeMenuName = async (clickedMenuItem) => {
    const menuId = clickedMenuItem.dataset.menuId;
    const menuName = clickedMenuItem.querySelector(".menu-name").innerText;
    if (confirm(`${menuName}을 삭제할까요?`)) {
      await MenuApi.deleteMenu(currentCategory, menuId);
      renderMenuList();
    }
  };

  const soldOutMenu = async (clickedMenuItem) => {
    const menuId = clickedMenuItem.dataset.menuId;
    await MenuApi.putMenuSoldout(currentCategory, menuId);
    renderMenuList();
  };

  const menuItemTemplate = (menu) => {
    return `
    <li data-menu-id="${
      menu.id
    }" class=" menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name ${menu.isSoldOut ? "sold-out" : ""}">${
      menu.name
    }</span>
        <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
      >
        품절
      </button>
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

  const renderMenuList = async () => {
    const data = await MenuApi.getAllMenuByCategory(currentCategory);
    menu[currentCategory] = data;
    const template = menu[currentCategory]
      .map((item) => {
        return menuItemTemplate(item);
      })
      .join("");
    menuList.innerHTML = template;
    menuFromInput.value = "";
    updateMenuCount();
  };

  const updateMenuCount = () => {
    const menuCountNum = menu[currentCategory].length;
    menuCount.innerText = `총 ${menuCountNum}개`;
  };

  const changeCategory = async (event) => {
    const isCategoryBtn = event.target.classList.contains("cafe-category-name");
    if (!isCategoryBtn) return;
    const categoryNameEn = event.target.dataset.categoryName;
    const categoryNameKr = event.target.innerText;
    currentCategory = categoryNameEn;
    await renderMenuList();
    menuHeading.innerText = `${categoryNameKr} 메뉴 관리`;
  };

  const addMenu = async (event) => {
    event.preventDefault();
    const menuName = menuFromInput.value;
    if (menuName == "") return;
    const duplicatedItem = menu[currentCategory].find(
      (menuItem) => menuItem.name === menuName
    );
    if (duplicatedItem) {
      alert("이미 존재하는 메뉴입니다. 다시 입력해주세요.");
      await renderMenuList();
      return;
    }
    await MenuApi.postNewMenu(currentCategory, menuName);
    await renderMenuList();
  };

  const initEventListener = () => {
    menuNav.addEventListener("click", changeCategory);
    menuForm.addEventListener("submit", addMenu);
    menuList.addEventListener("click", async (event) => {
      const clickedMenuItem = event.target.parentElement;
      if (event.target.classList.contains("menu-edit-button")) {
        await updateMenuName(clickedMenuItem);
        return;
      }
      if (event.target.classList.contains("menu-remove-button")) {
        removeMenuName(clickedMenuItem);
        return;
      }
      if (event.target.classList.contains("menu-sold-out-button")) {
        soldOutMenu(clickedMenuItem);
        return;
      }
    });
  };

  (async () => {
    const data = await MenuApi.getAllMenuByCategory(currentCategory);
    menu[currentCategory] = data;
    await renderMenuList();
    initEventListener();
  })();
}

App();
