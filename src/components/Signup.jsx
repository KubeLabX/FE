import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
//import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function Signup() {
  const navigate = useNavigate();
  const [selectedStuPro, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div className="form-container">
      <Typography component="h1" variant="h5"
        sx={{
          fontSize: '2rem',
          fontWeight: 'bold'
        }}>
        SIGN UP
      </Typography>

      <div className="link-container">
        <FormControlLabel
          control={
            <Checkbox
              value="학생"
              color="primary"
              checked={selectedStuPro === "학생"}
              onChange={handleChange}
            />
          }
          label="학생"
        />
        <FormControlLabel
          control={
            <Checkbox
              value="강사"
              color="primary"
              checked={selectedStuPro === "강사"}
              onChange={handleChange}
            />
          }
          label="강사"
        />
      </div>

      <form>
        <TextField
          label="이름"
          required
          name="text"
          autoFocus
          className="input-field"
        />
        <br />
        <TextField
          label="학번/교번"
          required
          name="text"
          autoFocus
          className="input-field"
        />
        <br />
        <TextField
          label="비밀번호"
          type="password"
          required
          name="password"
          autoComplete="current-password"
          className="input-field"
        />
        <br />
        <TextField
          label="비밀번호 확인"
          type="password"
          required
          name="password"
          autoComplete="current-password"
          className="input-field"
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: "16px", width: "300px" }}
          onClick={() => navigate("/")}
        >
          회원 가입
        </Button>
      </form>

      <p>
        이미 회원이신가요? <Link to="/">로그인하기</Link>
      </p>
    </div>
  );
}

export default Signup;
