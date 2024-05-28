import React, { useState, useEffect } from "react";
import { SpinnerImg } from "../../loader/Loader.jsx";
import "./EmployeeList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_EMPLOYEES,
  selectFilteredEmployees,
} from "../../../redux/features/employee/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteEmployee,
  getAllEmployees,
} from "../../../redux/features/employee/employeeService.jsx";
import { Link } from "react-router-dom";

const EmployeeList = ({ employees, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredEmployees = useSelector(selectFilteredEmployees);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delEmployee = async (id) => {
    await dispatch(deleteEmployee(id));
    await dispatch(getAllEmployees());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Borrar Empleado",
      message: "¿Estás seguro de que quieres borrar este empleado?",
      buttons: [
        {
          label: "Borrar",
          onClick: () => delEmployee(id),
        },
        {
          label: "Cancelar",
        },
      ],
    });
  };

  //Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itempsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itempsPerPage;

    setCurrentItems(filteredEmployees.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredEmployees.length / itempsPerPage));
  }, [itemOffset, itempsPerPage, filteredEmployees]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itempsPerPage) % filteredEmployees.length;
    setItemOffset(newOffset);
  };

  //End Pagination
  useEffect(() => {
    dispatch(FILTER_EMPLOYEES({ employees, search }));
  }, [employees, search, dispatch]);

  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Empleados</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && employees.length === 0 ? (
            <p>-- No se han encontrado empleados, por favor agrega uno...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Profesión</th>
                  <th>Especialización</th>
                  <th>Opciones</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((employee, index) => {
                  const { _id, name, email, profession, specialization } =
                    employee;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{email}</td>
                      <td>{profession}</td>
                      <td>{specialization}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/employee-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-employee/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <Link>
                            <FaTrashAlt
                              size={20}
                              color={"red"}
                              onClick={() => {
                                confirmDelete(_id);
                              }}
                            />
                          </Link>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Siguiente"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Anterior"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default EmployeeList;
