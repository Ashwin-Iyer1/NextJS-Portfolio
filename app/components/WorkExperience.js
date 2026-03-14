const zealImage = "/Images/zeal.png";
const wellingtonImage = "/Images/wellington_management_logo.jpeg";
import Box from "@mui/material/Box";
import { Divider, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";

const workDateFormat = (date) => {
  return (
    <span
      style={{
        backgroundColor: "var(--bg-card-hover)",
        color: "var(--text-secondary)",
        padding: "2px 8px",
        borderRadius: "6px",
        fontSize: "0.85rem",
        fontWeight: 500,
      }}
      className="work-date"
    >
      {date}
    </span>
  );
};

export default function WorkExperience() {
  return (
    <List sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
      <ListItem sx={{ borderBottom: "none !important" }}>
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
              {workDateFormat("Spring 2026 Co-op")}
            </>
          }
          secondary="Global Risk and Analytics Co-op"
          sx={{
            color: "var(--text-primary)",
            "& .MuiListItemText-secondary": { color: "var(--text-secondary)" },
          }}
        />
      </ListItem>
      <Divider sx={{
        border: "1px solid var(--border-color)"
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
            color: "var(--text-primary)",
            "& .MuiListItemText-secondary": { color: "var(--text-secondary)" },
          }}
        />
      </ListItem>
    </List>
  );
}
