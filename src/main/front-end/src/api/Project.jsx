import axios from "axios";
import getToken from "./token";

const createProject = async (project) => {
    const token = await getToken();
    try {
        const response = await axios({
            method: "post",
            url: "/api/project/create",
            data: {
                ...project
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

const getProjects = async () => {
    const token = await getToken();
    try {
        const response = await axios({
            method: "get",
            url: "/api/project",
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

const updateProject = async (project) => {
    const token = await getToken();
    try {
        const response = await axios({
            method: "put",
            url: `/api/project/update/${project.id}`,
            data: {
                ...project
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

const deleteProject = async (id) => {
    const token = await getToken();
    try {
        const response = await axios({
            method: "delete",
            url: `/api/project/delete/${id}`,
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
    createProject,
    getProjects,
    updateProject,
    deleteProject
}