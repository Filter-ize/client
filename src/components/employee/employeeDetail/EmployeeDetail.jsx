import React, { useDebugValue, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getEmployee } from "../../../redux/features/employee/employeeSlice";
import Card from "../../card/Card";
import Loader from "../../loader/Loader";
import "./EmployeeDetail.scss";
import DOMPurify from "dompurify";

const EmployeeDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { employee, isLoading, isError, message } = useSelector(
    (state) => state.employee
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getEmployee(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);
  return (
    <div className="product-detail">
      <h3 className="--mt">Detalles del Empleado</h3>
      <Card cardClass="card">
        {isLoading && <Loader />}
        {employee && (
          <div className="detail">
            <Card cardClass="group">
              {employee?.image ? (
                <img src={employee.image} alt={employee.image.fileName} />
              ) : (
                <p>No existe imagen de perfil para este Empleado</p>
              )}
            </Card>
            <hr />
            <div className="text-detail">

            <h4>
              <span className="badge">Nombre: </span> &nbsp; {employee.name}
            </h4>
            <p>
              <b>&rarr; Correo : </b> {employee.email}
            </p>
            <p>
              <b>&rarr; Profesión : </b> {employee.profession}
            </p>
            <p>
              <b>&rarr; Especialización : </b> {employee.specialization}
            </p>
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(employee.description),
              }}
            ></div>
            <hr />
            <code className="--color-white2">
              Created on:{" "}
              {employee && employee.createdAt
                ? employee.createdAt.toLocaleString("en-US")
                : "N/A"}
            </code>
            <br />
            <code className="--color-white2">
              Last Updated:{" "}
              {employee && employee.updatedAt
                ? employee.updatedAt.toLocaleString("en-US")
                : "N/A"}
            </code>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default EmployeeDetail;
