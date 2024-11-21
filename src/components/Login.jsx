// src/App.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import styled from "styled-components";
//import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const LoginContainer = styled.div`
  background-color: #E6EEFF;
  padding: 30px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  min-width: 400px;
`;

const InputField = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
    backgroundColor: 'rgba(75, 135, 255, 0.5)',
    '& fieldset': {
      borderColor: '#dde6ff',
    },
    '&:hover fieldset': {
      borderColor: '#dde6ff',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2563eb',
    }
  },
  '& .MuiInputLabel-root': { // label 
    color: '#FFFFFF',
    fontWeight: 'bold',
    '&.Mui-focused': {
      color: '#000000',
    }
  },
  width: '350px',
  marginBottom: '10px'
};

const checkboxStyle = {
  '&.Mui-checked': {
    '& .MuiSvgIcon-root': {
      color: '#00205F', // 체크 표시 색상 (진한 남색)
    }
  },
  '&:hover': {
    backgroundColor: 'transparent',
  },
  '& .MuiTouchRipple-root': { // ripple 효과 제거
    display: 'none'
  }
};

const labelStyle = {
  color: '#00205F',
  '& .MuiFormControlLabel-label': {
    fontWeight: 'bold',
    fontSize: '14px'
  },
  marginRight: '16px'
};

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
      <LoginContainer>
        <Typography component="h1" variant="h5"
          sx={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '30px',
            color: '#00205F'
          }}>
          LOG IN
        </Typography>
        <TextField
          label="학번/교번"
          required
          name="email"
          autoFocus
          className="input-field"
          sx={InputField}
        />
        <TextField
          label="비밀번호"
          type="password"
          required
          name="password"
          autoComplete="current-password"
          className="input-field"
          sx={InputField}
        />
        <div className="link-container">
          <FormControlLabel
            control={
              <Checkbox
                value="강사"
                color="primary"
                checked={selectedStuPro === "강사"}
                onChange={handleChange}
                sx={checkboxStyle}
              />
            }
            label="강사인가요?"
            sx={labelStyle}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="학생"
                color="primary"
                checked={selectedStuPro === "학생"}
                onChange={handleChange}
                sx={checkboxStyle}
              />
            }
            label="학생인가요?"
            sx={labelStyle}
          />
        </div>

        <div className="link-container">
          <div>
            아직 회원이 아니신가요?
            <Link to="#" onClick={handleSignupClick}>
              회원가입 하기
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          variant="contained"
          className="loginbtn"
          onClick={() => navigate("/main")}
        >
          로그인
        </Button>
      </LoginContainer>
    </div>
  );
}
