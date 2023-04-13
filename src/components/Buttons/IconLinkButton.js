import React from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const IconLinkButton = ({ buttonName, onClickLink, onClickButton, state }) => {
  return (
    <>
      {buttonName === "Edit" ? (
        <Link state={state} to={onClickLink} style={{ textTransform: "none" }}>
          <img
            alt="edit"
            style={{
              width: "19px",
              height: "19px",
              marginRight: "40px",
              cursor: "pointer",
              color: "#4969B2",
            }}
            src={require("../../assests/edit.png")}
          />
        </Link>
      ) : (
        <DeleteIcon onClick={onClickButton} sx={{ fontSize: "24px", color: "#DC3545" }}></DeleteIcon>
      )}
    </>
  );
};

export default IconLinkButton;
