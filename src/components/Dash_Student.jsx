import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import styled from "styled-components";
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import api from '../api/axios';
import { handleLogout } from "../services/logout";

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

const NavbarContainer = styled.div`
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

const TerminalContainer = styled.div`
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

const NoTodoMessage = styled.div`
  text-align: center;
  color: #6B7280;
  font-size: 1rem;
  margin-top: 20px;
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
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseName, setCourseName] = useState(""); // Course name state
  const [userName, setUserName] = useState(""); // User name state
  const [todos, setTodos] = useState([]); // Todo list state

  const handleDropCourse = async () => {
    const isConfirmed = window.confirm("정말로 이 수업을 드랍하시겠습니까?");

    if (isConfirmed) {
      try {
        await api.delete(`/course/${courseId}/drop`);
        navigate("/main");
      } catch (error) {
        console.error("Failed to drop course:", error);
        alert("수업 드랍에 실패했습니다.");
      }
    }
  };

  const terminalRef = useRef(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseResponse = await api.get(`/course/${courseId}`);
        setCourseName(courseResponse.data.course_name);
        setUserName(courseResponse.data.user_name);

        const todoResponse = await api.get(`/course/${courseId}/list`);
        console.log('Fetched todos:', todoResponse.data.todo_list); // Debugging output
        setTodos(todoResponse.data.todo_list);
      } catch (error) {
        console.error("Failed to fetch course or todo data:", error);
      }
    };

    fetchCourseData();
  }, [courseId]);

  useEffect(() => {
    if (terminalRef.current) {
      const term = new Terminal({
        cursorBlink: true,
        fontSize: 14,
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        theme: {
          background: '#000000',
          foreground: '#ffffff'
        }
      });

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(terminalRef.current);
      fitAddon.fit();

      term.writeln('Terminal Test Mode');
      term.writeln('Type something to test...');
      term.write('\r\n$ ');

      let commandBuffer = '';

      term.onData(data => {
        if (data === '\r') {
          term.write('\n');
          if (commandBuffer.trim().length > 0) {
            if (commandBuffer === 'clear') {
              term.clear();
            } else {
              term.writeln(`Command entered: ${commandBuffer}`);
            }
          }
          commandBuffer = '';
          term.write('$ ');
        } else if (data === '\x7f') {
          if (commandBuffer.length > 0) {
            commandBuffer = commandBuffer.slice(0, -1);
            term.write('\b \b');
          }
        } else {
          commandBuffer += data;
          term.write(data);
        }
      });

      const handleResize = () => fitAddon.fit();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        term.dispose();
      };
    }
  }, []);

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
          </NavLeft>
          <NavRight>
            <UserName><strong>{userName}</strong>님이 로그인중</UserName>
            <LogoutBtn onClick={handleLogout}>
              로그아웃
            </LogoutBtn>
          </NavRight>
        </Navbar>
      </NavbarContainer>
      <WhiteBoard>
        <h1>{courseName}</h1>
        <BoardContent>
          <TerminalContainer ref={terminalRef} />
          <TodoListContainer>
            <TodoTitle>TodoList</TodoTitle>
            {todos.length > 0 ? (
              todos.map(todo => (
                <TodoItem key={todo.id}>
                  <TodoCheckbox
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <TodoText checked={todo.completed}>{todo.content}</TodoText>
                </TodoItem>
              ))
            ) : (
              <NoTodoMessage>할 일이 없습니다.</NoTodoMessage>
            )}
          </TodoListContainer>
        </BoardContent>
        <Buttons>
          <QuitBtn onClick={() => navigate("/main")}>실습 종료하기</QuitBtn>
          <ExitBtn onClick={handleDropCourse}>수업 드랍하기</ExitBtn>
        </Buttons>
      </WhiteBoard>
    </Container>
  );
}

export default Dash_Student;
