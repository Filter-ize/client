import React from 'react'
import styles from "./Search.module.scss";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  return (
    <div className={styles.search}>
        <BiSearch size={18} className={styles.icons} />
        <input 
        type="text"
        placeholder='Buscar Empleado'
        value={value}
        onChange={onChange}
         />
    </div>
  )
}

export default Search