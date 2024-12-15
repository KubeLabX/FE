import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background-color: #F4F7FC;
  border-radius: 10px;
  height: 600px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const TableContainer = styled.div`
  max-height: 500px;
  overflow-y: auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.tr`
  background-color: #F0F2F5;
  position: sticky;
  top: 0;
  z-index: 1;
  text-align: left;
`;

const TableHeaderCell = styled.th`
  text-align: center;
  padding: 10px;
  font-weight: bold;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
  text-align: center;
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: center;
`;

const ProgressCell = styled.td`
  padding: 10px;
  text-align: center;
  color: ${props => props.progress < 31 ? "green" : "black"};
`;

function RateTable({ participants }) {
    return (
        <Container>
            <Title>학생별 실습 진행률</Title>
            <TableContainer>
                <Table>
                    <thead>
                        <TableHeader>
                            <TableHeaderCell>학생이름(학번)</TableHeaderCell>
                            <TableHeaderCell>실습 진행률</TableHeaderCell>
                        </TableHeader>
                    </thead>
                    <tbody>
                        {participants && participants.length > 0 ? (
                            participants.map((student, index) => (
                                <TableRow key={index}>
                                    <TableCell>{student.name}({student.id})</TableCell>
                                    <ProgressCell progress={student.progress}>
                                        {student.progress}%
                                    </ProgressCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2} style={{ textAlign: 'center' }}>
                                    아직 참여한 학생이 없습니다.
                                </TableCell>
                            </TableRow>
                        )}
                    </tbody>
                </Table>

            </TableContainer>
        </Container>
    );
}

export default RateTable;