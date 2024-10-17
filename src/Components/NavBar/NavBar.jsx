import React from 'react'
import './NavBar.css'
import profile from "../../assets/profile_image.png"
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className="navbar">
      <div>
        <h2>Student</h2>
      </div>
      <nav className='navigator'>
        <Link to='/'>
          <p>View</p>
        </Link>
        <Link to='/add'>
          <p>Add</p>
        </Link>
      </nav>
      <div style={{display:'flex', justifyContent:'flex-end'}}>
        <img style={{width:'5vw'}} src={profile} alt="" />
      </div>
    </div>
  )
}

export default NavBar