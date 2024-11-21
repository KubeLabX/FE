// src/App.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ResponsiveLine } from "@nivo/line";
import "../css/Dash_CPU.css";
//import Link from "@mui/material/Link";
import styled from "styled-components";
import PodGraph from "./PodGraph";
import TodoModal from './TodoModal';

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

// Todo 추가하는 버튼
const AddTodoButton = styled.button`
  left: 40px;
  bottom: 40px;
  padding: 8px 16px;
  color: black;
  border: none;
  border-radius: 10px;
  background-color: transparent;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 16px;
  gap: 8px;
  margin-left: 20px;
  &:hover {
    background-color: #4B87FF;
    color: white;
  }
`;

function Dash_Rate() {
  const [datatype, setdatatype] = useState("student");
  const navigate = useNavigate(); // useNavigate로 navigate 정의
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLogout = () => {
    navigate("/"); // 로그아웃 시 /login으로 이동
  };
  const namespaces = "example-namespace"; // 사용할 namespace. pod의 namespace 받아오기

  const studentProgress = [
    //웹소켓 이용해서 가져오기
    { name: "홍길동", id: "1234567", progress: 50 },
    { name: "신짱구", id: "1234567", progress: 0 },
    { name: "이수만", id: "1234567", progress: 30 },
    { name: "유재석", id: "1234567", progress: 40 },
    { name: "이광수", id: "1234567", progress: 50 },
    { name: "강호동", id: "1234567", progress: 60 },
    { name: "신동엽", id: "1234567", progress: 50 },
    { name: "홍길동", id: "1234567", progress: 70 },
    { name: "신짱구", id: "1234567", progress: 0 },
    { name: "이수만", id: "1234567", progress: 30 },
    { name: "유재석", id: "1234567", progress: 65 },
    { name: "이광수", id: "1234567", progress: 50 },
    { name: "강호동", id: "1234567", progress: 55 },
    { name: "신동엽", id: "1234567", progress: 50 },
  ];

  const handleAddTodo = (todo) => {
    // TODO: DB에 todo 추가 로직
    console.log('Added todo:', todo);
  };

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
            <div
              style={{
                display: "flex",
                alignItems: "center"
              }}>
              <h1>클라우드 시스템</h1>
              <AddTodoButton onClick={() => setIsModalOpen(true)}>
                + TodoList 추가하기
              </AddTodoButton>
            </div>
            <DataButtonGroup>
              <DataButton
                onClick={() => navigate("/dash_cpu")}
                active={datatype === "cpu"} //ui가 변함
              >
                CPU 사용량
              </DataButton>
              <DataButton
                onClick={() => navigate("/dash_mem")}
                active={datatype === "memory"}
              >
                메모리 사용량
              </DataButton>
              <DataButton
                onClick={() => navigate("/dash_rate")}
                active={datatype === "student"}
              >
                학생 실습률
              </DataButton>
            </DataButtonGroup>
          </div>

          <div
            id="progress-container"
            style={{
              padding: "20px",
              backgroundColor: "#F4F7FC",
              borderRadius: "10px",
            }}
          >
            <h2
              id="progress-title"
              style={{ textAlign: "center", marginBottom: "20px" }}
            >
              학생별 실습 진행률
            </h2>
            <table
              id="progress-table"
              style={{
                width: "100%",
                borderCollapse: "collapse",
                backgroundColor: "white",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <thead>
                <tr
                  id="progress-header"
                  style={{ backgroundColor: "#F0F2F5", textAlign: "left" }}
                >
                  <th
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    학생이름(학번)
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    실습 진행률
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentProgress.map((student, index) => (
                  <tr
                    key={index}
                    id={`student-row-${index}`}
                    style={{
                      borderBottom: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    <td style={{ padding: "10px" }}>
                      {student.name}({student.id})
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "center",
                        color: student.progress > 50 ? "green" : "black",
                      }}
                    >
                      {student.progress}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Buttons>
            <QuitBtn onClick={() => navigate("/main")}>실습 종료</QuitBtn>
            <ExitBtn onClick={() => navigate("/main")}>수업 나가기</ExitBtn>
          </Buttons>
          <TodoModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddTodo}
          />
        </WhiteBoard>
      </Container>
    </div>
  );
}

export default Dash_Rate;
