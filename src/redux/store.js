import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import employeeReducer from './features/employee/employeeSlice';
import filterReducer from './features/employee/filterSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        employee: employeeReducer,
        filter: filterReducer
    }
})