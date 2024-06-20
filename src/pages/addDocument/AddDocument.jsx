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
};

const AddDocument = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [document, setDocument] = useState(initialState);
  const [documentFile, setDocumentFile] = useState('');
  const isLoading = useSelector(selectIsLoading);

  const { employeeId } = useParams();

  const { title, specialty, startDate, endDate } = document;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDocument({ ...document, [name]: value });
  };

  const handleDocumentChange = (e) => {
    setDocumentFile(e.target.files[0]);
  };

  const saveDocument = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("specialty", specialty);
    formData.append("startDate", startDate); // Asegúrate de que startDate y endDate estén en formato ISO 8601
    formData.append("endDate", endDate);
    if (documentFile) {
      formData.append("file", documentFile);
    }
  
    try {
      const response = await employeeService.addDocument(
        employeeId,
        formData
      );
      console.log(response);
    } catch (error) {
      console.error("Error al enviar documento:", error);
    }
  
    navigate(`/employee-detail/${employeeId}`);
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
