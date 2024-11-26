// pages/MyPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const MyPage = () => {
  const navigate = useNavigate();

  const goToTransferredVideos = () => {
    navigate('/transferred-videos');
  };

  const goToRewardCheck = () => {
    navigate('/reward-check');
  };

  const goToPointStatus = () => {
    navigate('/point-status');
  };

  return (
    <div className="container">
      <h1 className="header">마이페이지</h1>
      <div className="button-container">
        <button className="main-button" onClick={goToTransferredVideos}>
          <div className="emoji-icon">📂</div>
          전송 현황
        </button>
        <button className="main-button" onClick={goToRewardCheck}>
          <div className="emoji-icon">🏆</div>
          보상 확인
        </button>
        <button className="main-button" onClick={goToPointStatus}>
          <div className="emoji-icon">💰</div>
          포인트 현황
        </button>
      </div>
    </div>
  );
};

export default MyPage;
