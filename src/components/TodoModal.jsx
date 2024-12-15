import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../api/axios';

// Modal 관련 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const TodoInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #4B87FF;
  }
`;

const TodoInputContainer = styled.div`
  position: relative;
`;

const AddMoreBtn = styled.button`
  background: none;
  border: none;
  color: #4B87FF;
  font-size: 0.9rem;
  padding: 4px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: -15px;
  margin-bottom: 15px;
  
  &:hover {
    color: #3B69C6;
  }
`;

const AddBtn = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #4B87FF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #3B69C6;
  }
`;

const ExistingTodoContainer = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const NoTodoMessage = styled.div`
  color: #6B7280;
  font-size: 0.95rem;
  text-align: center;
  margin-bottom: 10px;
`;

const ExistingTodoContent = styled.div`
  padding: 8px;
  border-bottom: 1px solid #e5e7eb;
  color: #4B5563;
  font-size: 0.95rem;
  
  &:last-child {
    border-bottom: none;
  }
`;

const Divider = styled.div`
  margin: 20px 0;
  border-top: 1px solid #e5e7eb;
  position: relative;
  text-align: center;
  
  &:after {
    content: "새로운 항목";
    background: white;
    padding: 0 10px;
    color: #6B7280;
    font-size: 0.9rem;
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const TodoModal = ({ isOpen, onClose, courseId }) => {
  const [todos, setTodos] = useState(['']); // 새로운 Todo 입력 필드 상태
  const [existodo, setExistodo] = useState([]); // 서버에서 가져올 기존 Todo 목록
  const [courseName, setCourseName] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 서버에서 기존 Todo 목록 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await api.get(`/course/${courseId}`);
        setCourseName(courseResponse.data.course_name);
        setUserName(courseResponse.data.user_name);

        const todoResponse = await api.get(`/course/${courseId}/list`);
        setExistodo(todoResponse.data.todo_list);
      } catch (error) {
        setError('Failed to fetch data');
        console.error('Failed to fetch data:', error);
      }
    };

    if (isOpen) fetchData();
  }, [courseId, isOpen]);

  // 새로운 Todo 서버로 전송 및 상태 업데이트
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nonEmptyTodos = todos.filter(todo => todo.trim() !== '');
    if (nonEmptyTodos.length === 0) return;

    try {
      setIsSubmitting(true);
      const response = await api.post(`/course/${courseId}/add`, { todos: nonEmptyTodos });
      setExistodo(prev => [...prev, ...response.data.todos]); // 서버에서 반환된 todos 추가
      setTodos(['']); // 입력 필드 초기화
    } catch (error) {
      console.error('Todo 추가 중 오류 발생:', error);
      setError('Failed to add to-do(s).');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 입력 필드 값 변경
  const handleInputChange = (index, value) => {
    const newTodos = [...todos];
    newTodos[index] = value;
    setTodos(newTodos);
  };

  // 새로운 입력 필드 추가
  const addNewInput = () => {
    setTodos([...todos, '']);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalTitle>실습 목록 추가하기</ModalTitle>
        <ExistingTodoContainer>
          {existodo.length === 0 ? (
            <NoTodoMessage>TodoList가 없습니다.</NoTodoMessage>
          ) : (
            existodo.map(todo => (
              <ExistingTodoContent key={todo.id}>
                {todo.content}
              </ExistingTodoContent>
            ))
          )}
        </ExistingTodoContainer>

        <Divider />
        <form onSubmit={handleSubmit}>
          {todos.map((todo, index) => (
            <TodoInputContainer key={index}>
              <TodoInput
                type="text"
                value={todo}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder={`실습 목록 ${index + 1}`}
                autoFocus={index === 0}
              />
              {index === todos.length - 1 && (
                <AddMoreBtn type="button" onClick={addNewInput}>
                  + 항목 추가
                </AddMoreBtn>
              )}
            </TodoInputContainer>
          ))}
          <AddBtn type="submit" disabled={isSubmitting}>{isSubmitting ? '처리 중...' : '생성하기'}</AddBtn>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TodoModal;
