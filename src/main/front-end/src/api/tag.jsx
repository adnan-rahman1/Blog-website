import axios from "axios";
import getToken from "./token";

const createTag = async (name) => {
    const token = await getToken();
    try {
        const response = await axios({
            method: "post",
            url: "/api/tag/create",
            data: {
                name: name
            },
            headers: {
                "Authorization": token
            }
        })
        if (response) {
            return {
                ...response
            }
        }
    } catch (error) {
        return {
            ...error.response
        }
    }
}

const getTags = async () => {
    const token = await getToken();
    try {
        const response = await axios({
            method: "get",
            url: "/api/tag",
            headers: {
                "Authorization": token
            }
        })
        if (response) {
            return { ...response }
        }
    } catch (error) {
        return { ...error.response }
    }
}

const getTagsByPage = async (page, keyword, searchOrder) => {
    const token = await getToken();
    try {
      const response = await axios({
        method: "get",
        url: `/api/tag/page/${page}`,
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

const updateTag = async (id, name) => {
    const token = await getToken();
    try {
        const response = await axios({
            method: "put",
            url: `/api/tag/update/${id}`,
            data: {
                name: name
            },
            headers: {
                "Authorization": token
            }
        })
        if (response) {
            return { ...response }
        }
    } catch (error) {
        return { ...error.response }
    }
}

const deleteTag = async (id) => {
    const token = await getToken();
    try {
        const response = await axios({
            method: "delete",
            url: `/api/tag/delete/${id}`,
            headers: {
                "Authorization": token
            }
        })
        if (response) {
            return { ...response }
        }
    } catch (error) {
        return { ...error.response }
    }
}

export {
    createTag,
    getTags,
    getTagsByPage,
    updateTag,
    deleteTag
}