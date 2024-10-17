import React, { useContext, useEffect, useState } from 'react'
import './HomePage.css'
import edit_icon from '../../assets/edit_icon.png'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { StoreContext } from '../../context/StoreContext'

const HomePage = () => {

  const {Backend_url, setUpdateStudent} = useContext(StoreContext)

  const [students, setStudents] = useState([])

  const fetchStudentDetails = async () =>{
    try {
      const response = await axios.get(`${Backend_url}/allStudent`);
      if(response.data.success){
        return setStudents(response.data.data);
      }
    } catch (error) {
      return toast.error(`Error:${error.message}`)
    }
  }

  useEffect(()=>{
    fetchStudentDetails();
  },[])

  return (
    <div className='homePage'>
      <div className='student_table'>
        <div className='field header'>
          <p>Name</p>
          <p>Reg. No</p>
          <p>Email</p>
          <p>Mobile Number</p>
          <img style={{width:'2vw', borderRadius:'50%'}} src={edit_icon} alt="" />
        </div>
        {students.length>0
        ? students.map((eachStudent, index)=>(
          <div className='field' key={index}>
            <p>{eachStudent.name}</p>
            <p>{eachStudent.Reg_no}</p>
            <p>{eachStudent.email}</p>
            <p>{eachStudent.mobile_Number}</p>
            <Link to='/update'>
              <button onClick={()=>setUpdateStudent(eachStudent._id)} style={{width:"3vw", fontSize:'0.9vw', cursor:'pointer'}}>Edit</button>
            </Link>
            
          </div>
        ))
        :<div style={{display:'flex', width:"100%", height:"100%", justifyContent:'center', alignItems:'center'}}>
            <h2>It seems like empty</h2>
          </div>}
      </div>
    </div>
  )
}

export default HomePage