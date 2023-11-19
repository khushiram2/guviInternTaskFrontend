import axios from "axios"
import "../Styles/Register.css"
import { Button, Container, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"
import {  Link, useNavigate } from "react-router-dom"
import { API } from "../GlopbalApi/GlobalApi"
import { useState } from "react"
import { toast } from "react-toastify"


export const Register = () => {
    const [userData,setUserData]=useState({})
const navigate=useNavigate()

const handleChange=(e)=>{
    setUserData({
        ...userData,
        [e.target.name]:e.target.value
    })
        }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(userData.name==="" || userData.email===""|| userData.password==="")toast.error("every field is mandatory",{autoClose:5000,closeOnClick:true})
        try {
            const {data}=await axios.post(`${API}/auth/register`,{userData:userData})
            if(data.successStatus===true){
                navigate(`/${data.userId}/otp`)
                toast.warn("verify the user by entering otp sent to registered mail",{autoClose:5000, closeOnClick:true })
            }else if(data.successstatus===false&& data.message==="email already in use please try another email"){
              toast.error("email already in use please use another email", {autoClose:5000,closeOnClick:true})
            }
            setUserData({name:"",email:"",password:""})
        } catch (error) {
            toast.error("some error occured please try again", {autoClose:5000,closeOnClick:true})
            setUserData({name:"",email:"",password:""})
            navigate("/register")
        }
   
      }


  return (
    <Container  >
    <h1>Registration Form</h1>
    <Form onSubmit={handleSubmit} >
        <FormGroup>
            <FormLabel>Name</FormLabel>
            <FormControl type='text' name='name' onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
            <FormLabel>Email</FormLabel>
            <FormControl type='text' name='email' onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
            <FormLabel>Password</FormLabel>
            <FormControl type='text' name='password' onChange={handleChange} required />
        </FormGroup>
    <Button type='submit' >Register</Button>
    </Form>
    <div className='d-flex' >
    <p>already have an account</p> &nbsp; <Link to="/login" >login</Link>
    </div>
</Container>
  )
}
