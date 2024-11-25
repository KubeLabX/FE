import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import styled from 'styled-components';
import api from '../api/axios';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 40px;
  padding: 32px;
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 16px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;
  color: #F91010;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    color: #FF3333;
  }
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 32px;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  margin-bottom: 24px;
  box-sizing: border-box;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #4B87FF;
  }
  &::placeholder {
    color: #9CA3AF;
  }
`;

const ModalButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #4B87FF;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  &:hover {
    background-color: #3B69C6;
  }
`;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  //모달 창 외부를 클릭해도 닫히도록
  const handleContainerClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalContainer onClick={handleContainerClick}>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <X size={24} />
        </CloseButton>
        {children}
      </ModalContent>
    </ModalContainer>
  );
};

const ClassCreate = ({ isOpen, onClose }) => {
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectName.trim()) {
      setError('수업명을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await api.post('/course/create/', {
        name: projectName.trim()
      });

      alert(`수업이 생성되었습니다. 수업 코드: ${response.data.course_code}`);
      navigate(`/dash_pro`); //추후 수정 필요
      onClose();

    } catch (error) {
      if (error.response?.status === 403) {
        setError('수업 생성 권한이 없습니다.');
      } else {
        setError('수업 생성에 실패했습니다.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalTitle>수업 생성하기</ModalTitle>
      <form onSubmit={handleSubmit}>
        <ModalInput
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="수업명을 입력하세요"
        />
        <ModalButton
          type="submit"
        >
          생성하기
        </ModalButton>
      </form>
    </Modal>
  );
};

const ClassJoin = ({ isOpen, onClose }) => {
  const [classCode, setClassCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedCode = classCode.trim();
    if (!trimmedCode) {
      setError('수업 코드를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await api.post('/course/register/', {
        code: trimmedCode
      });

      alert(`${response.data.course_name} 수업에 참여완료되었습니다.`);
      navigate('/dash_stu'); //추후 이동 url수정 필요
      onClose();

    } catch (error) {
      if (error.response?.status === 404) {
        setError('존재하지 않는 수업 코드입니다.');
      } else if (error.response?.status === 400 && error.response.data.error.includes('already registered')) {
        setError('이미 참여한 수업입니다.');
      } else {
        setError('수업 참여에 실패했습니다.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalTitle>수업 참여하기</ModalTitle>
      <form onSubmit={handleSubmit}>
        <ModalInput
          type="text"
          value={classCode}
          onChange={(e) => setClassCode(e.target.value)}
          placeholder="수업코드를 입력하세요"
        />
        <ModalButton
          type="submit"
        >
          입장하기
        </ModalButton>
      </form>
    </Modal>
  );
};

export { ClassCreate, ClassJoin };