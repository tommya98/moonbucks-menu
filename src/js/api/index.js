const BASE_URL = "http://localhost:3000/api";

const HTTP_METHOD = {
  POST(data) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  },
  PUT(data) {
    return {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    };
  },
  DELETE() {
    return {
      method: "DELETE",
    };
  },
};

const request = async (url, option) => {
  try {
    const response = await fetch(url, option);
    return await response.json();
  } catch (error) {
    alert(error.message);
  }
};

const requestWithOutJson = async (url, option) => {
  try {
    const response = await fetch(url, option);
    return response;
  } catch (error) {
    alert(error.message);
  }
};

const MenuApi = {
  postNewMenu: async (category, name) => {
    return await request(
      `${BASE_URL}/category/${category}/menu`,
      HTTP_METHOD.POST({ name })
    );
  },
  getAllMenuByCategory: async (category) => {
    return await request(`${BASE_URL}/category/${category}/menu`);
  },
  putChnagedMenuName: async (category, name, menuId) => {
    return await request(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      HTTP_METHOD.PUT({ name })
    );
  },
  deleteMenu: async (category, menuId) => {
    return await requestWithOutJson(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      HTTP_METHOD.DELETE()
    );
  },
  putMenuSoldout: async (category, menuId) => {
    return await request(
      `${BASE_URL}/category/${category}/menu/${menuId}/soldout`,
      HTTP_METHOD.PUT()
    );
  },
};

export default MenuApi;
