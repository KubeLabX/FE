import React, { useState } from 'react';
import styled from 'styled-components';

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


const TodoModal = ({ isOpen, onClose, onSubmit }) => {
    const [todos, setTodos] = useState(['']);
    const [existodo, setexistodo] = useState([
        { id: 1, text: "lab6 디렉토리 만들기", completed: false },
        { id: 2, text: "lab7 디렉토리 만들기", completed: false },
        { id: 3, text: "lab8 디렉토리 만들기", completed: false },
        { id: 4, text: "lab9 디렉토리 만들기", completed: false },
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (todos.trim()) {
            onSubmit(todos);
            setTodos('');
            onClose();
        }
    };

    const handleInputChange = (index, value) => {
        const newTodos = [...todos];
        newTodos[index] = value;
        setTodos(newTodos);
    };

    const addNewInput = () => {
        setTodos([...todos, '']);
    };

    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <ModalTitle>실습 목록 추가하기</ModalTitle>
                <ExistingTodoContainer>
                    {existodo.map(todo => (
                        <ExistingTodoContent key={todo.id}>
                            {todo.text}
                        </ExistingTodoContent>
                    ))}
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
                    <AddBtn type="submit">생성하기</AddBtn>
                </form>
            </ModalContent>
        </ModalOverlay>
    );
};

export default TodoModal;
