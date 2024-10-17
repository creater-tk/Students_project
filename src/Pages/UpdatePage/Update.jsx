import React, { useContext, useEffect } from 'react'
import "./Update.css"
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Update = () => {
  const {updateStudent, addField, details, setDetails, Backend_url, loading, setLoading}  = useContext(StoreContext)

  const navigate = useNavigate();

  const fetchStudentDetails = async ()=>{
    try {
      const response =  await axios.post(`${Backend_url}/findStudent`, {_id:updateStudent});
      if(response.data.success){
        setDetails({
          name:response.data.data.name,
          Reg_no:response.data.data.Reg_no,
          email:response.data.data.email,
          mobile_Number:response.data.data.mobile_Number
        })
      }
    } catch (error) {
      toast.error(`Error:${error.message}`);
    }
  }

  const updateStudentDetails = async (e)=>{
    e.preventDefault();
    setLoading(true)
    try {
      const updatedData = details;

      const response = await axios.put(`${Backend_url}/updateStudentDetails`, {_id:updateStudent, updatedData})

      console.log(response.data)
      if(response.data.success){
        setLoading(false)
        setDetails({
          name:"",
          Reg_no:"",
          email:"",
          mobile_Number:""
        })
        toast.success("Updated Successfully")
        navigate('/')
      }
    } catch (error) {
      setLoading(false)
      toast.error(`Error:${error.message}`)
    }
  }

  const deleteStudentDetails = async ()=>{
    try {
      setLoading(true);
      const response = await axios.post(`${Backend_url}/removeStudent`, {_id:updateStudent})
      if(response.data.success){
        toast.success("Removed")
        navigate('/')
      }
    } catch (error) {
      toast.error(`Error:${error.message}`)
    } finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    if(updateStudent === ''){
      navigate('/')
    }
    fetchStudentDetails();
  },[])

  return (
    <div className='update'>
      <form style={{width:"30vw"}} onSubmit={updateStudentDetails}>
        {addField("name", "Name:", "text", "name", details.name )}

        {addField("RegNo", "Reg.No:", "text", "Reg_no" ,details.Reg_no)}

        {addField("email", "Email:", "text", "email", details.email )}

        {addField("tel_num", "Mobile Number:", "tel", "mobile_Number", details.mobile_Number)}

        <button type='Submit' style={{width:'95%', alignSelf:'center'}} className='pri_btn'>{loading?<div className='Loader'></div>:"Update"}</button>
      </form>
      <button onClick={deleteStudentDetails} type='text' className='pri_btn delete_btn'>{loading?<div className='Loader'></div>:"Remove"}</button>
    </div>
  )
}

export default Update