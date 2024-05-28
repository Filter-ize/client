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
      return await employeeService.deleteEmployee(id);
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

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    CALC_PROFESSIONS(state, action) {
      const employees = action.payload;
      const array = [];
      if (Array.isArray(employees)) {
        employees.map((employee) => {
          const { profession } = employee;
          return array.push(profession);
        });
        const uniqueProfession = [...new Set(array)];
        state.professions = uniqueProfession;
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
      });
  },
});

export const { CALC_PROFESSIONS } = employeeSlice.actions;

export const selectIsLoading = (state) => state.employee.isLoading;
export const selectEmployee = (state) => state.employee.employee;
export const selectEmployees = (state) => state.employee.employees;
export const selectProfessions = (state) => state.employee.professions;
export const selectSpecializations = (state) => state.employee.specializations;

export default employeeSlice.reducer;
