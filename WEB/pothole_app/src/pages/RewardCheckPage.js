// pages/RewardCheckPage.js
import React, { useContext } from 'react';
import { StateContext } from '../StateContext';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const RewardCheckPage = () => {
  const { state } = useContext(StateContext);
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/');
  };

  const goToTransferredVideos = () => {
    navigate('/transferred-videos');
  };

  return (
    <div className="container">
      <h1 className="header">보상 확인</h1>
      <p>감지된 포트홀: {state.transferredVideos.length}</p>
      <p>총 포인트: {state.totalPoints}</p>
      <button onClick={goToTransferredVideos}>전송 현황으로 이동</button>
      <button onClick={goBack}>메인 페이지로 돌아가기</button>
    </div>
  );
};

export default RewardCheckPage;
