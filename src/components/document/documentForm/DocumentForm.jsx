import React from 'react';
import Card from '../../card/Card';

const DocumentForm = ({
  document,
  handleInputChange,
  handleDocumentChange,
  saveDocument,
}) => {
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveDocument}>
          <label>Título: </label>
          <input
            type="text"
            placeholder="Título del Documento"
            name="title"
            value={document.title}
            onChange={handleInputChange}
          />

          <label>Especialidad: </label>
          <input
            type="text"
            placeholder="Especialidad del Documento"
            name="specialty"
            value={document.specialty}
            onChange={handleInputChange}
          />

          <label>Fecha de inicio: </label>
          <input
            type="date"
            name="startDate"
            value={document.startDate}
            onChange={handleInputChange}
          />

          <label>Fecha de finalización: </label>
          <input
            type="date"
            name="endDate"
            value={document.endDate}
            onChange={handleInputChange}
          />

          <Card cardClass={"group"}>
            <label>Documento</label>
            <code className="--color-white2">
              Formatos soportados: pdf, doc, docx
            </code>
            <input
              type="file"
              name="file"
              accept="application/pdf"
              onChange={(e) => handleDocumentChange(e)}
            />

            {document != null ? (
              <div className="document-preview">
                <p>{document.title}</p>
              </div>
            ) : (
              <p>No se ha subido ningún documento.</p>
            )}
          </Card>

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Guardar Documento
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default DocumentForm;
