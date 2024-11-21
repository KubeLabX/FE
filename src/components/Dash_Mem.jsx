// src/App.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ResponsiveLine } from "@nivo/line";
//import "../css/Dash_CPU.css";
//import Link from "@mui/material/Link";
import styled from "styled-components";
import PodGraph from "./PodGraph";

const Container = styled.div`
  min-height: 100vh;
  background-color: #e6eeff; // 하늘색 배경
  padding: 20px;
`;

const WhiteBoard = styled.div`
  background: white;
  border-radius: 40px;
  padding: 20px;
  margin: 20px auto;
  max-width: 1200px;
  min-height: 600px; // 최소 높이 설정
  height: auto;
  overflow-y: auto;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
const DataButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;
const DataButton = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#4f91ff" : "#ccc")};
  color: ${(props) => (props.active ? "white" : "black")};
  &:hover {
    background-color: ${(props) => (props.active ? "#3578e5" : "#ddd")};
  }
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

//메인 페이지 명을 할말
const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
`;

const UserName = styled.span`
  color: #374151;
`;

const LogoutBtn = styled.button`
  padding: 8px 25px;
  margin-left: 20px;
  font-weight: bold;
  background-color: #f91010;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  &:hover {
    background-color: #ff3333;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 20px;
`;

const QuitBtn = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background-color: #f3f4f6;
  color: #4b5563;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #4b87ff;
    color: white;
  }
`;

const ExitBtn = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background-color: #f3f4f6;
  color: #4b5563;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #f91010;
    color: white;
  }
`;

function Dash_Mem() {
  const [datatype, setdatatype] = useState("memory");
  const navigate = useNavigate(); // useNavigate로 navigate 정의
  const handleLogout = () => {
    navigate("/login"); // 로그아웃 시 /login으로 이동
  };
  const namespaces = "example-namespace"; // 사용할 namespace. pod의 namespace 받아오기

  return (
    <div className="dash">
      <Container>
        <Navbar>
          <NavLeft></NavLeft>
          <NavRight>
            <UserName>
              <strong>강사</strong>님이 로그인중
            </UserName>
            <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
          </NavRight>
        </Navbar>

        <WhiteBoard>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1>클라우드 시스템</h1>
            <DataButtonGroup>
              <DataButton
                onClick={() => setdatatype("cpu")}
                active={datatype === "cpu"}
              >
                CPU 사용량
              </DataButton>
              <DataButton
                onClick={() => setdatatype("memory")}
                active={datatype === "memory"}
              >
                메모리 사용량
              </DataButton>
              <DataButton
                onClick={() => setdatatype("student")}
                active={datatype === "student"}
              >
                학생 실습률
              </DataButton>
            </DataButtonGroup>
          </div>
          <PodGraph
            namespaces={[
              "namespace1",
              "namespace2",
              "namespace3",
              "namespace4",
            ]}
            datatype={datatype}
          />
          <Buttons>
            <QuitBtn onClick={() => navigate("/main")}>실습 종료</QuitBtn>
            <ExitBtn onClick={() => navigate("/main")}>수업 나가기</ExitBtn>
          </Buttons>
        </WhiteBoard>
      </Container>
    </div>
  );
}

export default Dash_Mem;
