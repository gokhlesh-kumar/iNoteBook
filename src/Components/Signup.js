import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {

  const host = "http://localhost:5000";

  const [credentials, setCredentials] = useState({name: "", email:"", password:""});
  let navigate = useNavigate();
  
  const handlesubmit = async(e) =>{
      e.preventDefault();
      // const {name, email, password} = credentials;
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: credentials.name, email:credentials.email, password:credentials.password}),
      });
      const json = await response.json();
      console.log(json)

      if(json.success){
        // Save the token in local Storage
        props.alert("Account created Succesfully", "success");
        localStorage.setItem('token', json.token);
        navigate('/');
      }
      else{
        props.alert("Invalid credntials", "danger");
      }
  }
  
  // Updates the value concurrently while typing
  const onchange = (e) =>{
    setCredentials({...credentials, [e.target.name] : e.target.value})
  }

  return (
    <div className="container">
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            required
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={onchange}
            name="name"
            value={credentials.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            required
            className="form-control"
            id="exampleInputEmail2"
            aria-describedby="emailHelp"
            onChange={onchange}
            name="email"
            value={credentials.email}
          />

        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            required
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            onChange={onchange}
            value={credentials.password}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            required
            className="form-control"
            id="exampleInputPassword2"
            name="cpassword"
            onChange={onchange}
            
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Account
        </button>
      </form>
    </div>
  )
}

export default Signup
