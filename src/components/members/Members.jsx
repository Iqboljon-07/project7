import React, { useEffect, useState } from "react";
import "./style.css";
import { useStateValue } from "../../context";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-toastify";

const Members = () => {
  const {
    membermodal,
    setMemberModal,
    members,
    setMembers,
    show,
    setShow,
    detail,
    setDetail,
    memberSearches,
    setMemberSearches,
  } = useStateValue();

  const { groupId } = useParams();

  const [isPending, setIsPending] = useState(false);

  const onChange = async (member) => {
    try {
      let response = await axios.get(
        `https://nt-shopping-list.onrender.com/api/users/search?q=${member}`,
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
      setIsPending(true);
      const response = await axios.post(
        `https://nt-shopping-list.onrender.com/api/groups/${groupId}/members`,
        { memberId: val._id },
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setMemberModal(false);
        setMembers([...members, val]);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <div className={`members ${membermodal ? "show" : ""}`}>
        <div className="members_item">
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
            <CloseIcon onClick={() => setMemberModal(false)} />
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
                {val.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Members;
