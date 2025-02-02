import React, { useEffect, useState } from "react";
import "./style.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useStateValue } from "../../context";
import axios from "axios";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { HiH1 } from "react-icons/hi2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DeleteIcon from "@mui/icons-material/Delete";
import { FaHourglass } from "react-icons/fa";
import Members from "../members/Members";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Details() {
  //usestate orqali
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setMemberModal(true);
  };
  const { show, setShow } = useStateValue();

  const { groupId } = useParams();
  const { detail, setDetail, text, setText } = useStateValue();
  const { items, setItems, members, setMembers } = useStateValue();
  const { isBought, setIsBought } = useStateValue();
  const [pending, setisPending] = React.useState("");
  const { membermodal, setMemberModal } = useStateValue();
  const { groups, setGroups } = useStateValue();
  const [me, setMe] = React.useState(null);

  // console.log(detail);

  //console.log(groupId);

  //delete Group
  const DeleteGroup = async () => {
    //yokida funksiyani ichiga id berib axios groupId o'rniga id qoysa ham ishlaydi
    try {
      let response = await axios.delete(
        `https://nt-shopping-list.onrender.com/api/groups/${groupId}`,
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message);
        setGroups(groups.filter((item) => item._id !== groupId));
        navigate("/");
        setShow(true);
        setAnchorEl(null);

        // setGroups((prevGroups) =>
        //   prevGroups.filter((group) => group.id !== groupId)
        // );
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete group");
    }
  };

  //leave group
  const LeaveGroup = async () => {
    try {
      let res = await axios.post(
        `https://nt-shopping-list.onrender.com/api/groups/${groupId}/leave`,
        {},
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(res);
      if (res.status === 200) {
        toast.success(res.data.message);
        setGroups(groups.filter((group) => group._id !== groupId));
        navigate("/");
        setShow(true);
        setAnchorEl(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //detailsga  groupsdan tutvolish
  useEffect(() => {
    if (location.reload) {
      //   //shunga narsa ancha vaqt oldi
      setShow(false);
    }
    (async function () {
      try {
        let response = await axios.get(
          `https://nt-shopping-list.onrender.com/api/groups`,

          {
            headers: {
              "x-auth-token": `${localStorage.getItem("token")}`,
            },
          }
        );
        let resme = await axios.get(
          `https://nt-shopping-list.onrender.com/api/auth`,
          {
            headers: {
              "x-auth-token": `${localStorage.getItem("token")}`,
            },
          }
        );

        let result = response.data?.find((val) => val._id === groupId);
        ///////////////////////////////////////
        setMe(resme.data); //delet qilishniki
        //////////////////////////////////////
        setDetail(result);
        setItems(result.items);
        setMembers(result.members);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [groupId, isBought]);
  // console.log("detail", detail);
  // console.log("me", me);

  //items ga create qilish
  const onSubmit = async (e) => {
    e.preventDefault();

    let todos = {
      text,
    };

    try {
      setisPending("creating");

      let response = await axios.post(
        `https://nt-shopping-list.onrender.com/api/items`,
        {
          title: todos.text,
          groupId,
        },
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(response);
      if (response.status == 201) {
        setisPending("");
        toast.success("Ma'lumotingiz qo'shildi");
        setItems([...items, response.data.item]);
        setText("");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Xatolik");
    }
  };

  //items ni delete qilish
  const deletItem = async (id) => {
    try {
      setisPending(id);

      let response = await axios.delete(
        `https://nt-shopping-list.onrender.com/api/items/${id}`,
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("token")}`,
          },
        }
      );
      //console.log(response);
      if (response.status == 200) {
        setisPending(false);
        setItems(items.filter((item) => item._id !== id));
        toast.success(response.data.message);
      }
    } catch (err) {
      setisPending(false);
      console.log(err.message);
      toast.error("Xatolik");
    }
  };

  //let result = detail?.find((val) => val._id === groupId); //tashqarida qo'llasak ham bo'ladi
  // console.log(result);
  //memberni delet qilish
  const Deletemember = async function (memberId) {
    try {
      let response = await axios.delete(
        `https://nt-shopping-list.onrender.com/api/groups/${groupId}/members/${memberId}`,
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("token")}`,
          },
        }
      );
      //console.log(response);
      if (response.status === 200) {
        setisPending(false);
        toast.success(response.data.message);
        setMembers(members.filter((member) => member._id !== memberId)); //Eslab qol
      }
    } catch (err) {
      console.log(err);
      setisPending(false);
    }
  };

  // sotib olish

  const toggleIsBought = async function (itemId) {
    let res = await axios.post(
      `https://nt-shopping-list.onrender.com/api/items/${itemId}/mark-as-bought`,
      {},
      {
        headers: {
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
      }
    );
    setIsBought(!isBought);
    //console.log(res);
    if (res.status == 200) {
      toast.success(res.data.message);
    }
  };
  //sotib olganni otmen qilish
  const toggleNotIsBought = async function (itemId) {
    let res = await axios.delete(
      `https://nt-shopping-list.onrender.com/api/items/${itemId}/mark-as-bought`,

      {
        headers: {
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(res);
    if (res.status == 200) {
      toast.success(res.data.message);
    }
    setIsBought(!isBought);
  };

  return (
    <div className="detail">
      <div className="detail_item">
        <div className="detail_title">
          <h1>{detail?.name} </h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <button>
              Owner:
              <span className="span">
                {detail?.owner?.name.toUpperCase().charAt(0)}
              </span>
              {detail?.owner?.name.toUpperCase().charAt(0) +
                detail?.owner.name.slice(1)}
              (
              {detail?.owner.username.toUpperCase().charAt(0) +
                detail?.owner.username.slice(1)}
              )
            </button>

            <div>
              <Button
                style={{
                  width: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreHorizIcon />
                <ArrowDropDownIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(false)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Add member</MenuItem>

                {me?._id === detail?.owner?._id ? (
                  <MenuItem onClick={DeleteGroup}>
                    {/* <MenuItem onClick={() => DeleteGroup(detail._id)}> ishlaydi*/}
                    Delete Group
                  </MenuItem>
                ) : (
                  <MenuItem onClick={LeaveGroup}>Leave Group</MenuItem>
                )}
              </Menu>
            </div>
          </div>
        </div>
        <div className="detail_title2">
          <div style={{ backgroundColor: "#ffffff" }} className="detail_items">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>
                Items <span className="span">{items?.length}</span>
              </h3>
              <form
                onSubmit={onSubmit}
                style={{ display: "flex", gap: "5px" }}
                action=""
              >
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  style={{
                    padding: "5px 0",

                    border: "1px solid #ccc",

                    borderRadius: "5px",
                    textIndent: "5px",
                  }}
                  type="text"
                  placeholder="Title"
                />

                <button type="submit">
                  {pending === "creating" ? (
                    "..."
                  ) : (
                    <AddIcon style={{ fontSize: "14px" }} />
                  )}
                </button>
              </form>
            </div>
            <div className="items_title">
              {items?.map((val) => (
                <div key={val._id} className="items_title1">
                  <div style={{ display: "flex", gap: "10px" }}>
                    <span className="span">
                      {val?.title?.toUpperCase()?.charAt(0)}
                    </span>

                    <div style={{ display: "grid", gap: "5px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <p>
                          {val?.title?.toUpperCase()?.charAt(0) +
                            val?.title.slice(1)}
                        </p>
                        <p
                          style={{
                            background: "aqua",
                            borderRadius: "5px",
                            padding: "5px 10px",
                            fontSize: "10px",
                            textWrap: "wrap",
                          }}
                        >
                          Bought By
                          {val?.owner?.name?.toUpperCase()?.charAt(0) +
                            val?.owner?.name.slice(1)}
                          {val?.createdAt}
                        </p>
                      </div>

                      <p
                        style={{
                          display: "flex",
                          gap: "5px",
                          color: "grey",
                          fontSize: "12px",
                        }}
                      >
                        <span> Crated By</span>
                        {val?.owner?.name?.toUpperCase()?.charAt(0) +
                          val?.owner.name.slice(1)}
                        ({val?.createdAt})
                      </p>
                    </div>
                  </div>

                  <div className="icons">
                    <div
                      onClick={() => {
                        if (val.isBought) {
                          return toggleNotIsBought(val._id);
                        } else {
                          return toggleIsBought(val._id);
                        }
                      }}
                    >
                      {val.isBought ? (
                        <DoneAllIcon style={{ backgroundColor: "blue" }} />
                      ) : (
                        <ShoppingCartIcon />
                      )}
                    </div>
                    {me?._id === val?.owner?._id ? (
                      <div onClick={() => deletItem(val._id)}>
                        {pending === val._id ? (
                          <FaHourglass
                            style={{ backgroundColor: "aqua" }}
                            className={`${pending ? "hourglass" : ""} `}
                          />
                        ) : (
                          <DeleteIcon style={{ backgroundColor: "red" }} />
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: "#ffffff" }} className="detail_items">
            <h3>
              Members <span className="span">{detail?.members?.length}</span>
            </h3>

            <div style={{ marginTop: "15px" }} className="items_title">
              {members?.map((item) => (
                <div className="members_title" key={item._id}>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span className="span">
                        {item?.name?.toUpperCase()?.charAt(0)}{" "}
                      </span>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                        }}
                      >
                        <p>
                          {item?.name?.toUpperCase().charAt(0) +
                            item?.name?.slice(1)}
                        </p>
                        <p style={{ color: "grey" }}>{item?.username} </p>
                      </div>
                    </div>
                  </div>
                  {detail?.owner?._id === me?._id && item._id !== me._id ? (
                    <div
                      onClick={() => Deletemember(item._id)}
                      style={{ color: "red" }}
                    >
                      {pending ? (
                        <FaHourglass
                          style={{ backgroundColor: "aqua" }}
                          className={`${pending ? "hourglass" : ""} `}
                        />
                      ) : (
                        <DeleteIcon />
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {membermodal && <Members />}
    </div>
  );
}

export default Details;

// useEffect(() => {
//   const test = function () {
//     axios
//       .get(`https://nt-shopping-list.onrender.com/api/groups`, {
//         headers: {
//           "x-auth-token": localStorage.getItem("token"),
//         },
//       })
//       .then((response) => {
//         let result = response?.data?.find((item) => item.id == id);
//         setDetail(result);
//       });
//   };
//   test();
// }, []);

// useEffect(() => {
//   (async function () {
//     let response = await axios.get(
//       `https://nt-shopping-list.onrender.com/api/groups`,
//       {
//         headers: {
//           "x-auth-token": `${localStorage.getItem("token")}`, //2-usul
//         },
//       }
//     );
//     let result = response.data.find((val) => val._id === id);
//     setDetail(result);
//   })();
// }, []);

{
  /* <div>
              <h4 style={{ display: "flex", alignItems: "center" }}>
                Items <span className="span"> </span>
              </h4>
            </div> */
}
