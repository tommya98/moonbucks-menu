function App() {
  const menuForm = document.getElementById("espresso-menu-form");
  const menuFromInput = document.getElementById("espresso-menu-name");
  const menuList = document.getElementById("espresso-menu-list");
  const menuCount = document.querySelector(".menu-count");

  menuForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const menuName = menuFromInput.value;
    if (menuName == "") return;
    const menuItem = menuItemTemplate(menuName);
    menuList.insertAdjacentHTML("beforeend", menuItem);
    const menuCountNum = menuList.querySelectorAll("li").length;
    menuCount.innerText = `총 ${menuCountNum}개`;
    menuFromInput.value = "";
  });

  menuList.addEventListener("click", (event) => {
    const clickedMenuItem = event.target.parentElement;
    const menuNameItem = clickedMenuItem.querySelector(".menu-name");
    const menuName = menuNameItem.innerText;
    if (event.target.classList.contains("menu-edit-button")) {
      const newMenuName = prompt("수정할 메뉴 이름을 적어주세요.", menuName);
      menuNameItem.innerText = newMenuName;
    }
  });
}

const menuItemTemplate = (menuName) => {
  return `
  <li class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name">${menuName}</span>
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

App();
