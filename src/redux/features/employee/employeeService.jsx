import axios from 'axios';
import fileDownload from 'js-file-download';

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
    // console.log(response.data)
    return response.data;
};

//Update an Employee
export const updateEmployee = async (id, formData) => {
    const response = await axios.patch(`${API_URL}${id}`, formData);
    return response.data;
};

// Get all documents of an employee
export const getDocuments = async (employeeId) => {
    const response = await axios.get(`${API_URL}${employeeId}/documents`);
    // console.log(response.data)
    // console.log(employeeId)
    return response.data;
  };
  
  // Get a specific document of an employee
  export const getDocument = async (employeeId, documentId) => {
    const response = await axios.get(`${API_URL}${employeeId}/documents/${documentId}`);
    return response.data;
  };
  
  // Update a document of an employee
  export const updateDocument = async (employeeId, documentId, documentData) => {
    const response = await axios.put(`${API_URL}${employeeId}/documents/${documentId}`, documentData);
    return response.data;
  };
  
  // Delete a document of an employee
  export const deleteDocument = async (employeeId, documentId) => {
    const response = await axios.delete(`${API_URL}${employeeId}/documents/${documentId}`);
    return response.data;
  };

  // Create a document of an employee
  export const addDocument = async (employeeId, documentData) => {
    try {
      const response = await axios.post(`${API_URL}${employeeId}/documents`, documentData);
      return response.data;
    } catch (error) {
      throw new Error(`Error al agregar el documento: ${error.message}`);
    }
  };

  // Download a document of an employee
export const downloadDocument = async (employeeId, documentId) => {
  const response = await axios.get(`${API_URL}${employeeId}/documents/${documentId}/download`);
  return response.data;
};

const employeeService = { 
    createEmployee, 
    getAllEmployees, 
    deleteEmployee, 
    getEmployee, 
    updateEmployee,
    getDocuments,
    getDocument,
    updateDocument,
    deleteDocument,
    addDocument,
    downloadDocument 
};

export default employeeService;