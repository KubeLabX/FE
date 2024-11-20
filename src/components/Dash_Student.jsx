import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

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

const NavbarContainer = styled.div`  // 새로 추가
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
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

const BoardContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;  // 터미널과 TodoList 영역 비율
  gap: 20px;
  height: 100%;
`;

const Terminal = styled.div`
  background: black;
  border-radius: 10px;
  padding: 20px;
  color: white;
  font-family: monospace;
  height: 500px;
  overflow-y: auto;
`;

const TodoListContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TodoTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #E5E7EB;
  
  &:last-child {
    border-bottom: none;
  }
`;

const TodoCheckbox = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 12px;
  accent-color: #4B87FF;
`;

const TodoText = styled.span`
  flex: 1;
  color: ${props => props.checked ? '#9CA3AF' : '#1F2937'};
  text-decoration: ${props => props.checked ? 'line-through' : 'none'};
`;

const AddTodoButton = styled.button`
  display: flex;
  align-items: center;
  color: #6B7280;
  padding: 10px 0;
  border: none;
  background: none;
  cursor: pointer;
  width: 100%;
  
  &:hover {
    color: #4B87FF;
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

function Dash_Student() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("이영진");
  const [todos, setTodos] = useState([
    { id: 1, text: "lab6 디렉토리 만들기", completed: true },
    { id: 2, text: "lab7 디렉토리 만들기", completed: true },
    { id: 3, text: "lab8 디렉토리 만들기", completed: false },
    { id: 4, text: "lab9 디렉토리 만들기", completed: false },
  ]);

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <Container>
      <NavbarContainer>
        <Navbar>
          <NavLeft>
            <Title>
              클라우드 시스템
            </Title>
          </NavLeft>
          <NavRight>
            <UserName><strong>{userName}</strong>님이 로그인중</UserName>
            <LogoutBtn onClick={() => navigate("/")}>
              로그아웃
            </LogoutBtn>
          </NavRight>
        </Navbar>
      </NavbarContainer>
      <WhiteBoard>
        <BoardContent>
          <Terminal>
            $~: mkdir hello_world
          </Terminal>
          <TodoListContainer>
            <TodoTitle>TodoList</TodoTitle>
            {todos.map(todo => (
              <TodoItem key={todo.id}>
                <TodoCheckbox
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <TodoText checked={todo.completed}>{todo.text}</TodoText>
              </TodoItem>
            ))}
          </TodoListContainer>
        </BoardContent>
        <Buttons>
          <QuitBtn onClick={() => navigate("/main")}>실습 종료</QuitBtn>
          <ExitBtn onClick={() => navigate("/main")}>수업 나가기</ExitBtn>
        </Buttons>
      </WhiteBoard>
    </Container>
  );
}

export default Dash_Student;