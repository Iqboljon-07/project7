import React from "react";
import "./style.css";
import { useStateValue } from "../../context";
import Join from "../join/Join";
import { useNavigate } from "react-router-dom";
function Search() {
  const { datas, setdatas } = useStateValue();
  const { setSearch, search } = useStateValue();

  //console.log(datas);
  const navigate = useNavigate();
  return (
    <div className="search">
      <div className="search_item">
        <h1>Groups</h1>

        <div className="search_item_1">
          {datas?.map((val, inx) => (
            <div key={val._id} className="search_title">
              <div className="search_item2">
                <div>
                  <h2>{val.name} </h2>
                  <p style={{ marginTop: "10px" }}>
                    Created By {val.owner.name}
                  </p>
                </div>
                <button className="btn2">
                  {new Date(val.createdAt).getHours() +
                    ":" +
                    new Date(val.createdAt).getMinutes() +
                    "," +
                    new Date(val.createdAt).getDate() +
                    "-" +
                    new Date(val.createdAt).getMonth() +
                    1 +
                    "-" +
                    new Date(val.createdAt).getFullYear()}
                </button>
              </div>
              <button
                className="btn3"
                onClick={() => {
                  {
                    navigate(`search/${val._id}`);
                  }
                }}
                style={{ backgroundColor: "green", width: "50px" }}
              >
                join
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;

{
  /* <div
style={{
  background: "green",
  height: "30px",
  width: "40px",
  textAlign: "center",
  lineHeight: "30px",
  color: "white",
  marginLeft: "200px",
}}
>
Join
</div> */
}
