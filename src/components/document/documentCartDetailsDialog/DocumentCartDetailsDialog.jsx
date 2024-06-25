// DocumentCartDetailsDialog.jsx
import React from "react";
import "./DocumentCartDetailsDialog.scss";
import { IoClose } from "react-icons/io5";
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

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
  return (
    <>
      <div className="overlay" onClick={onClose}>
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
              <h3>Documentos:</h3>
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
                            <Link to={doc.documentFileUrl} target="_blank" rel="noopener noreferrer">
                              <AiOutlineEye size={25} color={"#2179BD"} onClick={(e) => e.stopPropagation()}/>
                            </Link>
                          </span>
                          <span>
                            <Link>
                              <FaTrashAlt
                                size={20}
                                color={"#E87063"}
                                onClick={() => {}}
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
