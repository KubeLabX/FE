import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import { handleLogin } from "../services/authService";

const LoginContainer = styled.div`
  background-color: #e6eeff;
  padding: 30px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  min-width: 400px;
`;

const InputField = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    backgroundColor: "rgba(75, 135, 255, 0.5)",
    "& fieldset": {
      borderColor: "#dde6ff",
    },
    "&:hover fieldset": {
      borderColor: "#dde6ff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2563eb",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#FFFFFF",
    fontWeight: "bold",
    "&.Mui-focused": {
      color: "#000000",
    },
  },
  width: "350px",
  marginBottom: "10px",
};

const checkboxStyle = {
  "&.Mui-checked": {
    "& .MuiSvgIcon-root": {
      color: "#00205F", // 체크 표시 색상 (진한 남색)
    },
  },
  "&:hover": {
    backgroundColor: "transparent",
  },
  "& .MuiTouchRipple-root": {
    display: "none",
  },
};

const labelStyle = {
  color: "#00205F",
  "& .MuiFormControlLabel-label": {
    fontWeight: "bold",
    fontSize: "14px",
  },
  marginRight: "16px",
};
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column; /* 모든 자식 요소들을 수직 정렬 */
  gap: 20px; /* 각 요소 사이의 간격을 설정 */
  align-items: center; /* 중앙 정렬 */
  width: 100%; /* 부모 요소의 너비를 꽉 채움 */
`;
export default function App() {
  const [selectedStuPro, setSelectedOption] = useState(""); // 학생/강사 선택
  const [userData, setUserData] = useState({
    user_id: "",
    password: "",
    user_type: "",
  });

  const navigate = useNavigate();

  // 체크박스에서 학생/강사 선택 시 처리
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setUserData({
      ...userData,
      user_type: event.target.value === "학생" ? "s" : "t",
    });
  };

  // 회원가입 페이지로 이동
  const handleSignupClick = (event) => {
    event.preventDefault();
    navigate("/signup");
  };

  // 로그인 폼 제출 처리
  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    try {
      const message = await handleLogin(userData); // 로그인 요청
      console.log(message); // 성공 메시지 출력
      navigate("/main"); // 성공 시 메인 페이지로 이동
    } catch (error) {
      alert(error.message); // 실패 시 오류 메시지 출력
    }
  };

  return (
    <div className="form-container">
      <LoginContainer>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "30px",
            color: "#00205F",
          }}
        >
          LOG IN
        </Typography>

        <form onSubmit={handleLoginSubmit}>
          <FormWrapper>
            <TextField
              label="학번/교번"
              required
              name="user_id"
              autoFocus
              className="input-field"
              value={userData.user_id}
              onChange={(e) =>
                setUserData({ ...userData, user_id: e.target.value })
              }
              sx={InputField}
            />

            <TextField
              label="비밀번호"
              type="password"
              required
              name="password"
              autoComplete="current-password"
              className="input-field"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
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

            <Button type="submit" variant="contained" className="loginbtn">
              로그인
            </Button>
          </FormWrapper>
        </form>
      </LoginContainer>
    </div>
  );
}
