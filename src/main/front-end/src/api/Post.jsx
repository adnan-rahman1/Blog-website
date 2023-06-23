import axios from "axios";
import getToken from "./token";

const createPost = async (post) => {
  const token = await getToken();
  try {
    const response = await axios({
      method: "post",
      url: "/api/blog/create",
      data: {
        ...post,
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

const getAllPost = async () => {
  const token = await getToken();
  try {
    const response = await axios({
      method: "get",
      url: `/api/blog`,
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

const getPostsByPage = async (page, keyword, searchOrder) => {
  const token = await getToken();
  try {
    const response = await axios({
      method: "get",
      url: `/api/blog/page/${page}`,
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

const getFeaturedPosts = async () => {
  const token = await getToken();
  try {
    const response = await axios({
      method: "get",
      url: "/api/blog/featured",
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

const getPostDetails = async (id) => {
  const token = await getToken();
  try {
    const response = await axios({
      method: "get",
      url: `/api/blog/${id}`,
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

const updatePost = async (post) => {
  const token = await getToken();
  try {
    const response = await axios({
      method: "put",
      url: `/api/blog/update/${post.id}`,
      data: {
        ...post,
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

const deletePost = async (id) => {
  const token = await getToken();
  try {
    const response = await axios({
      method: "delete",
      url: `/api/blog/delete/${id}`,
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
  createPost,
  getAllPost,
  getPostsByPage,
  getFeaturedPosts,
  getPostDetails,
  updatePost,
  deletePost,
};
