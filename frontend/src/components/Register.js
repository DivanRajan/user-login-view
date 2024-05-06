import React from "react";
import { useState } from "react";
import '../styles/Register.css'
import axios from "axios";

const Register = () =>{
const [inputValue,setInputValue] = useState({username:"",email:"",gender:"",password:"",confirmPassword:""})

    const handleChange = (e) =>{
       const {name,value} = e.target;
      setInputValue((prev)=>({...prev,[name]:value}))
    };

    const validation = async() =>{
        
     /**  checkPass
      * (?=.*\d)         should contain at least 1 digit
     * (?=(.*\W){2})    should contain at least 2 special characters
     * (?=.*[a-zA-Z])   should contain at least 1 alphabetic character
     * (?!.*\s)         should not contain any blank space
     */
    console.log(inputValue)
    
    var checkUser = inputValue.username.match(/^[a-zA-Z0-9_-]{4,16}$/)?inputValue.username.match(/^[a-zA-Z0-9_-]{4,16}$/)[0]:null; // not blanck space and more thn 4 character
       var checkPass = inputValue.password.match(/^(?=.*\d)(?=(.*\W){1})(?=.*[a-zA-Z])(?!.*\s).{1,15}$/)?inputValue.password.match(/^(?=.*\d)(?=(.*\W){1})(?=.*[a-zA-Z])(?!.*\s).{1,15}$/)[0]:null;
       if(!checkUser){
          alert("should contain at least 4 alphabetic character and should not contain any blank space")
        }
       if(!checkPass){
          alert("should contain at least 1 digit and should contain at least 1 special characters")
        }
        if(inputValue.confirmPassword !== checkPass){
            alert("confirm password should match your password")
       }
        if(checkUser && checkPass && (inputValue.confirmPassword === checkPass)){
            console.log("tick",inputValue)
            postFunc(inputValue);
        }
    }

    const postFunc = async(Userdata) =>{
        axios.post("/user/register",{data:Userdata})
        .then(response =>{
        console.log(response.data)
    })
      .catch(error=>{
        console.error('error',error)
      })
    };

    const submit = async(e) =>{
        e.preventDefault()
        if(inputValue.username && inputValue.email && inputValue.password && inputValue.confirmPassword && inputValue.gender){
            validation();
        }
        else console.log("input value missing")
    };

    return (
        <>
        <div>
            
            <form onSubmit={e=>submit(e)}>
                <div className="containerRegister">
                <div style={{paddingBottom:"8%"}}>SIGN UP</div>
                <input type="text" name="username" className="inputText" value={inputValue.username} onChange={(e)=>handleChange(e)} placeholder="User Name :"/><br/>
                <input type="email" name="email" className="inputText" value={inputValue.email} onChange={(e)=>handleChange(e)} placeholder="Email :"/><br/>
                
                <input type="password" name="password" className="inputText" value={inputValue.password} onChange={(e)=>handleChange(e)} placeholder="Password :"/><br/>
                <input type="password" name="confirmPassword" className="inputText" value={inputValue.confirmPassword} onChange={(e)=>handleChange(e)} placeholder="Confirm Password:"/><br/>
                <select name="gender" value={inputValue.gender} onChange={(e)=>handleChange(e)} className="selectTag">
                    <option value={"Gender"}>Gender</option>
                    <option value={"Male"} >Male</option>
                    <option value={"Female"}>Female</option>
                    <option value={"Not To Say"}>Prefer Not To Say</option>
                </select>
                </div>
                <button type="submit" className="submit">SUBMIT</button>
            </form>
        </div>
        </>
    )
}

export default Register;