import React from "react";
import Card from "../../card/Card";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "./EmployeeForm.scss";

const EmployeeForm = ({
  employee,
  employeeImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveEmployee,
}) => {
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveEmployee}>
          <Card cardClass={"group"}>
            <label>Imagen de Perfil</label>
            <code className="--color-dark">
              Formatos Soportados: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="employee" />
              </div>
            ) : (
              <p>Este empleado no tiene foto de perfil.</p>
            )}
          </Card>
          <label>Nombre: </label>
          <input
            type="text"
            placeholder="Nombre de Empleado"
            name="name"
            value={employee?.name}
            onChange={handleInputChange}
          />

          <label>Correo: </label>
          <input
            type="text"
            placeholder="Correo del Empleado"
            name="email"
            value={employee?.email}
            onChange={handleInputChange}
          />
          <label>Profesión: </label>
          <input
            type="text"
            placeholder="Profesión del Empleado"
            name="profession"
            value={employee?.profession}
            onChange={handleInputChange}
          />
          <label>Especialización: </label>
          <input
            type="text"
            placeholder="Especialización del Empleado"
            name="specialization"
            value={employee?.specialization}
            onChange={handleInputChange}
          />
          <label>Descripción: </label>
          <CKEditor
            editor={ClassicEditor}
            data={description}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDescription(data);
            }}
          />
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
                Guardar Empleado
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EmployeeForm;
