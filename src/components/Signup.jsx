import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Signup.css";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { handleSignUp } from "../services/authService";

const SignupContainer = styled.div`
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
  marginBottom: "15px",
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

function Signup() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    studentId: "",
    password: "",
    confirmPassword: "",
    userType: "", // 학생 또는 강사
  });

  const [selectedStuPro, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setUserData({ ...userData, userType: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    // 유효성 검사
    if (
      !userData.name ||
      !userData.studentId ||
      !userData.password ||
      !userData.userType
    ) {
      alert("모든 필드를 입력하세요.");
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 서버 요청 본문 형식에 맞게 데이터 변환
    const payload = {
      usertype: userData.userType === "학생" ? "s" : "t", // "s" = 학생, "t" = 강사
      user_id: userData.studentId,
      password: userData.password,
      first_name: userData.name,
    };

    try {
      const message = await handleSignUp(payload); // handleSignUp 함수 호출
      console.log(message); // 성공 메시지 출력
      navigate("/"); // 성공 후 로그인 페이지로 리다이렉션
    } catch (error) {
      console.error(error.message); // 오류 메시지 출력
    }
  };

  return (
    <div className="form-container">
      <SignupContainer>
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontSize: "2rem", fontWeight: "bold" }}
        >
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

        <form onSubmit={handleSubmit}>
          <TextField
            label="이름"
            required
            name="name"
            autoFocus
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            sx={InputField}
          />
          <br />
          <TextField
            label="학번/교번"
            value={userData.studentId}
            required
            name="studentId"
            autoFocus
            onChange={(e) =>
              setUserData({ ...userData, studentId: e.target.value })
            }
            sx={InputField}
          />
          <br />
          <TextField
            label="비밀번호"
            type="password"
            required
            name="password"
            autoComplete="current-password"
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            sx={InputField}
          />
          <br />
          <TextField
            label="비밀번호 확인"
            type="password"
            required
            name="confirmPassword"
            autoComplete="current-password"
            value={userData.confirmPassword}
            onChange={(e) =>
              setUserData({ ...userData, confirmPassword: e.target.value })
            }
            sx={InputField}
          />
          <br />
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: "16px", width: "300px" }}
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
