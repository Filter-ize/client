// DocumentCartDetailsDialog.jsx
import React from "react";
import "./DocumentCartDetailsDialog.scss";
import { IoClose } from "react-icons/io5";
import { AiOutlineEye } from "react-icons/ai";
import { FaDownload, FaTrashAlt, FaFileArchive } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  downloadCartDocuments,
  removeDocumentFromCart,
} from "../../../redux/features/documents/documentCartService";
import { downloadDocument } from "../../../redux/features/employee/employeeService";

const DocumentCartDetailsDialog = ({ cart, onClose }) => {
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

  const handleDownload = async () => {
    try {
      const response = await downloadCartDocuments(cart._id);
      const url = window.URL.createObjectURL(
        new Blob([response], { type: "application/zip" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "documents.zip");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleDownloadDocument = async (doc) => {
    console.log(doc)
    try {
      const url = await downloadDocument(doc.employee, doc.document, doc.documentTitle);
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.setAttribute("download", "image");
      document.body.appendChild(link);
      link.click();
    } catch (error) {}
  };

  const handleRemoveDocument = async (doc) => {
    try {
      await removeDocumentFromCart(cart._id, {
        employeeId: doc.employee,
        documentId: doc.document,
      });
      // Aquí puedes actualizar la lista de documentos en el carrito si es necesario
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <>
      <div className="overlay">
        <div className="dialogo">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <h2>Detalles del Proceso</h2>
            <button
              onClick={onClose}
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                width: "35px",
                fontSize: "30px",
                color: "var(--color-white)",
              }}
            >
              <IoClose />
            </button>
          </div>
          <p>Título: {cart.title}</p>
          <p>Entidad: {cart.location}</p>
          <p>Tipo: {cart.type}</p>
          <p>Duración: {cart.duration}</p>
          <p>Alcanzado: {formatTotalTime(cart.reached)}</p>
          <hr />
          {cart.documents?.length === 0 ? (
            <p>No hay documentos en este proceso.</p>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <h3>Documentos:</h3>
                <button
                  onClick={handleDownload}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    width: "24px",
                    fontSize: "24px",
                    color: "var(--color-white)",
                  }}
                >
                  <FaFileArchive />
                </button>
              </div>
              <div className="table">
                <table>
                  <thead>
                    <tr>
                      <th>Empleado</th>
                      <th>Título del Documento</th>
                      <th>Tiempo Total</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.documents.map((doc) => (
                      <tr key={doc._id}>
                        <td>{doc.employeeName}</td>
                        <td>{doc.documentTitle}</td>
                        <td>{formatTotalTime(doc.documentTotalTime)}</td>
                        <td className="icons">
                          <span>
                            <Link>
                              <FaDownload
                                size={25}
                                color={"#2179BD"}
                                onClick={(e) => handleDownloadDocument(doc)}
                              />
                            </Link>
                          </span>
                          <span>
                            <Link>
                              <FaTrashAlt
                                size={20}
                                color={"#E87063"}
                                onClick={() => handleRemoveDocument(doc)}
                              />
                            </Link>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DocumentCartDetailsDialog;
