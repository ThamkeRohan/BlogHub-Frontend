import React, { useState, useEffect } from "react";
import "./login.css"
import usersFormDb from "../../data/users";
import useUpdateAuthContext from "../../hooks/useUpdateAuthContext";
import { useNavigate } from "react-router-dom";
export default function Login({ removeHeaderImg }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const { addUser } = useUpdateAuthContext()
  const [formErrors, setFormErrors] = useState({
    emailError: null,
    passwordError: null,
    serverError: null,
  });
  const navigate = useNavigate()
  useEffect(() => {
    removeHeaderImg();
  }, []);

  function validateEmail(email) {
    const emailRegex =
      /^[a-zA-Z0-9.\-_]{5,15}@[a-zA-Z0-9.\-]{5,10}\.[a-zA-Z]{2,3}$/;
    return emailRegex.test(email);
  }
  function validatePassword(password) {
    const passwordRegex = /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;
    return passwordRegex.test(password);
  }

  function handleSubmit(e) {
    
    e.preventDefault()
    if(!(validateEmail(email) && validatePassword(password))){
      console.log("not valid");
      return 
    }

    //query db to check if user exists and is authenticated
    const user = usersFormDb.find(userFromDB => {
      return userFromDB.email === email && userFromDB.password === password
    })
    
    if(user != null){
      addUser({
        id: user.id,
        name: user.firstName + " " + user.lastName,
        email: user.email,
        avatarPath: user.avatarPath
      })
      navigate("/")
    }else{
      setFormErrors(prevFormErrors => {
        return { ...prevFormErrors, serverError: "Invalid Email or Password" }
      })
    }
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              const isEmailValid = validateEmail(e.target.value);
              if (isEmailValid) {
                setFormErrors((prevFormErrors) => {
                  return { ...prevFormErrors, emailError: null };
                });
              } else {
                setFormErrors((prevFormErrors) => {
                  return {
                    ...prevFormErrors,
                    emailError: "Email should be in valid foramt.",
                  };
                });
              }
            }}
          />
          {formErrors.emailError && (
            <div className="error">{formErrors.emailError}</div>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              const isPasswordValid = validatePassword(e.target.value);
              if (isPasswordValid) {
                setFormErrors((prevFormErrors) => {
                  return { ...prevFormErrors, passwordError: "" };
                });
              } else {
                setFormErrors((prevFormErrors) => {
                  return {
                    ...prevFormErrors,
                    passwordError:
                      "Password should be atleast 6 characters long and it should include atleast one alphabets, numbers and special character.",
                  };
                });
              }
            }}
          />
          {formErrors.passwordError && (
            <div className="error">
              { formErrors.passwordError }
            </div>
          )}
        </div>
        <button
          type="submit"
          className="action-btn"
        >
          Login
        </button>
        {formErrors.serverError && (
          <div className="error server-error">{ formErrors.serverError }</div>
        )}
      </form>
    </div>
  );
}
