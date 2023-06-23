import axios from "axios";
import getToken from "./token";

const getAllImages = async () => {
    const token = await getToken();
    try {
        const response = await axios({
            method: "get",
            url: "/api/picture",
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

const uploadImage = async (image, storeImgStruct) => {
    const token = await getToken();
    try {
        const data = new FormData();
        data.append("file", image);
        data.append("section", storeImgStruct.section);
        data.append("directory", storeImgStruct.directory);
        const response = await axios({
            method: "post",
            url: "/api/picture/add",
            data,
            headers: {
                "Authorization": token,
                'Content-Type': 'multipart/form-data'
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
const deleteImage = async (id) => {
    const token = await getToken();
    try {
        const response = await axios({
            method: "delete",
            url: `/api/picture/delete/${id}`,
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
    getAllImages,
    uploadImage,
    deleteImage
}