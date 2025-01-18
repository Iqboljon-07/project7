import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./style.css";
import { usestatevalue } from "../../context";
function Modal() {
  const { setPopal, popal } = usestatevalue();
  return (
    <div className="modal">
      <div className="modal_item">
        <h5>Group name and password</h5>
        <HighlightOffIcon
          style={{ fontSize: "36px" }}
          onClick={() => setPopal(false)}
        />
      </div>

      <form action="">
        <input type="text" placeholder="Group name" />
        <input type="text" placeholder="Group password" />
        <Stack spacing={2} direction="row">
          <Button style={{ width: "100px" }} variant="contained">
            Create
          </Button>
          <Button
            onClick={() => setPopal(false)}
            style={{ width: "100px" }}
            variant="outlined"
          >
            Cancel
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default Modal;
