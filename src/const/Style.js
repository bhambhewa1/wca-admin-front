export const Style = {
  table: {
    tableWrapBox: {
      overflow: "auto",
      p: {xs:1,sm:3},
      
    },
    tableBox: {
      minWidth: { xs: "775px", md: "100%" },
      border: "1px solid #dddddd",
      borderRadius: "25px",
    },
    tableCell: { width: "100px", fontSize: "13px", color: "#707070", fontWeight: "600",padding:'20px' },
  },
  button: {
    textTransform: "none",
    borderRadius: "5px",
    pl:4,pr:4,
    bgcolor: "#F15F23",
    color: "white",
    "&.MuiButtonBase-root:hover": {
      bgcolor: "#F15F23",
    },
  }
};
