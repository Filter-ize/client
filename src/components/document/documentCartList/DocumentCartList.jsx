import React, { useEffect, useState } from "react";
import { getAllCarts, deleteCart, downloadCartDocuments } from "../../../redux/features/documents/documentCartService.jsx";
import Loader from "../../loader/Loader.jsx";
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import DocumentCartDetailsDialog from "../documentCartDetailsDialog/DocumentCartDetailsDialog.jsx";

const DocumentCartList = () => {
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
 

  const handleDownload = async (id) => {
    try {
      setIsLoading(true);
      const data = await downloadCartDocuments(cart._id);
      console.log(data)
      // Handle the downloaded data here
    } catch (error) {
      console.error(error);
      // Handle the error here
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
    <div className="document-list">
      <hr />
      <div className="table">
        <h3>Proceso</h3>
        {carts?.length === 0 ? (
          <p>No existen procesos</p>
        ) : (
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
                      <Link onClick={() => setSelectedCart(cart)}>
                        <AiOutlineEye size={25} color={"#2179BD"} />
                      </Link>
                    </span>
                    <span>
                      <Link>
                        <FaTrashAlt
                          size={20}
                          color={"#E87063"}
                          onClick={() => handleDelete(cart._id)}
                        />
                      </Link>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {selectedCart && (
        <DocumentCartDetailsDialog
          cart={selectedCart}
          onClose={() => setSelectedCart(null)}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default DocumentCartList;
