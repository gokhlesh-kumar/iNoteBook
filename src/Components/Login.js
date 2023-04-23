import React, { useState } from "react";
import { useNavigate} from "react-router-dom";

const Login = (props) => {

  const host = "http://localhost:5000";

  const [credentials, setCredentials] = useState({email:"", password:""});
  let navigate = useNavigate();
  
  const handlesubmit = async(e) =>{
      e.preventDefault();
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:credentials.email, password:credentials.password}),
      });
      const json = await response.json();
      console.log(json)
      if(json.success){
        // Save the token in local Storage
        localStorage.setItem('token', json.token);
        props.alert("Login Succesfully", "success");
        navigate("/");
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
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={onchange}
            name="email"
            value={credentials.email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            onChange={onchange}
            value={credentials.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
