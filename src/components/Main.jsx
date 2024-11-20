import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { ClassCreate, ClassJoin } from './Modal';

const Container = styled.div`
  min-height: 100vh;
  background-color: #E6EEFF;  // 하늘색 배경
  padding: 20px;
`;

const WhiteBoard = styled.div`
  background: white;
  border-radius: 40px;
  padding: 20px;
  margin: 20px auto;
  max-width: 1200px;
  min-height: 600px;  // 최소 높이 설정
  height: auto;       
  overflow-y: auto;   
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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
  background-color: #F91010;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  &:hover {
    background-color: #ff3333;
  }
`;

const ClassList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ClassCard = styled.div`
  border: 1px solid #00205F;
  border-radius: 30px;
  padding: 20px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const ClassName = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`;

const ClassDetail = styled.p`
  color: #BBBBBB;
  font-size: 1.25rem;
  margin-bottom: 4px;
`;

const ClassDate = styled.p`
  color: #00205F;
  font-size: 1.2rem;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  min-height: 300px;
`;

const EmptyText = styled.p`
  color: #6b7280;
  margin-bottom: 40px;
`;

const CreateBtn = styled.button`
  background-color: #4B87FF;
  color: white;
  font-size: 2rem;
  padding: 20px 50px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #3B69C6;
  }
`;

const PlusBtn = styled.button`
  position: fixed;
  bottom: 70px;
  right: 100px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #4B87FF;
  color: white;
  font-size: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #3B69C6;
  }
`;

function Main() {
  const navigate = useNavigate();
  //추구 DB에서 데이터 받아올 예정
  const [userRole, setUserRole] = useState("professor");
  const [userName, setUserName] = useState("이영진");
  const [classes, setClasses] = useState([
    {
      name: "컴퓨터과학 개론",
      studentCount: 42,
      createdDate: "2023-03-15",
      teacherName: "김교수",
      joinDate: "2023-03-18"
    },
    {
      name: "웹 프로그래밍",
      studentCount: 35,
      createdDate: "2023-03-20",
      teacherName: "박교수",
      joinDate: "2023-03-22"
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenProfessorModal = () => {
    setIsModalOpen(true);
  };

  const handleOpenStudentModal = () => {
    setIsModalOpen(true);
  };

  const Ifprofessor = () => (
    <div>
      {classes.length === 0 ? (
        <EmptyContainer>
          <EmptyText>현재 생성된 수업이 없습니다.</EmptyText>
          <CreateBtn onClick={handleOpenProfessorModal}>
            <span>+</span>
            <span><strong>수업 생성하기</strong></span>
          </CreateBtn>
        </EmptyContainer>
      ) : (
        <>
          <ClassList>
            {classes.map((classItem, index) => (
              <ClassCard key={index}>
                <ClassName>{classItem.name}</ClassName>
                <ClassDetail><strong>{classItem.studentCount}명이 참여중..</strong></ClassDetail>
                <ClassDate>생성일: {classItem.createdDate}</ClassDate>
              </ClassCard>
            ))}
          </ClassList>
          <PlusBtn onClick={handleOpenProfessorModal}>+</PlusBtn>
        </>
      )}
    </div>
  );

  const Ifstudent = () => (
    <div>
      {classes.length === 0 ? (
        <EmptyContainer>
          <EmptyText>현재 참여한 수업이 없습니다.</EmptyText>
          <CreateBtn onClick={handleOpenStudentModal}>
            <span>+</span>
            <span>수업 참여하기</span>
          </CreateBtn>
        </EmptyContainer>
      ) : (
        <>
          <ClassList>
            {classes.map((classItem, index) => (
              <ClassCard key={index}>
                <ClassName>{classItem.name}</ClassName>
                <ClassDetail><strong>{classItem.teacherName}</strong></ClassDetail>
                <ClassDate>참여일: {classItem.joinDate}</ClassDate>
              </ClassCard>
            ))}
          </ClassList>
          <PlusBtn onClick={handleOpenStudentModal}>+</PlusBtn>
        </>
      )}
    </div>
  );

  return (
    <Container>
      <Navbar>
        <NavLeft>
        </NavLeft>
        <NavRight>
          <UserName><strong>{userName}</strong>님이 로그인중</UserName>
          <LogoutBtn onClick={() => navigate("/")}>
            로그아웃
          </LogoutBtn>
        </NavRight>
      </Navbar>
      <WhiteBoard>
        {userRole === "professor" ? (
          <>
            <Ifprofessor />
            <ClassCreate
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={(projectName) => {
                // Handle project creation
                setIsModalOpen(false);
              }}
            />
          </>
        ) : (
          <>
            <Ifstudent />
            <ClassJoin
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={(classCode) => {
                // Handle class joining
                setIsModalOpen(false);
              }}
            />
          </>
        )}
      </WhiteBoard>
    </Container>
  );
}

export default Main;