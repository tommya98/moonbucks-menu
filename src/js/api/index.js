const BASE_URL = "http://localhost:3000/api";

const MenuApi = {
  postNewMenu: async (category, menuName) => {
    try {
      await fetch(`${BASE_URL}/category/${category}/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: menuName }),
      });
    } catch (error) {
      alert(error.message);
    }
  },
  getAllMenuByCategory: async (category) => {
    try {
      const response = await fetch(`${BASE_URL}/category/${category}/menu`);
      return response.json();
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  },
  putChnagedMenuName: async (category, menuName, menuId) => {
    try {
      await fetch(`${BASE_URL}/category/${category}/menu/${menuId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: menuName }),
      });
    } catch (error) {
      alert(error.message);
    }
  },
  deleteMenu: async (category, menuId) => {
    try {
      await fetch(`${BASE_URL}/category/${category}/menu/${menuId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      alert(error.message);
    }
  },
  putMenuSoldout: async (category, menuId) => {
    try {
      await fetch(`${BASE_URL}/category/${category}/menu/${menuId}/soldout`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      alert(error.message);
    }
  },
};

export default MenuApi;
