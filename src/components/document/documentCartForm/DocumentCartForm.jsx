import React from "react";
import Card from "../../card/Card";
import { IoClose } from "react-icons/io5";

const DocumentCartForm = ({ cart, handleInputChange, saveCart, onClose }) => {
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveCart} style={{paddingTop: "20px",paddingBottom: "20px",paddingRight: "30px",paddingLeft: "30px"}}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Crear nuevo Proceso</h3>
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
          <label>Título: </label>
          <input
            type="text"
            placeholder="Título del Proceso"
            name="title"
            value={cart.title}
            onChange={handleInputChange}
          />

          <label>Entidad: </label>
          <input
            type="text"
            placeholder="Entidad"
            name="location"
            value={cart.location}
            onChange={handleInputChange}
          />

          <label>Tipo de obra: </label>
          <input
            type="text"
            placeholder="Tipo de Obra"
            name="type"
            value={cart.type}
            onChange={handleInputChange}
          />

          <label>Duración: </label>
          <input
            type="text"
            placeholder="Duración de la Obra"
            name="duration"
            value={cart.duration}
            onChange={handleInputChange}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Guardar Proceso
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default DocumentCartForm;
