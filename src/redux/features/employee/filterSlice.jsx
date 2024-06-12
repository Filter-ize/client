import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredEmployees: [],
  filteredDocuments: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_EMPLOYEES(state, action) {
      const { employees, search } = action.payload;
      const tempEmployees = employees.filter(
        (employee) =>
          (employee.name &&
            employee.name.toLowerCase().includes(search.toLowerCase())) ||
          (employee.specialization &&
            employee.specialization
              .toLowerCase()
              .includes(search.toLowerCase()))
      );

      state.filteredEmployees = tempEmployees;
    },
    FILTER_DOCUMENTS: (state, action) => {
      const { employee, search } = action.payload;

      if (employee && employee.documents) {
        const tempDocuments = employee.documents.filter(
          (document) =>
            (document.title &&
                document.title.toLowerCase().includes(search.toLowerCase())) ||
            (document.specialty &&
                document.specialty.toLowerCase().includes(search.toLowerCase()))
        );

        state.filteredDocuments = tempDocuments;
      } else {
        state.filteredDocuments = [];
      }
    },
  },
});

export const { FILTER_EMPLOYEES, FILTER_DOCUMENTS } = filterSlice.actions;

export const selectFilteredEmployees = (state) =>
  state.filter.filteredEmployees;
export const selectFilteredDocuments = (state) =>
  state.filter.filteredDocuments;

export default filterSlice.reducer;
