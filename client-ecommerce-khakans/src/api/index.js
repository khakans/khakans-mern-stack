import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api/users',
})

export const insertItem = payload => api.post(`/Item`, payload)
export const getAllItem = () => api.get(`/Item`)
export const updateItemById = (id, payload) => api.put(`/Item/${id}`, payload)
export const deleteItemById = id => api.delete(`/Item/${id}`)
export const getItemById = id => api.get(`/Item/${id}`)

const apis = {
    insertItem,
    getAllItem,
    updateItemById,
    deleteItemById,
    getItemById,
}

export default apis