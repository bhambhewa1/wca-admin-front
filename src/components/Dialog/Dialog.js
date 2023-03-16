import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

const AlertDialog = ({ title, text, open, onClickButton, onClickButtonCancel }) => {
  return (
    <div>
      <Dialog
        open={open}
        // onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle sx={{ fontSize: "18px", color: "#3D2E57" }} id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "16px", color: "#A8A8A8", minWidth: "260px" }} id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              bgcolor: "#EB5757",
              "&.MuiButtonBase-root:hover": {
                bgcolor: "#EB5757",
              },
            }}
            onClick={onClickButtonCancel}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#27AE60",
              textTransform: "none",
              "&.MuiButtonBase-root:hover": {
                bgcolor: "#27AE60",
              },
            }}
            onClick={onClickButton}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AlertDialog;
