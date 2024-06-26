import axios from 'axios';

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/cart/`;

// Create a new cart
export const createCart = async (formData) => {
    const response = await axios.post(API_URL, formData);
    return response.data;
};

// Add documents to a cart
export const addDocumentsToCart = async (id, formData) => {
    const response = await axios.put(API_URL + id + '/add', formData);
    return response.data;
};

// Get all carts
export const getAllCarts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Get a cart by ID
export const getCart = async (id) => {
    const response = await axios.get(API_URL + id);
    return response.data;
};

// Update a cart
export const updateCart = async (id, formData) => {
    const response = await axios.put(API_URL + id, formData);
    return response.data;
};

// Delete a cart
export const deleteCart = async (id) => {
    const response = await axios.delete(API_URL + id);
    return response.data;
};

// Remove a document from a cart
export const removeDocumentFromCart = async (id, formData) => {
    const response = await axios.put(API_URL + id + '/remove', formData);
    return response.data;
};

// Download documents from a cart
export const downloadCartDocuments = async (id) => {
    const response = await axios.get(API_URL + id + '/download', {responseType: "blob"});
    return response.data;
};

const documentCartService = { 
    createCart, 
    addDocumentsToCart,
    getAllCarts, 
    getCart, 
    updateCart, 
    deleteCart,
    removeDocumentFromCart,
    downloadCartDocuments
};

export default documentCartService;