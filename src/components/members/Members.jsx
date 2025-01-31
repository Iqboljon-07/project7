import React, { useEffect } from "react";
import "./style.css";

import { useStateValue } from "../../context";
import { Style } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-toastify";
const Members = () => {
  const { membermodal, setMemberModal } = useStateValue();
  const { members, setMembers } = useStateValue();
  const { groupId } = useParams();
  //console.log(groupId);
  const navigate = useNavigate();

  const {
    show,
    setShow,
    detail,
    setDetail,
    memberSearches,
    setMemberSearches,
  } = useStateValue();

  const onChange = async (member) => {
    //console.log(member);
    try {
      let response = await axios.get(
        `https://nt-shopping-list.onrender.com/api/users/search?q=${member}`,
        {},
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        setMemberSearches(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const Addmember = async (val) => {
    try {
      const response = await axios.post(
        `https://nt-shopping-list.onrender.com/api/groups/${groupId}/members`,
        { memberId: val._id },
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("token")}`,
          },
        }
      );
      //console.log(response);
      if (response.status === 200) {
        setisPending("");
        toast.success(response.data.message);
        setMemberModal(false);
        setMembers((prev) => [...prev, val]);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error");
    }
  };

  return (
    <>
      <div className={`members `}>
        <div className="members_item   ">
          <div
            style={{
              display: "flex",
              height: "90px",

              justifyContent: "space-between",

              alignItems: "center",
              borderBottom: "1px solid grey",
            }}
          >
            <h3>Add Member</h3>
            <CloseIcon
              onClick={() => {
                setMemberModal(false);
              }}
            />
          </div>
          <input
            onChange={(e) => onChange(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              outline: "none",
              borderRadius: "5px",
            }}
            type="text"
            placeholder="Search user"
          />

          <ul>
            {memberSearches.map((val) => (
              <li onClick={() => Addmember(val)} key={val._id}>
                {/* id o'rniga val o'zini bervorib tepadada id tutvolamiz */}
                {val.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      ;
    </>
  );
};

export default Members;
