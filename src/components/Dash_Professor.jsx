import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Graph from "./PodGraph";
import api from '../api/axios';
import { handleLogout } from "../services/logout";
import TodoModal from "./TodoModal";
import CpuMonitor from "./Cpu";
import MemoryMonitor from "./Memory";
import RateTable from "./Ratetable";

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
  background-color: ${(props) => (props['data-active'] ? "#4f91ff" : "#ccc")};
  color: ${(props) => (props['data-active'] ? "white" : "black")};
  &:hover {
    background-color: ${(props) => (props['data-active'] ? "#3578e5" : "#ddd")};
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

const TodoText = styled.span`
  flex: 1;
  color: ${props => props.checked ? '#9CA3AF' : '#1F2937'};
  text-decoration: ${props => props.checked ? 'line-through' : 'none'};
`;

const AddTodoButton = styled.button`
  padding: 8px 16px;
  color: #6B7280;
  border: none;
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
  font-size: 16px;
  white-space: nowrap;  // 텍스트 줄바꿈 방지
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    color: #4B87FF;
  }
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
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
  background-color: #F3F4F6;
  color: #4B5563;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #4B87FF;
    color: white;
  }
`;

const ExitBtn = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background-color: #F3F4F6;
  color: #4B5563;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background-color: #F91010;
    color: white;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;  // 요소들 사이 간격
`;

const CourseTitle = styled.h1`
  margin: 0;
  white-space: nowrap;  
`;

const CourseCode = styled.h4`
  font-size: 1.2rem;
  margin-left: 10px;
`;


function Dashboard() {
  const { courseId } = useParams();
  const [courseCode, setcourseCode] = useState("");
  const [datatype, setdatatype] = useState("cpu");
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [participants, setParticipants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const namespaces = "example-namespace";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await api.get(`/course/${courseId}`);
        setCourseName(courseResponse.data.course_name);
        setUserName(courseResponse.data.user_name);
        setcourseCode(courseResponse.data.course_code)

        if (datatype === "student") {
          const progressResponse = await api.get(`/course/${courseId}/participants/`);
          setParticipants(progressResponse.data.participants);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [courseId, datatype]);

  const renderContent = () => {
    switch (datatype) {
      case "cpu":
        return <CpuMonitor namespaces={namespaces} />;
      case "memory":
        return <MemoryMonitor namespaces={namespaces} />;
      case "student":
        return <RateTable participants={participants} />;
      default:
        return null;
    }
  };

  const handleAddTodo = (todo) => {
    // TODO: DB에 todo 추가 로직
    console.log("Added todo:", todo);
  };

  return (
    <div className="dash">
      <Container>
        <Navbar>
          <NavLeft></NavLeft>
          <NavRight>
            <UserName>
              <strong>{userName}</strong>님이 로그인중
            </UserName>
            <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
          </NavRight>
        </Navbar>

        <WhiteBoard>
          <ContentHeader>
            <TitleContainer>
              <CourseTitle>{courseName}</CourseTitle>
              <CourseCode>수업 코드: {courseCode}</CourseCode>
              <AddTodoButton onClick={() => setIsModalOpen(true)}>
                + TodoList 추가하기
              </AddTodoButton>
            </TitleContainer>
            <DataButtonGroup>
              <DataButton
                onClick={() => setdatatype("cpu")}
                data-active={datatype === "cpu"}
              >
                CPU 사용량
              </DataButton>
              <DataButton
                onClick={() => setdatatype("memory")}
                data-active={datatype === "memory"}
              >
                메모리 사용량
              </DataButton>
              <DataButton
                onClick={() => setdatatype("student")}
                data-active={datatype === "student"}
              >
                학생 실습률
              </DataButton>
            </DataButtonGroup>
          </ContentHeader>

          {renderContent()}

          <Buttons>
            <QuitBtn onClick={() => navigate("/main")}>실습 종료</QuitBtn>
            <ExitBtn onClick={() => navigate("/main")}>수업 나가기</ExitBtn>
          </Buttons>

          <TodoModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            courseId={courseId} />
        </WhiteBoard>
      </Container>
    </div>
  );
}

export default Dashboard;