import React, { useState, useEffect } from "react";
import Loader from "../../components/loader/Loader.jsx";
import "./DocumentList.scss";
import { FaEdit, FaTrashAlt, FaDownload, FaPlus } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../components/search/Search.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_DOCUMENTS,
  selectFilteredDocuments,
} from "../../redux/features/employee/filterSlice.jsx";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteDocument,
  getDocuments,
  getEmployee,
} from "../../redux/features/employee/employeeSlice.jsx";
import { Link } from "react-router-dom";
import { downloadDocument } from "../../redux/features/employee/employeeService.jsx";
import DocumentCartListDialog from "../document/documentCartListDialog/DocumentCartListDialog.jsx";

const DocumentList = ({ employeeId }) => {
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para controlar si el diálogo está abierto o cerrado
  const [selectedDocument, setSelectedDocument] = useState(null);
  const filteredDocuments = useSelector(selectFilteredDocuments);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      return text.substring(0, n) + "...";
    }
    return text;
  };

  const delDocument = async (documentId) => {
    await dispatch(deleteDocument({ employeeId, documentId }));
    await dispatch(getDocuments(employeeId));
  };

  const confirmDelete = (documentId) => {
    confirmAlert({
      title: "Borrar Documento",
      message: "¿Estás seguro de que quieres borrar este documento?",
      buttons: [
        {
          label: "Borrar",
          onClick: () => delDocument(documentId),
        },
        {
          label: "Cancelar",
        },
      ],
    });
  };

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const employee = useSelector((state) => state.employee.employee); // Obtener el empleado actual
  const isLoading = useSelector((state) => state.employee.isLoading); // Estado de carga

  useEffect(() => {
    dispatch(getEmployee(employeeId));
  }, [dispatch, employeeId]);

  useEffect(() => {
    if (employee && employee.documents) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(employee.documents.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(employee.documents.length / itemsPerPage));
    }
  }, [employee, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    if (employee && employee.documents) {
      dispatch(FILTER_DOCUMENTS({ employee, search }));
    }
  }, [employee, search, dispatch]);

  useEffect(() => {
    if (employee && employee.documents) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(filteredDocuments.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(filteredDocuments.length / itemsPerPage));
    }
  }, [filteredDocuments, itemOffset, itemsPerPage]);

  if (!employee || !employee.documents) {
    return <Loader />;
  }

  //download on work :c
  const handleDownload = async (documentId, title) => {
    try {
      const url = await downloadDocument(employeeId, documentId, title);
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.setAttribute("download", "image");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading the file.", error);
    }
  };

  const handlePlusClick = (document) => {
    setSelectedDocument(document); // Almacena el documento seleccionado
    setIsDialogOpen(true); // Abre el diálogo
  };

  const handleCloseDialog = () => {
    setSelectedDocument(null); // Limpia el documento seleccionado
    setIsDialogOpen(false); // Cierra el diálogo
  };
  const formatTotalTime = (totalDays) => {
    if (totalDays < 30) {
      return `${totalDays} días`;
    } else if (totalDays < 365) {
      const months = Math.floor(totalDays / 30);
      const days = totalDays % 30;
      return `${months} meses ${days} días`;
    } else {
      const years = Math.floor(totalDays / 365);
      const months = Math.floor((totalDays % 365) / 30);
      const days = totalDays % 30;
      return `${years} años ${months} meses ${days} días`;
    }
  };

  return (
    <div className="document-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Documentos</h3>
          </span>
          <span className="agregar">
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link to={`/employee-detail/${employeeId}/add-document`}>
              <button className="--btn --btn-primary">Agregar Documento</button>
            </Link>
          </span>
        </div>

        {isLoading && <Loader />}

        <div className="table">
          {filteredDocuments.length === 0 ? (
            <p>-- No se han encontrado documentos, por favor agrega uno...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Título</th>
                  <th>Especialidad</th>
                  <th>Fecha de Inicio</th>
                  <th>Fecha de Fin</th>
                  <th>Tiempo Total</th>
                  <th>Opciones</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((document, index) => (
                  <tr key={document._id}>
                    <td>{index + 1}</td>
                    <td>{shortenText(document.title, 16)}</td>
                    <td>{document.specialty}</td>
                    <td>{new Date(document.startDate).toLocaleDateString()}</td>
                    <td>{new Date(document.endDate).toLocaleDateString()}</td>
                    <td>{formatTotalTime(document.totalTime)}</td>
                    <td className="icons">
                      {/* <span>
                        <Link
                          to={`/employee-detail/${employeeId}/document-detail/${document._id}`}
                        >
                          <AiOutlineEye size={25} color={"#2179BD"} />
                        </Link>
                      </span> */}
                      {/* <span>
                        <Link to={`/edit-document/${document._id}`}>
                          <FaEdit size={20} color={"#54AB6A"} />
                        </Link>
                      </span> */}
                      <span>
                        <FaPlus
                          size={20}
                          color={"#3f3f3f"}
                          onClick={() => handlePlusClick(document)}
                        />
                      </span>
                      <span>
                        <FaDownload
                          size={20}
                          color={"#3f3f3f"}
                          onClick={() => handleDownload(document._id, document.title)}
                        />
                      </span>
                      <span>
                        <FaTrashAlt
                          size={20}
                          color={"#E87063"}
                          onClick={() => {
                            confirmDelete(document._id);
                          }}
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Siguiente"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Anterior"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
        {isDialogOpen && (
          <DocumentCartListDialog
            document={selectedDocument}
            onClose={handleCloseDialog}
            employeeData={employee}
          />
        )}
      </div>
    </div>
  );
};

export default DocumentList;
