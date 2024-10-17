import React, { useContext, useState } from 'react'
import './Add.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { StoreContext } from '../../context/StoreContext'

const Add = () => {

  const {addField, details, setDetails, loading, setLoading} = useContext(StoreContext)

  const addStudent = async (e) =>{
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(`http://localhost:3000/add`, details);
      console.log(response.data)
      if(response.data.success){
        setLoading(false)
        toast.success("Added Successfully");
        setDetails({
          name:"",
          Reg_no:"",
          email:"",
          mobile_Number:""
        })
        return
      }else{
        setLoading(false);
        return toast.error(response.data.message);
      }
    } catch (error) {
      setLoading(false)
      return toast.error(`Error:${error.message}`)
    }
  }



  return(
    <div className='add'>
      <form className='form_field' onSubmit={addStudent}>
        {addField("name", "Name:", "text", "name", details.name )}

        {addField("RegNo", "Reg.No:", "text", "Reg_no" ,details.Reg_no)}

        {addField("email", "Email:", "text", "email", details.email )}

        {addField("tel_num", "Mobile Number:", "tel", "mobile_Number", details.mobile_Number)}
        
        <button type='submit' className='pri_btn'>{loading?<div className='Loader'></div>:"Add"}</button>
      </form>
    </div>
  )
}


export default Add