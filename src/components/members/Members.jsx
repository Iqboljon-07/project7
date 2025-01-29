import React, { useEffect } from "react";
import "./style.css";

import { useStateValue } from "../../context";
import { Style } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
const Members = () => {
  const { membermodal, setMemberModal } = useStateValue();
  const { groupId } = useParams();
  console.log(groupId);
  const navigate = useNavigate();
  const { show, setShow, detail, setDetail } = useStateValue();
  const [user, setUser] = React.useState("");
  console.log(user);

  const onChange = async (e) => {
    e.preventDefault();
    const memberId = e.target.value;
    console.log(user);
    // try {
    //   let response = await axios.post(
    //     "https://nt-shopping-list.onrender.com/api/:groupId/members",
    //     {
    //       memberId,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "x-auth-token": localStorage.getItem("token"),
    //       },
    //     }
    //   );
    //   console.log(response);
    // } catch (err) {
    //   console.log(err);
    // }
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
            onChange={onChange}
            style={{
              width: "100%",
              padding: "8px",
              outline: "none",
              borderRadius: "5px",
            }}
            type="text"
            placeholder="Search user"
          />
        </div>
      </div>
      ;
    </>
  );
};

export default Members;
