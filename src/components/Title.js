import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Title = () => {
  return (
    <Box
      className="padding_top"
      sx={{
        mx: "auto",
        width: "100%",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        textAlign: "center",
        fontSize: "0.875rem",
        fontWeight: "700",
      }}
    >
      <Typography variant="h5" component="div" gutterBottom>
        COVID Information
      </Typography>
    </Box>
  );
};

export default Title;
