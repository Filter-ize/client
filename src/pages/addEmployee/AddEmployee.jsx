import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import EmployeeForm from '../../components/employee/employeeForm/EmployeeForm.jsx'
import { createEmployee, selectIsLoading } from '../../redux/features/employee/employeeSlice.jsx'

const initialState ={
    name: '',
    email: '',
    profession: '',
    specialization: '',
}

const AddEmployee = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [employee, setEmployee] = useState(initialState)
    const [employeeImage, setEmployeeImage] = useState('')
    const [imagePreview, setImagePreview] = useState(null)
    const [description, setDescription] = useState('')

    const isLoading = useSelector(selectIsLoading)

    const { name, email, profession, specialization } = employee

    const handleInputChange = (e) =>{
        const { name, value } = e.target
        setEmployee({...employee, [name]: value})
    }

    const handleImageChange = (e) => {
        setEmployeeImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    }

    const saveEmployee = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('profession', profession)
        formData.append('specialization', specialization)
        formData.append('description', description)
        formData.append('image', employeeImage)

        await dispatch(createEmployee(formData))
        navigate('/dashboard')
    }
    
  return (
    <div>
        {isLoading && <Loader />}
        <h3 className='--mt'>Agregar Nuevo Empleado</h3>
        <EmployeeForm 
            employee={employee}
            employeeImage={employeeImage}
            imagePreview={imagePreview}
            description={description}
            setDescription={setDescription}
            handleInputChange={handleInputChange}
            handleImageChange={handleImageChange}
            saveEmployee={saveEmployee}
        />
    </div>
  )
}

export default AddEmployee