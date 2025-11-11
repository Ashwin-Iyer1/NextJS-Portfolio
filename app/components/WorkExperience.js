const zealImage = "/Images/zeal.png";
const wellingtonImage = "/Images/wellington_management_logo.jpeg";
import Box from "@mui/material/Box";
import { Divider, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";
const workDateFormat = (date) => {
  return (
    <span
      style={{
        backgroundColor: "#6E6E6E90",
        padding: "2px 4px",
        borderRadius: "4px",
      }}
      className="work-date"
    >
      {date}
    </span>
  );
};

export default function WorkExperience() {
  return (
    <List sx={{ width: "100%",  display: "flex", flexDirection: "column", gap: 2 }}>
      <ListItem sx={{borderBottom: "none !important"}}>
        <ListItemAvatar>
          <Box>
            <img
              src={wellingtonImage}
              alt="Wellington Management Logo"
              height={50}
            />
          </Box>
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <b>Wellington Management</b>{" "}
              {workDateFormat("Incoming Spring 2026 Co-op")}
            </>
          }
          secondary="Global Risk and Analytics Co-op"
          sx={{
            color: "white",
            "& .MuiListItemText-secondary": { color: "white" },
          }}
        />
      </ListItem>
      <Divider sx={{
        border: "1px solid rgba(255, 255, 255, 0.05)"
      }}/>
      <ListItem>
        <ListItemAvatar>
          <Box>
            <img src={zealImage} alt="Zeal" height={50} />
          </Box>
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <b>Zeal IT Consultants</b>{" "}
              {workDateFormat("May 2025 - August 2025")}
            </>
          }
          secondary="Frontend Developer Intern"
          sx={{
            color: "white",
            "& .MuiListItemText-secondary": { color: "white" },
          }}
        />
      </ListItem>
    </List>
  );
}
