import axios from "axios";
import { generateQeury } from '../services/apiServices'

const api = axios.create({
    baseURL: process.env.baseURL || 'http://localhost:8000/',
});

export const addTask = async (task , filter, orderBy, order, page, tpp) => {
    const query =  generateQeury(filter,orderBy,order, page, tpp);
    try {
        const { data } = await api.post(
            `api/add-task`+ query,
            task
        );
        return data;
    } catch (error) {
        throw Error(error.response.data.message);
    }
};

export const updateTask = async (task , filter, orderBy, order, page, tpp) => {
    const query =  generateQeury(filter,orderBy,order, page, tpp);
    try {
        const { data } = await api.put(
            `/api/update-task/${task.id}`+ query,
            task
        );
        return data;
    } catch (error) {
        throw Error(error.response.data.message);
    }
};


export const deleteTask = async (id, filter, orderBy, order, page, tpp) => {
    try {
        const query =  generateQeury(filter,orderBy,order, page, tpp);
        const { data } = await api.delete(
            `/api/delete-task/${id}`+query,
        );
        return data;
    } catch (error) {
        throw Error(error.response.data.message);
    }
};

export const fetchTasks = async (filter, orderBy, order, page, tpp ) => {
    try {
        const query =  generateQeury(filter,orderBy,order,page,tpp);
        const { data } = await api.get(`/api/tasks`+ query);
        return data;
    } catch (error) {
        throw Error(error.response.data.message);
    }
};

