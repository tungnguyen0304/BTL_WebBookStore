import * as React from "react";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Typography, Box } from "@mui/material";

// Slide effect: bottom to top
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialog({ isOpen, setOpen, content, confirm }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "15px", // Bo tròn dialog
          padding: "15px",
          background: "linear-gradient(135deg, #f8f9fa, #e9ecef)", // Background nhẹ
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)", // Hiệu ứng đổ bóng
        },
      }}
    >
      <DialogContent>
        <Box textAlign="center" mb={2}>
          <Typography variant="h6" fontWeight="bold" color="primary">
            Xác nhận hành động
          </Typography>
        </Box>
        <DialogContentText
          id="alert-dialog-slide-description"
          sx={{ textAlign: "center", fontSize: "1rem", color: "#495057" }}
        >
          {content}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          onClick={() => {
            confirm();
            handleClose();
          }}
          variant="contained"
          color="success"
          sx={{
            borderRadius: "20px",
            px: 3,
            boxShadow: "0 4px 6px rgba(0, 128, 0, 0.2)", // Shadow nhẹ
            "&:hover": { backgroundColor: "#2e7d32" },
          }}
        >
          OK
        </Button>

        <Button
          onClick={handleClose}
          variant="outlined"
          color="error"
          sx={{
            borderRadius: "20px",
            px: 3,
            "&:hover": { backgroundColor: "#ffebee", color: "#d32f2f" },
          }}
        >
          Thoát
        </Button>
      </DialogActions>
    </Dialog>
  );
}
