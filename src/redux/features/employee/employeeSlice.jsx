import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeService from "./employeeService";
import { toast } from "react-toastify";

const initialState = {
  employee: [],
  employees: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  professions: [],
  specializations: [],
  documents:[]
};

//Create new employee
export const createEmployee = createAsyncThunk(
  "employee/create",
  async (formData, thunkAPI) => {
    try {
      return await employeeService.createEmployee(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      //console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get all employees
export const getAllEmployees = createAsyncThunk(
  "employee/getAll",
  async (_, thunkAPI) => {
    try {
      return await employeeService.getAllEmployees();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      //console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete an employee
export const deleteEmployee = createAsyncThunk(
  "employee/delete",
  async (id, thunkAPI) => {
    try {
      const response = await employeeService.deleteEmployee(id);
      // console.log(response)
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      //console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get an employee
export const getEmployee = createAsyncThunk(
  "employee/getEmployee",
  async (id, thunkAPI) => {
    try {
      return await employeeService.getEmployee(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      //console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Update an employee
export const updateEmployee = createAsyncThunk(
  "employee/updateEmoloyee",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await employeeService.updateEmployee(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      //console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all documents of an employee
export const getDocuments = createAsyncThunk(
  "employee/getDocuments",
  async (employeeId, thunkAPI) => {
    try {
      const response = await employeeService.getDocuments(employeeId);
      // console.log(response)
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get a specific document of an employee
export const getDocument = createAsyncThunk(
  "employee/getDocument",
  async ({ employeeId, documentId }, thunkAPI) => {
    try {
      return await employeeService.getDocument(employeeId, documentId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update a document of an employee
export const updateDocument = createAsyncThunk(
  "employee/updateDocument",
  async ({ employeeId, documentId, formData }, thunkAPI) => {
    try {
      return await employeeService.updateDocument(employeeId, documentId, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a document of an employee
export const deleteDocument = createAsyncThunk(
  "employee/deleteDocument",
  async ({ employeeId, documentId }, thunkAPI) => {
    try {
      return await employeeService.deleteDocument(employeeId, documentId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    CALC_PROFESSIONS(state, action) {
      const employees = action.payload;
      const array = [];
      if (Array.isArray(employees)) {
        employees.forEach((employee) => {
          const { profession } = employee;
          array.push(profession);
        });
        const uniqueProfessions = [...new Set(array)];
        state.professions = uniqueProfessions;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        // state.employee.push(action.payload); esto es cuando se considera un array y no un objeto
        state.employee = action.payload;
        toast.success("Perfil de empleado creado satisfactoriamente");
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(getAllEmployees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        //console.log(action.payload);
        state.employees = action.payload;
      })
      .addCase(getAllEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        //const id = action.meta.arg;
        //state.employees = state.employees.filter((employee) => employee.id !== id);
        toast.success("Perfil de empleado eliminado satisfactoriamente");
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.employee = action.payload;
      })
      .addCase(getEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // state.employee = action.payload;
        toast.success("Perfil de empleado actualizado satisfactoriamente");
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getDocuments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDocuments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.documents = action.payload; // Actualizar documentos correctamente
      })
      .addCase(getDocuments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getDocument.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        // Actualizar documento de employee correctamente
        state.employee = {
          ...state.employee,
          document: action.payload
        };
      })
      .addCase(getDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateDocument.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Documento actualizado satisfactoriamente");

        // Actualizar documentos de employee correctamente
        state.employee = {
          ...state.employee,
          documents: state.employee.documents.map(doc => 
            doc.id === action.payload.id ? action.payload : doc
          )
        };
      })
      .addCase(updateDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteDocument.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Documento eliminado satisfactoriamente");

        // Eliminar documento de employee correctamente
        state.employee = {
          ...state.employee,
          documents: state.employee.documents.filter(doc =>
            doc.id !== action.payload.id
          )
        };
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { CALC_PROFESSIONS } = employeeSlice.actions;

export const selectIsLoading = (state) => state.employee.isLoading;
export const selectEmployee = (state) => state.employee.employee;
export const selectEmployees = (state) => state.employee.employees;
export const selectProfessions = (state) => state.employee.professions;
export const selectSpecializations = (state) => state.employee.specializations;
export const selectDocuments = (state) => state.employee.documents;

export default employeeSlice.reducer;
