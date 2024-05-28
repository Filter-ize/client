import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmployeeList from '../../components/employee/employeeList/EmployeeList.jsx'
import EmployeSummary from '../../components/employee/employeeSummary/EmployeeSummary.jsx' 
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser.jsx';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice.jsx';
import { getAllEmployees } from '../../redux/features/employee/employeeSlice.jsx';

const Dashboard = () => {
    useRedirectLoggedOutUser('/login')
    const dispatch = useDispatch()

    const isLoggedIn = useSelector(selectIsLoggedIn)
    const { employees, isLoading, isError, message} = useSelector( (state) => state.employee )

    useEffect(()=>{
        if(isLoggedIn === true){
            dispatch(getAllEmployees())
        }

        if(isError) {
            console.log(message)
        }
    },[isLoggedIn, isError, message, dispatch])
  return (
    <div>
        <EmployeSummary employees={employees}/>
        <EmployeeList employees={employees} isLoading={isLoading}/>
    </div>
  )
}

export default Dashboard