const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    const data = localStorage.getItem("menu");
    return JSON.parse(data);
  },
};

export default store;
