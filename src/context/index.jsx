import React, { createContext, useContext, useState } from "react";
let str2 = "Salom";
export { str2 };
const Context = createContext();
function Provider({ children }) {
  const [popal, setPopal] = React.useState(false);
  const [password, setPassword] = React.useState(false);
  const [show, setShow] = useState(true);
  const [fronet, setFronet] = useState(false);
  const [search, setSearch] = React.useState("");
  const [datas, setDatas] = React.useState([]);
  const [join, setJoin] = React.useState(false);
  const [groups, setGroups] = React.useState([]);
  const [detail, setDetail] = React.useState(null);
  const [creatgroup, setCreatGroup] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [members, setMembers] = React.useState([]);
  const [text, setText] = useState("");
  const [isBought, setIsBought] = useState(false);
  const [membermodal, setMemberModal] = React.useState();
  const [memberSearches, setMemberSearches] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  let str = "salom";

  return (
    <>
      <Context.Provider
        value={{
          popal,
          setPopal,
          setPassword,
          password,
          show,
          setShow,
          fronet,
          setFronet,
          search,
          setSearch,
          datas,
          setDatas,
          join,
          setJoin,
          groups,
          setGroups,
          detail,
          setDetail,
          creatgroup,
          setCreatGroup,
          items,
          setItems,
          members,
          setMembers,
          text,
          setText,
          isBought,
          setIsBought,
          membermodal,
          setMemberModal,
          memberSearches,
          setMemberSearches,
        }}
      >
        {children}
      </Context.Provider>
    </>
  );
}

export default Provider;

export const useStateValue = () => useContext(Context);
