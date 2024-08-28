import api from "../configs/api"

const addCategory = async (data) => {
    const response = await api.post("category", data)
    return response
}
const getCategory = async (data) => {
    const response = await api.get("category", data)
    return response
}
const deleteCategory = async (id) => {
    const response = await api.delete(`category/${id}`)
    return response
}

export { addCategory, getCategory, deleteCategory }