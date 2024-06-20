import React, { useEffect, useState } from "react";
import { getAllCarts } from "../../../redux/features/documents/documentCartService.jsx";
import Loader from "../../loader/Loader.jsx";

const DocumentCartList = () => {
  const [carts, setCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await getAllCarts();
        setCarts(response);
        setIsLoading(false);
        console.log(carts);
      } catch (error) {
        console.error("Error al obtener los carritos de documentos.", error);
        setIsLoading(false);
      }
    };

    fetchCarts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="document-list">
      <hr />
      <div className="table">
        <h3>Proceso</h3>
        {carts?.length === 0 ? (
          <p>No hay carritos de documentos.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID del Empleado</th>
                <th>ID del Documento</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((cart) =>
                cart.documents.map((doc) => (
                  <tr key={doc._id}>
                    <td>{doc.employee}</td>
                    <td>{doc.document}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DocumentCartList;
