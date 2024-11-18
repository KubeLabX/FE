// src/App.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
//import Link from "@mui/material/Link";

import Typography from "@mui/material/Typography";

export default function App() {
  const [selectedStuPro, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const navigate = useNavigate();

  const handleSignupClick = (event) => {
    event.preventDefault();
    navigate("/signup"); //회원가입 페이지로 이동함.
  };

  return (
    <div className="form-container">
      <Typography component="h1" variant="h5">
        LOG IN
      </Typography>
      <TextField
        label="학번/교번"
        required
        name="email"
        autoFocus
        className="input-field"
      />
      <TextField
        label="비밀번호"
        type="password"
        required
        name="password"
        autoComplete="current-password"
        className="input-field"
      />
      <div className="link-container">
        <div>
          <Link href="#">비밀번호 찾기</Link>
        </div>
        <div>
          <Link to="#" onClick={handleSignupClick}>
            회원가입
          </Link>
        </div>
      </div>

      <div className="link-container">
        <FormControlLabel
          control={
            <Checkbox
              value="강사"
              color="primary"
              checked={selectedStuPro === "강사"}
              onChange={handleChange}
            />
          }
          label="강사인가요?"
        />
        <FormControlLabel
          control={
            <Checkbox
              value="학생"
              color="primary"
              checked={selectedStuPro === "학생"}
              onChange={handleChange}
            />
          }
          label="학생인가요?"
        />
      </div>

      <Button
        type="submit"
        variant="contained"
        sx={{ marginTop: "16px", width: "300px" }}
        onClick={() => navigate("/main")}
      >
        로그인
      </Button>
    </div>
  );
}
