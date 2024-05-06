import axios from "axios";
import React from "react";
import { useState } from "react";
const Login = () =>{
const [inputValue,setInputValue] = useState({email:"",password:""})

    const handleChange = (e) =>{
       const {name,value} = e.target;
      setInputValue((prev)=>({...prev,[name]:value}))
    }

    const loginFunc = async(Userdata) =>{
            await axios.post("/login",{data:Userdata})
            .then(response=>{
                console.log(response.data);
            })
            .catch(error=>{
                console.error("login error",error)
            })
    }

    const submit = (e) =>{
        console.log(inputValue)
        e.preventDefault()
        if(inputValue.email && inputValue.password){
            loginFunc(inputValue)
        }
    }
    
    return (
        <>
        <div>
            <form onSubmit={e=>submit(e)}>
                <div className="containerRegister">
                <input type="email" name="email" className="inputText" value={inputValue.email} onChange={(e)=>handleChange(e)} placeholder="Email :"/><br/>

                <input type="password" name="password" className="inputText" value={inputValue.password} onChange={(e)=>handleChange(e)} placeholder="Password :"/><br/>
                </div>
                <button type="submit" className="submit">SUBMIT</button>
            </form>
        </div>
        </>
    )
}

export default Login;