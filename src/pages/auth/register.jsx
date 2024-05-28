import React, { useState } from 'react'
import styles from './auth.module.scss'
import { TiUserAddOutline } from 'react-icons/ti'
import Card from '../../components/card/Card.jsx'
import { toast } from 'react-toastify'
import { registerUser, validateEmail } from '../../services/authService'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice'
import Loader from '../../components/loader/Loader'

const initialState = {
    name: '',
    email: '',
    password: '',
    password2: ''
}

const register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const { name, email, password, password2 } = formData

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ 
            ...formData, 
            [name]: value 
        })
    }

    const reg = async (e) => {
        e.preventDefault();

        if(!name || !email || !password || !password2) {
            return toast.error('Todos los campos son requeridos')
        }
        if(password.length < 6){
            return toast.error('La contraseña debe tener al menos 6 caracteres')
        }
        if(!validateEmail(email)){
            return toast.error('Email no válido')
        }
        if(password !== password2){
            return toast.error('Las contraseñas no coinciden')
        }

        const userData ={
            name,
            email,
            password
        };
        setIsLoading(true);
        try {
            const data = await registerUser(userData);
            await dispatch(SET_LOGIN(true));
            await dispatch(SET_NAME(data.name));
            navigate('/dashboard');
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    }

  return (
    <div className={`container ${styles.auth}`}>
        {isLoading && <Loader />}
        <Card>
            <div className={styles.form}>
                <div className="--flex-center">
                    <TiUserAddOutline size={35} color="#999" />
                </div>
                <h2>Registrarse</h2>

                <form onSubmit={reg}>
                    <input 
                    type="text" 
                    placeholder='Nombre'
                    required
                    name='name'
                    value={name}
                    onChange={handleInputChange}
                    />
                    <input 
                    type="email"
                    placeholder='Correo'
                    required
                    name='email'
                    value={email}
                    onChange={handleInputChange} 
                    />
                    <input 
                    type="password"
                    placeholder='Contraseña'
                    required
                    name='password'
                    value={password}
                    onChange={handleInputChange} 
                    />
                    <input 
                    type="password"
                    placeholder='Confirmar Contraseña'
                    required
                    name='password2'
                    value={password2}
                    onChange={handleInputChange} 
                    />
                    <button type='submit' className='--btn --btn-primary --btn-block'>
                        Registrarse
                    </button>
                </form>
                <span className={styles.register}>
                    <Link to='/'>Inicio</Link>
                    <p>&nbsp; ¿Ya tienes una cuenta? &nbsp;</p>
                    <Link to='/login'>Login</Link>
                </span>
            </div>
        </Card>
    </div>
  )
}

export default register