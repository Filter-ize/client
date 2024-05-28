import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import EmployeeForm from "../../components/employee/employeeForm/EmployeeForm";
import {
  getEmployee,
  getAllEmployees,
  selectIsLoading,
  selectEmployee,
  updateEmployee,
} from "../../redux/features/employee/employeeSlice";

const EditEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const employeeEdit = useSelector(selectEmployee);

  const [employee, setEmployee] = useState(employeeEdit);
  const [employeeImage, setEmployeeImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getEmployee(id));
  }, [dispatch, id]);

  useEffect(() => {
    setEmployee(employeeEdit);

    setImagePreview(
      employeeEdit && employeeEdit.image ? `${employeeEdit.image}` : null
    );

    setDescription(
      employeeEdit && employeeEdit.description ? employeeEdit.description : ""
    );
  }, [employeeEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleImageChange = (e) => {
    setEmployeeImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveEmployee = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("profession", employee.profession);
    formData.append("specialization", employee.specialization);
    formData.append("description", description);

    if (employeeImage) {
      formData.append("image", employeeImage);
    }

    await dispatch(updateEmployee({ id, formData }));
    await dispatch(getAllEmployees());
    navigate("/dashboard");
  };
  return (
  <div>
    {isLoading && <Loader />}
    <h3>Editar Empleado</h3>
    <EmployeeForm
      employee={employee}
      handleInputChange={handleInputChange}
      handleImageChange={handleImageChange}
      saveEmployee={saveEmployee}
      imagePreview={imagePreview}
      description={description}
      setDescription={setDescription}
    />
  </div>
  );
};

export default EditEmployee;
