import axios from "axios"
import { useState } from "react"
import { Button, Container, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { API } from "../GlopbalApi/GlobalApi"
import { toast } from "react-toastify"


export const Login = () => {
    const [userData,setUserData]=useState({
        email:"",
        password:""
    })
    const navigate=useNavigate()




    const handleChange=(e)=>{
setUserData({
    ...userData,
    [e.target.name]:e.target.value
})
    }
    const handleSubmit =async (e) => {
        e.preventDefault();
        if(userData.email===""||userData.password===""){
            toast.error("email and password field should not be empty",{autoClose:5000,closeOnClick:true})
        }else{
            try {
                const {data}=await axios.post(`${API}/auth/login`,userData)
                if(data.successStatus===true){
                    navigate(`/${data.userId}/home`)
                     window.localStorage.setItem("token",data.token)
                    toast.success("logged in sucessfully",{autoClose:5000,closeOnClick:true})
                }else if(data.successStatus===false &&data.message==="complete the verification by entering otp sent your mail"){
                    navigate(`/${data.userId}/otp`)
                    toast.warn("user is not verified please enter the otp",{autoClose:5000,closeOnClick:true} )
                }else{
                    toast.error("some error occured please try again",{autoClose:5000,closeOnClick:true})
                }
            } catch (error) {
                navigate("/login")
                toast.error("some error occured please try again",{autoClose:5000,closeOnClick:true})
            }
        }
        setUserData({ email: "", password: "" });
      };
  return (
    <Container>
    <h1>Login Form</h1>
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <FormLabel>Email</FormLabel>
        <FormControl
          type="email"
          name="email"
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Password</FormLabel>
        <FormControl
          type="password"
          name="password"
          onChange={handleChange}
          required
        />
      </FormGroup>
      <Button type="submit">Login</Button>
    </Form>
    <div className="d-flex">
      <p>Don&apos;t have an account</p> &nbsp; <Link to="/register">register</Link>
    </div>
  </Container>
  )
}
