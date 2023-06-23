import axios from "axios";
import getToken from "./token";

const getCurrentUser = async (token) => {
    try {
        const response = await axios({
            url: "/api/user/current-user",
            method: "get",
            headers: {
                "Authorization": token
            }
        })
        if (response) {
            return { ...response }
        }
    } catch (err) {
        return {
            ...err.response
        }
    }
}

const updateUserInfo = async (user) => {
    const token = await getToken();
    try {
        const response = await axios({
            method: "put",
            url: `/api/user/update/${user.id}`,
            data: {
               ...user
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

const authenticateUser = async (email, password) => {
    const token = await getToken();

    try {
        const response = await axios({
            method: "post",
            url: "/api/user/authenticate",
            data: {
                email,
                password
            },
            headers: {
                "Authorization": token
            }
        });
        if (response) {
            return { ...response }
        }
    } catch (error) {
        return { ...error.response };
    }
}
const userForgetPassword = async (email) => {
    try {
        const response = await axios({
            method: "post",
            url: "/api/user/forget/password",
            params: {
                email,
            },
        });
        if (response) {
            return { ...response }
        }
    } catch (error) {
        return { ...error.response };
    }
}

export {
    getCurrentUser,
    updateUserInfo,
    authenticateUser,
    userForgetPassword
}