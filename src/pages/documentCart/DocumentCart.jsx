import React, { useState } from "react";
import DocumentCartList from "../../components/document/documentCartList/DocumentCartList";
import NewDocumentCart from "../../components/document/newDocumentCart/NewDocumentCart";

const DocumentCart = () => {
  const [showDialog, setShowDialog] = useState(false);

  const handleOpenDialog = () => {
    setShowDialog(true);
  };
  return (
    <div className="document-cart">
      <button className="--btn --btn-primary" onClick={handleOpenDialog}>
        Crear Proceso
      </button>
      {showDialog && <NewDocumentCart onClose={() => setShowDialog(false)} />}
      <DocumentCartList />
    </div>
  );
};

export default DocumentCart;
