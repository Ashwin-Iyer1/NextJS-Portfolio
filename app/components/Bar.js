import React from "react";
import "./Bar.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
export default function Bar() {
  return (
    <div className="Bar">
      <div className="name-section">
        <h1>Ashwin Iyer</h1>
      </div>
      <div className="links-section">
        <Stack direction="row" spacing={2}>
          <Button href="/" color={"secondary"}>
            <h2>Home</h2>
          </Button>
          <Button href="/projects" color={"secondary"}>
            <h2>Projects</h2>
          </Button>
          <Button href="/about" color={"secondary"}>
            <h2>About</h2>
          </Button>
        </Stack>
      </div>
    </div>
  );
}
