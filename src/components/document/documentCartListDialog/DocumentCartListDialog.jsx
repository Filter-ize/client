import React, { useEffect, useState } from "react";
import Loader from "../../loader/Loader";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import {
  getAllCarts,
  addDocumentsToCart,
} from "../../../redux/features/documents/documentCartService";

const DocumentCartListDialog = ({ document, onClose, employeeData }) => {
  const [carts, setCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCart, setSelectedCart] = useState(null);
  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await getAllCarts();
        setCarts(response);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener los carritos de documentos.", error);
        setIsLoading(false);
      }
    };

    fetchCarts();
  }, [isLoading]);
  // console.log("Document: ", document._id);
  // console.log("employee: ", employeeData._id);

  const handleAddToCart = async (cart) => {
    try {
      setIsLoading(true);
      const formData = {
        employeeId: employeeData._id,
        documentId: document._id,
        employeeName: employeeData.name, // Asegúrate de que estos campos existen en employeeData y document
        documentTitle: document.title,
        documentFile: document.file.buffer,
        documentTotalTime: document.totalTime,
      };
      
      console.log("formData: ", formData);
      await addDocumentsToCart(cart._id, formData);
      const response = await getAllCarts();
      setCarts(response);
    } catch (error) {
      console.error("Error al añadir el documento al carrito.", error);
    } finally {
      setIsLoading(false);
    }
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

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="overlay" onClick={onClose}>
        <div className="dialogo" >
          <div className="document-list" style={{width: "100%"}}>
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
            <hr />
            {carts?.length === 0 ? (
              <p>No existen procesos</p>
            ) : (
              <div className="table">
                <table>
                  <thead>
                    <tr>
                      <th>Título del Proceso</th>
                      <th>Entidad</th>
                      <th>Tipo</th>
                      <th>Duración</th>
                      <th>Alcanzado</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts.map((cart) => (
                      <tr key={cart._id}>
                        <td>{cart.title}</td>
                        <td>{cart.location}</td>
                        <td>{cart.type}</td>
                        <td>{cart.duration}</td>
                        <td>{formatTotalTime(cart.reached)}</td>
                        <td className="icons">
                          <span>
                            <Link>
                              <FaPlus
                                size={20}
                                color={"#E87063"}
                                onClick={() => handleAddToCart(cart)}
                              />
                            </Link>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentCartListDialog;
