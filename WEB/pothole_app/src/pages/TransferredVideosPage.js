// src/pages/TransferredVideosPage.js
import React, { useContext, useState, useRef } from 'react';
import { StateContext } from '../StateContext';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const TransferredVideosPage = () => {
  const { state } = useContext(StateContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');
  const videoRef = useRef(null); // 비디오 요소 참조

  const goBack = () => {
    navigate('/mypage');
  };

  const openModal = async (video) => {
    setCurrentVideo(video.url);
    setIsModalOpen(true);
    await speak('재생합니다.');
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideo('');
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleVideoEnded = async () => {
    // 비디오 재생이 끝났을 때 음성 안내 추가
    await speak('재생이 종료되었습니다.');
    setIsModalOpen(false);
    setCurrentVideo('');
  };

  const formatFilename = (filename) => {
    return filename; // 이미 "YY-MM-DD" 형식으로 저장됨
  };

  const speak = (text) => {
    return new Promise((resolve) => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ko-KR';

        utterance.onend = () => {
          resolve();
        };

        utterance.onerror = (event) => {
          console.error('음성 합성 에러:', event.error);
          resolve();
        };

        window.speechSynthesis.speak(utterance);
      } else {
        console.error('이 브라우저는 음성 합성을 지원하지 않습니다.');
        resolve();
      }
    });
  };

  return (
    <div className="container">
      <h1 className="header">전송 현황</h1>
      {state.transferredVideos.length > 0 ? (
        <div className="video-grid">
          {state.transferredVideos.map((video, index) => (
            <div key={index} className="video-item">
              <img
                src="/thumbnail.png" // 썸네일 이미지 경로
                alt="비디오 썸네일"
                className="thumbnail-image"
                onClick={() => openModal(video)}
              />
              <p
                className="filename-text"
                onClick={() => openModal(video)}
              >
                {formatFilename(video.filename)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>전송된 비디오가 없습니다.</p>
      )}
      <button onClick={goBack}>마이페이지로 돌아가기</button>

      {/* 모달 창 구현 */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <video
              src={currentVideo}
              ref={videoRef}
              onEnded={handleVideoEnded}
              width="100%"
              controls
              muted // 음소거 설정 (자동 재생을 보장하기 위해)
              autoPlay
              onLoadedMetadata={() => {
                if (videoRef.current) {
                  videoRef.current.playbackRate = 1.5; // 재생 속도 1.5배속 설정
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferredVideosPage;
