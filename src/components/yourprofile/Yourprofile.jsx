import React, { memo, useEffect, useState } from "react";

import "./style.css";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStateValue } from "../../context";
import axios from "axios";
function Yourprofile() {
  const [data, setData] = useState([]);
  const { setPopal } = useStateValue();

  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get(
          "https://nt-shopping-list.onrender.com/api/auth",
          {
            headers: {
              "x-auth-token": ` ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response);
        let data = await response.data;
        setData(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  // console.log(localStorage.getItem("user"));
  // console.log(data);
  //   console.log(JSON.parse(localStorage.getItem("user")));
  return (
    <>
      <div className="item">
        <div className="title1">
          <h1>Your profile</h1>

          <div className="title4">
            <div className="title3">
              <h1>{data?.name?.toUpperCase()?.charAt(0)} </h1>
            </div>

            <div className="title11">
              <div className="title10">
                {data?.name?.charAt(0)?.toUpperCase() + data?.name?.slice(1)}

                <Stack direction="row" spacing={2}>
                  <Button
                    style={{
                      width: "80px",
                      height: "27px",
                      background: "green",
                      color: "white",
                      textAlign: "center",
                    }}
                    variant="outlined"
                  >
                    {data?.status}
                  </Button>
                </Stack>
              </div>
              <p>{data?.username}</p>
            </div>
          </div>
        </div>
        <div className="title2">
          <Button
            style={{ width: "200px", height: "40px" }}
            variant="contained"
          >
            <ContentCopyIcon /> Copy UserName
          </Button>
          <Button
            style={{ width: "200px", background: "red", height: "40px" }}
            variant="contained"
          >
            <DeleteIcon />
            Delete AccounT
          </Button>
        </div>
      </div>
    </>
  );
}

export default Yourprofile;
