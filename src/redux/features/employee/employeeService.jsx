import axios from "axios";
import fileDownload from "js-file-download";


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
  const response = await axios.get(
    `${API_URL}${employeeId}/documents/${documentId}`
  );
  return response.data;
};

// Update a document of an employee
export const updateDocument = async (employeeId, documentId, documentData) => {
  const formData = new FormData();
  Object.keys(documentData).forEach((key) => {
    if (key === "file") {
      formData.append("file", documentData[key]);
    } else {
      formData.append(key, documentData[key]);
    }
  });

  const response = await axios.put(
    `${API_URL}${employeeId}/documents/${documentId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

// Delete a document of an employee
export const deleteDocument = async (employeeId, documentId) => {
  const response = await axios.delete(
    `${API_URL}${employeeId}/documents/${documentId}`
  );
  return response.data;
};

// Create a document of an employee
export const addDocument = async (employeeId, documentData) => {
  const response = await axios.post(`${API_URL}${employeeId}/documents`, documentData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};

// Download a document of an employee
export const downloadDocument = async (employeeId, documentId, title) => {
  try {
    const response = await axios.get(
      `${API_URL}${employeeId}/documents/${documentId}/download`,
      {
        responseType: "blob",
      }
    );
    const contentDisposition = response.headers["content-disposition"];
    console.log(title)
    let filename = `${title}.pdf`;
    if (contentDisposition) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(contentDisposition);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, "");
      }
    }
    fileDownload(response.data, filename);
  } catch (error) {
    throw new Error(`Error al descargar el documento: ${error.message}`);
  }
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
  downloadDocument,
};

export default employeeService;
