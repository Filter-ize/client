import axios from 'axios';

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/employees/`;

//Create New Employee
export const createEmployee = async (formData) => {
    const response = await axios.post(API_URL, formData);
    return response.data;
};

//Get All Employees
export const getAllEmployees = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

//Delete an Employee
export const deleteEmployee = async (id) => {
    const response = await axios.delete(API_URL + id);
    return response.data;
};

//Get an Employee
export const getEmployee = async (id) => {
    const response = await axios.get(API_URL + id);
    return response.data;
};

//Update an Employee
export const updateEmployee = async (id, formData) => {
    const response = await axios.patch(`${API_URL}${id}`, formData);
    return response.data;
};

const employeeService = { 
    createEmployee, 
    getAllEmployees, 
    deleteEmployee, 
    getEmployee, 
    updateEmployee 
};

export default employeeService;