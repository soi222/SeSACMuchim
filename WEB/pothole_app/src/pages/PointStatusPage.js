// pages/PointStatusPage.js
import React, { useContext } from 'react';
import { StateContext } from '../StateContext';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const PointStatusPage = () => {
  const { state } = useContext(StateContext);
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <h1 className="header">포인트 현황</h1>
      <p>총 포인트: {state.totalPoints}</p>
      <button onClick={goBack}>메인 페이지로 돌아가기</button>
    </div>
  );
};

export default PointStatusPage;
