import React, { useEffect, useState } from "react";
import { useStateValue } from "../../context";
import "./main.css";
import apple from "../../assets/apple.jpg";
import orange from "../../assets/apelsin.jpg";
import axios from "axios";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import Yourprofile from "../yourprofile/Yourprofile";

import { Navigate, useNavigate } from "react-router-dom";
function Main() {
  const [data, setData] = React.useState([]);
  const { setPopal } = useStateValue();
  const { show, setShow } = useStateValue();
  const { search, setSearch } = useStateValue();

  const navigate = useNavigate();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       console.log("data");
  //       let response = await axios.get(
  //         "https://nt-shopping-list.onrender.com/api/auth",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       console.log(response);
  //       let data = await response.data;
  //       setData(data);
  //       console.log(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  // }, []);

  return (
    <>
      <main
        onClick={() => {
          setPopal(false), setSearch("");
        }}
      >
        {show && <Yourprofile />}
      </main>
    </>
  );
}

export default Main;
