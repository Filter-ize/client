import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import {
  getDocument,
  selectDocument,
  selectCurrentDocument,
  getEmployee
} from "../../../redux/features/employee/employeeSlice";
import Card from "../../card/Card";
import Loader from "../../loader/Loader";
import "./DocumentDetail.scss";

const DocumentDetail = () => {
    useRedirectLoggedOutUser("/login");
    const dispatch = useDispatch();
  
    const { employeeId, documentId } = useParams();
  
    const isLoggedIn = useSelector(selectIsLoggedIn);
  
  
    const { isLoading, isError, message } = useSelector(
      (state) => state.employee
    );
  
    const document = useSelector(selectCurrentDocument);
    console.log(document)
  
    useEffect(() => {
        if (isLoggedIn === true) {
          dispatch(getEmployee({ employeeId: employeeId }));
        }
      }, [isLoggedIn, dispatch, employeeId]);

  
    useEffect(() => {
      if (isLoggedIn === true && employeeId) {
        dispatch(getDocument({ employeeId: employeeId, documentId: documentId }));
      }
  
      if (isError) {
        console.log(message);
      }
    }, [isLoggedIn, isError, message, dispatch, documentId, employeeId]);

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <p>{message}</p>}
      <Card><h2>{document?.title}</h2></Card>
    </div>
  );
};

export default DocumentDetail;
