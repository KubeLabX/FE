import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { ClassCreate, ClassJoin } from './Modal';
import { handleLogout } from "../services/logout";
import api from '../api/axios';

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
  
  display: flex;
  align-items: center;
  gap: 40px;  
  position: relative;  // 추가: 자식 요소의 absolute 포지셔닝을 위해
`;

const ClassName = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  min-width: 200px;
`;

const ClassDetail = styled.p`
  color: #BBBBBB;
  font-size: 1.25rem;
  min-width: 150px;
`;

const ClassDate = styled.p`
  color: #00205F;
  font-size: 1.2rem;
  position: absolute;  // 추가
  right: 30px;        // 추가: 오른쪽에 붙이기
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
  const [error, setError] = useState(null);
  //추구 DB에서 데이터 받아올 예정
  const [classes, setClasses] = useState([]);
  //장고에서 받아오거나, 혹은 localStorage에 로그인 시 저장해두고 받아오기(현재에는 일단 임시저장)
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");


  //모달 창 여부(클릭 시에만 true)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenProfessorModal = () => {
    setIsModalOpen(true);
  };

  const handleOpenStudentModal = () => {
    setIsModalOpen(true);
  };

  //수업 클릭 시
  // Main.js 파일의 handleClassClick 함수 수정
  const handleClassClick = async (classItem) => {
    try {
      const response = await api.get(`/course/${classItem.course_id}`);

      if (response.status === 200) {
        // 성공적으로 수업 입장이 확인되면 해당 경로로 이동
        if (userRole === 't') {
          navigate(`/professor/course/${classItem.course_id}`);
        } else {
          navigate(`/student/course/${classItem.course_id}`);
        }
      }
    } catch (error) {
      if (error.response?.status === 403) {
        alert('이 수업에 접근할 권한이 없습니다.');
      } else if (error.response?.status === 404) {
        alert('존재하지 않는 수업입니다.');
      } else {
        alert('수업 입장 중 오류가 발생했습니다.');
      }
      console.error('Error entering course:', error);
    }
  };



  //수업 list 받아오는 함수
  const fetchClasses = async () => {
    try {
      const response = await api.get('/course/list/');

      //서버에서 보낸 username, role저장
      setUserName(response.data.name);
      const role = response.data.role;
      setUserRole(role);

      //class데이터 받기
      const classes = response.data.courses.map(course => ({
        name: course.name,
        course_id: course.id,
        ...(role === 't'
          ? {
            studentCount: course.participant_count,
            createdDate: new Date(course.created_at).toLocaleDateString()
          }
          : {
            teacherName: course.teacher_name,
            createdDate: new Date(course.created_at).toLocaleDateString()
          })
      }));
      setClasses(classes);

    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        setError('인증에 실패했습니다. 다시 로그인해주세요.');
        navigate('/');
        return;
      }
      setError('강의 목록을 불러오는데 실패했습니다.');
    }
  };

  //추후 언마운트 시
  useEffect(() => {
    let mounted = true;  // 컴포넌트 마운트 상태 추적

    const loadData = async () => {
      if (!mounted) return;  // 언마운트된 경우 실행 중지
      await fetchClasses();
    };

    loadData();
    return () => mounted = false;  // 컴포넌트 언마운트 시 플래그 변경
  }, []);

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
              <ClassCard key={index} onClick={() => handleClassClick(classItem)}>
                <ClassName>{classItem.name}</ClassName>
                <ClassDetail><strong>참여인원: {classItem.studentCount}명</strong></ClassDetail>
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
              <ClassCard key={index} onClick={() => handleClassClick(classItem)}>
                <ClassName>{classItem.name}</ClassName>
                <ClassDetail><strong>담당교수: {classItem.teacherName}</strong></ClassDetail>
                <ClassDate>참여일: {classItem.createdDate}</ClassDate>
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
          <LogoutBtn onClick={handleLogout} >
            로그아웃
          </LogoutBtn>
        </NavRight>
      </Navbar>
      <WhiteBoard>
        {userRole === "t" ? (
          <>
            <Ifprofessor />
            <ClassCreate
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            // onSubmit={(projectName) => {
            //   // Handle project creation
            //   setIsModalOpen(false);
            // }}
            />
          </>
        ) : (
          <>
            <Ifstudent />
            <ClassJoin
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            // onSubmit={(classCode) => {
            //   // Handle class joining
            //   setIsModalOpen(false);
            // }}
            />
          </>
        )}
      </WhiteBoard>
    </Container>
  );
}

export default Main;