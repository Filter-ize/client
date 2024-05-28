import React, { useEffect } from 'react'
import './EmployeeSummary.scss'
import { FaPersonPraying } from "react-icons/fa6"
import { FaBookDead } from "react-icons/fa";
import InfoBox from '../../infoBox/InfoBox.jsx'
import { useDispatch, useSelector } from 'react-redux';
import{ CALC_PROFESSIONS, selectProfessions, selectSpecializations } from '../../../redux/features/employee/employeeSlice.jsx'

//Icons
const employeeIcon = <FaPersonPraying size={40} color="#fff" />;
const professionIcon = <FaBookDead size={40} color="#fff" />;

//Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const EmployeeSummary = ({employees}) => {
    const dispatch = useDispatch();
    const profession = useSelector(selectProfessions);
    const totalEmployees = employees.length;
    const specialization = useSelector(selectSpecializations)

    useEffect(()=>{
        dispatch(CALC_PROFESSIONS(employees))
    }, [dispatch, employees])
  return (
    <div className='product-summary'>
        <h3 className="--mt">Estadísticas</h3>
        <div className="info-summary">
            <InfoBox 
            icon={employeeIcon}
            title='Total de empleados'
            count={totalEmployees}
            bgColor='card1'
            />            
            <InfoBox 
            icon={professionIcon}
            title='Total de profesiones'
            count={profession.length}
            bgColor='card1'
            />            
        </div>
    </div>
  )
}

export default EmployeeSummary