import axios from "axios";
import getToken from "./token";

const createCategory = async (name) => {
  const token = await getToken();
  try {
    const response = await axios({
      method: "post",
      url: "/api/category/create",
      data: {
        name: name,
      },
      headers: {
        Authorization: token,
      },
    });
    if (response) {
      return {
        ...response,
      };
    }
  } catch (error) {
    return {
      ...error.response,
    };
  }
};

const getCategories = async () => {
  const token = await getToken();
  try {
    const response = await axios({
      method: "get",
      url: "/api/category",
      headers: {
        Authorization: token,
      },
    });
    if (response) {
      return { ...response };
    }
  } catch (error) {
    return { ...error.response };
  }
};

const getCategoriesByPage = async (page, keyword, searchOrder) => {
  const token = await getToken();
  try {
    const response = await axios({
      method: "get",
      url: `/api/category/page/${page}`,
      headers: {
        Authorization: token,
      },
      params: {
        keyword: keyword,
        order: searchOrder,
      },
    });
    if (response) {
      return { ...response };
    }
  } catch (error) {
    return { ...error.response };
  }
};

const updateCategory = async (id, name) => {
  const token = await getToken();
  try {
    const response = await axios({
      method: "put",
      url: `/api/category/update/${id}`,
      data: {
        name: name,
      },
      headers: {
        Authorization: token,
      },
    });
    if (response) {
      return { ...response };
    }
  } catch (error) {
    return { ...error.response };
  }
};

const deleteCategory = async (id) => {
  const token = await getToken();
  try {
    const response = await axios({
      method: "delete",
      url: `/api/category/delete/${id}`,
      headers: {
        Authorization: token,
      },
    });
    if (response) {
      return { ...response };
    }
  } catch (error) {
    return { ...error.response };
  }
};
export {
  createCategory,
  getCategories,
  getCategoriesByPage,
  updateCategory,
  deleteCategory,
};
