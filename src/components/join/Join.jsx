import React, { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./style.css";
import { useStateValue } from "../../context";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// FORM USULDA
function Join() {
  const navigate = useNavigate();
  const { searchId } = useParams();
  console.log(searchId);

  const { search, setSearch } = useStateValue();
  const { groups, setGroups } = useStateValue();
  const onSubmit = async (e) => {
    e.preventDefault();

    const password = e.target[0].value;
    console.log(password);

    try {
      let response = await axios.post(
        `https://nt-shopping-list.onrender.com/api/groups/${searchId}/join`,

        {
          password,
        },

        {
          headers: {
            "x-auth-token": `${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Signed in successfully");

        navigate("/");
        setSearch("");
      }
    } catch (error) {
      toast.error("Invalid password");
      console.error(error);
    }
  };

  return (
    <div className="join">
      <div className="join_item">
        <h5>Group name and password</h5>
        <HighlightOffIcon
          style={{ fontSize: "36px" }}
          onClick={() => navigate("/")}
        />
      </div>

      <form onSubmit={onSubmit} action="">
        <input type="password" placeholder="Group password" />
        <Stack spacing={2} direction="row">
          <Button type="submit" style={{ width: "220px" }} variant="contained">
            Join Group
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default Join;
