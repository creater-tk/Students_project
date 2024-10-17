import React from 'react'
import { createContext, useState } from 'react'

export const StoreContext  = createContext(null);

const ContextProvider = (props)=>{

  const Backend_url = "http://localhost:3000"

  const [updateStudent, setUpdateStudent] = useState('')

  const [loading, setLoading] = useState(false)

  const [details, setDetails] = useState({
    name:"",
    Reg_no:"",
    email:"",
    mobile_Number:""
  });


  const onChangeHandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value
    setDetails(prev=>({
      ...prev, [name]:value
    }));
  }

  const addField = (id, label, input, name, value)=>(
    <div className='addField'>
      <label htmlFor={id}>{label}</label>
      <input style={{fontSize:"1vw"}} onChange={onChangeHandler} type={input} placeholder={label} name={name} value={value} required />
    </div>
  )

  const contextValue = {
    Backend_url,
    updateStudent,
    setUpdateStudent,
    addField, 
    details,
    setLoading,
    loading,
    setDetails
  }

  return(
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default ContextProvider