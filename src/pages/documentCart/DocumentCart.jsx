import React, { useState } from "react";
import DocumentCartList from "../../components/document/documentCartList/DocumentCartList";
import NewDocumentCart from "../../components/document/newDocumentCart/NewDocumentCart";

const DocumentCart = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); 

  const handleOpenDialog = () => {
    setShowDialog(true);
  };
  const handleAddCart = () => {
    setRefreshKey(oldKey => oldKey + 1); // Update the refreshKey after adding a cart
  };

  return (
    <div className="document-cart">
      <button className="--btn --btn-primary" onClick={handleOpenDialog}>
        Crear Proceso
      </button>
      {showDialog && <NewDocumentCart onClose={() => setShowDialog(false)} onAddCart={handleAddCart} />}
      <DocumentCartList refreshKey={refreshKey} />
    </div>
  );
};

export default DocumentCart;
