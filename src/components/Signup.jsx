import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Signup.css";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
//import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

const SignupContainer = styled.div`
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
  marginBottom: '15px'
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

function Signup() {
  const navigate = useNavigate();
  const [selectedStuPro, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div className="form-container">
      <SignupContainer>
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
                sx={checkboxStyle}
              />
            }
            label="학생"
            sx={labelStyle}
          />
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
            label="강사"
            sx={labelStyle}
          />
        </div>

        <form>
          <TextField
            label="이름"
            required
            name="text"
            autoFocus
            className="input-field"
            sx={InputField}
          />
          <br />
          <TextField
            label="학번/교번"
            required
            name="text"
            autoFocus
            className="input-field"
            sx={InputField}
          />
          <br />
          <TextField
            label="비밀번호"
            type="password"
            required
            name="password"
            autoComplete="current-password"
            className="input-field"
            sx={InputField}
          />
          <br />
          <TextField
            label="비밀번호 확인"
            type="password"
            required
            name="password"
            autoComplete="current-password"
            className="input-field"
            sx={InputField}
          />
          <br />
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: "16px", width: "300px" }}
            onClick={() => navigate("/")}
            className="signupbtn"
          >
            회원 가입
          </Button>
        </form>

        <p>
          이미 회원이신가요? <Link to="/">로그인하기</Link>
        </p>
      </SignupContainer>
    </div>
  );
}

export default Signup;
