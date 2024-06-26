import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader.jsx";
import DocumentForm from "../../components/document/documentForm/DocumentForm.jsx";
import {
  addDocument,
  selectIsLoading,
} from "../../redux/features/employee/employeeSlice.jsx";

import employeeService from "../../redux/features/employee/employeeService.jsx";

const initialState = {
  title: "",
  specialty: "",
  startDate: "",
  endDate: "",
  file: null,
};

const AddDocument = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [document, setDocument] = useState(initialState);
  const isLoading = useSelector(selectIsLoading);

  const { employeeId } = useParams();

  const { title, specialty, startDate, endDate, file } = document;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDocument({ ...document, [name]: value });
  };

  const handleDocumentChange = (e) => {
    setDocument({ ...document, file: e.target.files[0] });
  };

  const saveDocument = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("specialty", specialty);
    formData.append(
      "startDate",
      startDate ? new Date(startDate).toISOString() : ""
    );
    formData.append("endDate", endDate ? new Date(endDate).toISOString() : "");
    formData.append("file", file);

    console.log("Datos a enviar:", formData.title);

    try {
      const response = await employeeService.addDocument(employeeId, formData);
      console.log("Respuesta del servidor:", response);
      navigate(`/employee-detail/${employeeId}`);
    } catch (error) {
      console.error("Error al enviar documento:", error);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Agregar Nuevo Documento</h3>
      <DocumentForm
        document={document}
        handleInputChange={handleInputChange}
        handleDocumentChange={handleDocumentChange}
        saveDocument={saveDocument}
      />
    </div>
  );
};

export default AddDocument;
