import React, { useEffect, useState, useRef } from 'react'
import Avatars from '../../components/avatars/Avatars'
import './signup.css'
import useUpdateAuthContext from '../../hooks/useUpdateAuthContext';
import users from '../../data/users';
import { useNavigate } from 'react-router-dom';
export default function SignUp({ removeHeaderImg }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAvatarPath, setSelectedAvatarPath] = useState("imgs/avatars/avatar_6.png")
  const { addUser } = useUpdateAuthContext()  
  const [formErrors, setFormErrors] = useState({
    firstNameError: null,
    lastNameError: null,
    emailError: null,
    passwordError: null,
    serverError: null,
  })

  const navigate = useNavigate()
  useEffect(() => {
    removeHeaderImg()
  }, []);

  function setSelectedAvatar(selectedAvatar){
    setSelectedAvatarPath(selectedAvatar)
  }
  function handleSubmit(e) {
    e.preventDefault()
    if(!(validateName(firstName, true), validateName(lastName), validateEmail(email), validatePassword(password))){
      return
    }

    //check if the user with same email alreay exists
    if(users.find(user => user.email === email) != null){
      return setFormErrors(prevFormErrors => {
        return { ...prevFormErrors, serverError: "User with same email already exists" }
      })
    }
    //add user to db
    const id = Math.random() * Math.random() * 100000

    users.push({
      id,
      firstName,
      lastName,
      email,
      password,
      avatarPath: selectedAvatarPath
    })

    //get user data from server and add to user state
    const user = {
      id,
      name: firstName + " " + lastName,
      email,
      avatarPath: selectedAvatarPath
    }
    addUser(user)
    navigate("/")
  }

  function validateName(name, isFirstName){
    const nameType = isFirstName ? "firstNameError" : "lastNameError"
    const nameRegex = /^[a-zA-Z]{3,15}$/
    return nameRegex.test(name)
  }
  function validateEmail(email){
    const emailRegex = /^[a-zA-Z0-9.\-_]{5,15}@[a-zA-Z0-9.\-]{5,10}\.[a-zA-Z]{2,3}$/
    return emailRegex.test(email)
  }
  function validatePassword(password){
    const passwordRegex = /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/
    return passwordRegex.test(password)
  }

  
  return (
    <div className="sign-up-container">
      <h1>Sign Up</h1>
      <div>
        <img src={selectedAvatarPath} alt="" className="selected-avatar" />
      </div>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <Avatars
          setSelectedAvatar={setSelectedAvatar}
          selectedAvatarPath={selectedAvatarPath}
        />
        <div>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              const isFirstNameValid = validateName(e.target.value, true);
              if (isFirstNameValid) {
                setFormErrors((prevFormErrors) => {
                  return { ...prevFormErrors, firstNameError: null };
                });
              } else {
                setFormErrors((prevFormErrors) => {
                  return {
                    ...prevFormErrors,
                    firstNameError:
                      "First Name should have only alphabets and its length should be between 3 to 15 characters long.",
                  };
                });
              }
            }}
          />
          {formErrors.firstNameError && (
            <div className="error">{formErrors.firstNameError}</div>
          )}
        </div>
        <div>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              const islastNameValid = validateName(e.target.value);
              if (islastNameValid) {
                setFormErrors((prevFormErrors) => {
                  return { ...prevFormErrors, lastNameError: null };
                });
              } else {
                setFormErrors((prevFormErrors) => {
                  return {
                    ...prevFormErrors,
                    lastNameError:
                      "Last Name should have only alphabets and its length should be between 3 to 15 characters long.",
                  };
                });
              }
            }}
          />
          {formErrors.lastNameError && (
            <div className="error">{formErrors.lastNameError}</div>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              const isEmailValid = validateEmail(e.target.value);
              if(isEmailValid){
                setFormErrors((prevFormErrors) => {
                  return { ...prevFormErrors, emailError: null };
                });
              }
              else{
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
              if(isPasswordValid){
                setFormErrors((prevFormErrors) => {
                  return { ...prevFormErrors, passwordError: "" };
                });
              }else{
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
            <div className="error">{formErrors.passwordError}</div>
          )}
        </div>
        <button
          type="submit"
          className="action-btn"
        >
          Sign Up
        </button>
        {formErrors.serverError && (
          <div className="error server-error">
            { formErrors.serverError }
          </div>
        )}
      </form>
    </div>
  );
}
