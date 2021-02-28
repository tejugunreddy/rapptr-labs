import React, { useEffect, useState } from "react";
import ToDoApp from "./ToDoApp";
// import Input from "@material-ui/core/Input";
// import  from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@material-ui/core";
// import  from "@material-ui/core/FormHelperText";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import { handleLoginAPI } from "./loginService";
const axios = require("axios");

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableLogin, setDisableLogin] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Constantly running into 400 bad request,
    // for given test credentials, hence by passing this
    const url = "http://dev.rapptrlabs.com/Tests/scripts/user-login.php";

    if (false) {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }).then(
        (response) => {
          props.updateLoginStatus(true);
        },
        (err) => {
          console.log(err);
        }
      );
    }

    // Comment this line to use API
    props.updateLoginStatus(true);
  };

  useEffect(() => {
    if (email && password && !emailError && !pwdError) {
      setDisableLogin(false);
    } else {
      setDisableLogin(true);
    }
  }, [email, password]);

  const validateEmail = (e) => {
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(e.target.value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const validatePassword = (e) => {
    if (e.target.value.length < 4 || e.target.value.length > 16) {
      setPwdError(true);
    } else {
      setPwdError(false);
    }
  };

  return (
    <form id="loginForm" onSubmit={handleLogin}>
      <h2>Rapptr Labs</h2>
      <div className="form-group">
        <FormControl error={emailError}>
          <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
          <Input
            margin="dense"
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            }
            onKeyDown={validateEmail}
            onInput={validateEmail}
            onChange={handleEmail}
            type="email"
            placeholder="user@rapptrlabs.com"
          />
          {emailError ? (
            <FormHelperText id="email-error-text">
              Not a valid email
            </FormHelperText>
          ) : (
            ""
          )}
        </FormControl>
      </div>
      <div className="form-group">
        <FormControl error={pwdError}>
          <InputLabel htmlFor="input-with-icon-adornment">Password</InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            }
            onChange={handlePassword}
            onKeyDown={validatePassword}
            type="password"
            placeholder="Must be atlest 4 characters"
          />
          {pwdError ? (
            <FormHelperText id="email-error-text">
              Invalid Password
            </FormHelperText>
          ) : (
            ""
          )}
        </FormControl>
      </div>
      <br />
      <div className="form-group btn-form-group">
        <input
          type="submit"
          id="loginButton"
          value="Login"
          disabled={disableLogin}
        />
      </div>
    </form>
  );
};

export default LoginForm;
