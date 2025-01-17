import axios from "axios";
import React from "react";
import logo from "../../assets/logo.svg";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.css";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

import FormControl from "@mui/material/FormControl";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  if (localStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  }
  const username = React.useRef(null);
  const password = React.useRef(null);
  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: username.current.value,
      password: password.current.value,
    };
    console.log(user.username);

    (async () => {
      try {
        let response = await axios.post(
          "https://nt-shopping-list.onrender.com/api/auth",
          {
            username: user.username,
            password: user.password,
          },

          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        if (response.status === 200) {
          toast.success("Signed in successfully");
          navigate("/");
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
      } catch (error) {
        toast.error("Invalid credentials");
        console.error(error);
      }
    })();
  };

  return (
    <div className="login">
      <div className="login_item">
        <div className="login_title1">
          <img src={logo} alt="" />
          <h6>Welcome back to</h6>
          <h2>Shopping List</h2>
        </div>
        <div className="login_title2">
          <p>Sign In</p>
          <form onSubmit={onSubmit} action="">
            <div className="label">
              <label>Username</label>
              <input ref={username} type="text" placeholder="login" />
            </div>
            <div className="label">
              <label>Password</label>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    inputRef={password}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Box>
            </div>
            <button className="btns">Submit</button>
          </form>
          <span style={{ width: "100%", fontSize: "14px" }}>
            No account yet? <NavLink to="/registr">Create One.</NavLink>{" "}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
