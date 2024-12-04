// src/pages/MainPage.js
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import './styles_chat.css';

// 챗봇 컴포넌트 임포트
import ChatbotModal from '../components/ChatbotModal';

const MainPage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('포트홀을 발견하면 "포트홀!"이라고 외쳐주세요.');
  const [isListening, setIsListening] = useState(true);
  const [recognizedText, setRecognizedText] = useState('');
  const recognitionRef = useRef(null);
  const isRecognitionActiveRef = useRef(false);
  const intentionallyStoppedRef = useRef(false);

  // 챗봇 모달 상태 관리
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // 챗봇 열기/닫기 함수
  const openChatbot = () => {
    setIsChatbotOpen(true);
  };

  const closeChatbot = () => {
    setIsChatbotOpen(false);
  };

  useEffect(() => {
    startVoiceRecognition();

    return () => {
      stopVoiceRecognition();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startVoiceRecognition = () => {
    setIsListening(true);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('이 브라우저는 음성 인식을 지원하지 않습니다.');
      setIsListening(false);
      return;
    }

    if (recognitionRef.current) {
      // 이미 초기화됨
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      isRecognitionActiveRef.current = true;
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('음성 인식 결과:', transcript);
      setRecognizedText(transcript);

      setTimeout(() => {
        setRecognizedText('');
      }, 2000);

      if (transcript.includes('포트홀')) {
        intentionallyStoppedRef.current = true;
        recognition.stop();
        setIsListening(false);
        setStatus('포트홀을 감지하였습니다. 잠시 후 녹화를 시작합니다.');
        await speak('포트홀을 감지하였습니다. 잠시 후 녹화를 시작합니다.');
        navigate('/pothole-detection');
      } else {
        setStatus('다른 단어를 인식하였습니다. 다시 시도해주세요.');
        await speak('다른 단어를 인식하였습니다. 다시 시도해주세요.');
        // 음성 인식 재시작
        if (isListening) {
          recognition.start();
        }
      }
    };

    recognition.onerror = async (event) => {
      console.error('음성 인식 에러:', event.error);
      setStatus('음성 인식 에러 발생. 다시 시도하세요.');
      await speak('음성 인식 에러 발생. 다시 시도하세요.');
      // 음성 인식 재시작
      if (isListening) {
        recognition.start();
      }
    };

    recognition.onend = () => {
      isRecognitionActiveRef.current = false;
      if (isListening && !intentionallyStoppedRef.current) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopVoiceRecognition = () => {
    setIsListening(false);
    intentionallyStoppedRef.current = true;
    if (recognitionRef.current && isRecognitionActiveRef.current) {
      recognitionRef.current.stop();
    }
    recognitionRef.current = null;
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
    <div className="main-page">
      {/* 배경 비디오 */}
      <ReactPlayer
        url="/background-video.mp4" // public 폴더에 배경 비디오 파일 추가
        playing={true}
        loop={true}
        muted={true}
        width="100%"
        height="100%"
        className="background-video"
      />

      {/* 오버레이 콘텐츠 */}
      <div className="content-overlay">
        <h1 className="header">포트홀 보상 앱</h1>
        {/* 음성 인식 중일 때 REC 표시 */}
        {isListening && (
          <div className="rec-indicator">
            <span role="img" aria-label="녹음 중">
              🔴
            </span>{' '}
            음성 인식 중...
          </div>
        )}
        <p className="status-text">{status}</p>
        {/* 인식된 텍스트를 표시 */}
        {recognizedText && (
          <p className="recognized-text">
            <strong>인식된 음성:</strong> {recognizedText}
          </p>
        )}
        <div className="button-container">
          <button
            className="main-button"
            onClick={() => navigate('/pothole-detection')}
          >
            <div className="emoji-icon">🕳️</div>
            포트홀 탐지
          </button>
          <button className="main-button" onClick={() => navigate('/mypage')}>
            <div className="emoji-icon">📋</div>
            마이페이지
          </button>
          {/* 새로운 챗봇 열기 버튼 */}
          <button className="main-button" onClick={openChatbot}>
            <div className="emoji-icon">💬</div>
            챗봇 열기
          </button>
        </div>
      </div>

      {/* 챗봇 모달 */}
      {isChatbotOpen && <ChatbotModal onClose={closeChatbot} />}
    </div>
  );
};

export default MainPage;
