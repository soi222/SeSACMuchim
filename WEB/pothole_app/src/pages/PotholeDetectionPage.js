// src/pages/PotholeDetectionPage.js
import React, { useState, useContext, useEffect, useRef } from 'react';
import { StateContext } from '../StateContext';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar'; // 진행 바 컴포넌트
import '../styles.css';

const PotholeDetectionPage = () => {
  const { dispatch } = useContext(StateContext);
  const navigate = useNavigate();
  const [status, setStatus] = useState('비디오를 처리 중입니다...');
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progress, setProgress] = useState(0);
  // 영상 재생 관련 상태 제거
  // const [videoURL, setVideoURL] = useState('');
  // const [filename, setFilename] = useState(''); // 파일명 상태
  // const videoRef = useRef(null); // 비디오 요소 참조
  const isProcessingRef = useRef(false); // 중복 실행 방지용 ref
  // const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 제거

  useEffect(() => {
    if (!isProcessingRef.current) {
      isProcessingRef.current = true;
      // 페이지 로드 시 자동으로 비디오 처리 시작
      processVideo();
    }
  }, []);

  const processVideo = async () => {
    try {
      // 진행 바 표시
      setShowProgressBar(true);
      setProgress(0);

      setStatus('녹화 중입니다.');
      await speak('녹화 중입니다.');
      await updateProgressBar(33);

      setStatus('저장 중입니다.');
      await speak('저장 중입니다.');
      await updateProgressBar(66);

      setStatus('전송 중입니다.');
      await speak('전송 중입니다.');
      await updateProgressBar(99);

      setStatus('전송이 완료되었습니다.');
      await updateProgressBar(100);
      await speak('전송이 완료되었습니다.');

      // 진행 바 숨기기
      setShowProgressBar(false);

      // 상태 업데이트
      const currentTime = new Date();
      const formattedTime = formatDate(currentTime);
      const videoFilename = `${formattedTime}`;
      const videoUrl = '/Dashcam-Front.mp4'; // 비디오 파일이 public 폴더에 위치해야 함
      dispatch({
        type: 'ADD_VIDEO',
        payload: { filename: videoFilename, url: videoUrl }, // 객체로 저장
      });

      // "전송 현황으로 이동합니다." 메시지 출력 및 음성 안내
      setStatus('전송 현황으로 이동합니다.');
      await speak('전송 현황으로 이동합니다.');

      // 전송 현황 페이지로 즉시 이동
      navigate('/transferred-videos');
    } catch (error) {
      console.error('비디오 처리 중 에러 발생:', error);
      setStatus('비디오 처리 중 에러가 발생했습니다.');
      await speak('비디오 처리 중 에러가 발생했습니다.');
    }
  };

  const updateProgressBar = (targetProgress) => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= targetProgress) {
            clearInterval(interval);
            resolve();
            return prevProgress;
          }
          return prevProgress + 1;
        });
      }, 50); // 진행 속도 조절
    });
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

  const formatDate = (date) => {
    const year = date.getFullYear().toString().slice(-2); // 년도 뒤 두 자리
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월
    const day = String(date.getDate()).padStart(2, '0'); // 일
    return `${year}-${month}-${day}`; // YY-MM-DD 형식으로 변경
  };

  // 영상 재생 관련 함수 제거
  /*
  const openModal = async () => {
    setIsModalOpen(true);
    setStatus('녹화된 영상을 재생합니다.');
    await speak('녹화된 영상을 재생합니다.');
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  */

  return (
    <div className="container">
      <h1 className="header">포트홀 탐지</h1>
      {/* 상태 메시지를 절대 위치로 고정하여 레이아웃 흔들림 방지 */}
      <div className="status-message">
        <p>{status}</p>
      </div>

      {/* 진행 바 표시 */}
      {showProgressBar && <ProgressBar progress={progress} />}

      {/* 영상 재생 및 썸네일 표시 제거 */}
      {/* 
      {videoURL && !showProgressBar && (
        <div className="video-container">
          <div className="thumbnail-container">
            <img
              src="/thumbnail.png" // 썸네일 이미지 경로
              alt="비디오 썸네일"
              className="thumbnail-image"
              onClick={openModal}
            />
            <p
              className="filename-text"
              onClick={openModal}
            >
              {filename}
            </p>
          </div>

          {isModalOpen && (
            <div className="modal-overlay" onClick={closeModal}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={closeModal}>
                  &times;
                </button>
                <video
                  src={videoURL}
                  ref={videoRef}
                  onEnded={closeModal}
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
      )}
      */}

      {/* 파일 업로드 버튼 숨김 */}
      <input type="file" accept="video/*" style={{ display: 'none' }} />

      {/* 업로드 버튼 숨김 */}
      <button style={{ display: 'none' }}>비디오 업로드</button>
    </div>
  );
};

export default PotholeDetectionPage;
