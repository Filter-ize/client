import React, { useState } from "react";
import DocumentCartForm from "../documentCartForm/DocumentCartForm";
import "./NewDocumentCart.scss";
import { createCart } from "../../../redux/features/documents/documentCartService";

const NewDocumentCart = ({ onClose }) => {
  const [cart, setCart] = useState({
    title: "",
    location: "",
    type: "",
    duration: "",
  });

  const handleInputChange = (event) => {
    setCart({
      ...cart,
      [event.target.name]: event.target.value,
    });
  };

  const saveCart = async (event) => {
    event.preventDefault();
    // Aquí puedes hacer la llamada a la API para guardar el carrito
    try {
      const response = await createCart(cart);
      console.log(response);
      onClose();
    } catch (error) {
      console.error('Error creating cart', error);
    }
  };

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="dialog">
        <DocumentCartForm
          cart={cart}
          handleInputChange={handleInputChange}
          saveCart={saveCart}
          onClose={onClose}
        />
      </div>
    </>
  );
};

export default NewDocumentCart;
