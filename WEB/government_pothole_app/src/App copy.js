import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './styles.css';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const [fileName, setFileName] = useState('');
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedImageArray, setSelectedImageArray] = useState(null); // 선택된 이미지 배열 상태
  const [zoomLevel, setZoomLevel] = useState(1); // 확대/축소 레벨 상태 추가
  const [rewardProgress, setRewardProgress] = useState(0); // 리워드 프로그레스 상태

  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 }); // 이미지 위치
  const [isDragging, setIsDragging] = useState(false); // 드래그 상태
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 }); // 드래그 시작점

  const rewardPoints = 25; // 지급 포인트
  const userId = "pothole_user"; // 사용자 ID 고정

  const faceBlurImages = [
    "./example_images/face_blur_frame_0015.jpg",
    "./example_images/face_blur_frame_0015_anonymized.jpg",
    "./example_images/face_blur_frame_0031.jpg",
    "./example_images/face_blur_frame_0031_anonymized.jpg",
  ];

  const carBlurImages = [
    "./example_images/frame_0003.jpg",
    "./example_images/blurred_frame_0003.jpg",
    "./example_images/frame_0008.jpg",
    "./example_images/blurred_frame_0008.jpg",
  ];

  const potholeImages = [
    "./example_images/frame_0035_hpt.jpg",
    "./example_images/frame_0053_hpt.jpg",
    "./example_images/frame_0057_hpt.jpg",
    "./example_images/frame_0059_hpt.jpg",
  ];

  const STEPS = {
    ANONYMIZATION_START: 1,
    ANONYMIZATION_PROGRESS: 2,
    FACE_BLUR: 3,
    CAR_BLUR: 4,
    DETECTION_PROGRESS: 5,
    DETECTION_RESULT: 6,
    STEP_6_5: 7, // 선택 화면
    REWARD: 8,
    REWARD_PROGRESS: 9,
    REWARD_COMPLETE: 10,
    LLM_ANALYSIS: 11, // 새롭게 추가된 페이지
  };
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFileName(file.name);
      setUploadedFileUrl(fileUrl);
      setIsUploaded(true);
      setCurrentStep(1); // Step 1: 익명화 시작 버튼으로 이동
    }
  };

  const startAnonymization = () => {
    setProgress(0);
    setCurrentStep(2); // Step 2: 익명화 중...
  };

  const startPotholeDetection = () => {
    setProgress(0);
    setCurrentStep(5); // Step 5: 검출 중...

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 10; // 10%씩 증가
        clearInterval(interval); // 100%에 도달하면 반복 중지
        setCurrentStep(6); // Step 6: 포트홀 검출된 이미지로 이동
        return 100;
      });
    }, 500); // 500ms 간격으로 업데이트
  };

  useEffect(() => {
    if (currentStep === 2 || currentStep === 5) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) return prev + 10;
          clearInterval(interval);
          setCurrentStep(currentStep === 2 ? 3 : 6); // 다음 Step으로 이동
          return 100;
        });
      }, 500);
    }
  }, [currentStep]);

  const sendReward = () => {
    setRewardProgress(0);
    setCurrentStep(STEPS.REWARD_PROGRESS); // Step 8: 리워드 전송 중...

    const interval = setInterval(() => {
      setRewardProgress((prev) => {
        if (prev < 100) {
          return prev + 10;
        } else {
          clearInterval(interval);
          setCurrentStep(STEPS.REWARD_COMPLETE); // Step 9: 리워드 전송 완료로 이동
          return 100;
        }
      });
    }, 500);
  };

  const handleImageClick = (index, arrayName) => {
    setSelectedImageIndex(index);
    setSelectedImageArray(arrayName);
    setZoomLevel(1); // 확대/축소 초기화
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.2, 3)); // 최대 3배 확대
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.2, 1)); // 최소 1배 축소
  };

  const getImageArray = () => {
    if (selectedImageArray === "carBlurImages") return carBlurImages;
    if (selectedImageArray === "faceBlurImages") return faceBlurImages;
    if (selectedImageArray === "potholeImages") return potholeImages; // Step 6 이미지 추가
    return [];
  };

  const selectedImageArrayData = getImageArray();

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handlePrevImage = () => {
    setZoomLevel(1); // Zoom 초기화
    setDragPosition({ x: 0, y: 0 }); // 드래그 위치 초기화
    setSelectedImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : selectedImageArrayData.length - 1
    );
  };

  const handleNextImage = () => {
    setZoomLevel(1); // Zoom 초기화
    setDragPosition({ x: 0, y: 0 }); // 드래그 위치 초기화
    setSelectedImageIndex((prevIndex) =>
      prevIndex < selectedImageArrayData.length - 1 ? prevIndex + 1 : 0
    );
  };

  // 드래그 시작
  const handleDragStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - dragPosition.x,
      y: e.clientY - dragPosition.y,
    });

    // 전역 이벤트 리스너 추가
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);
  };

  // 드래그 이동
  const handleDragMove = (e) => {
    if (isDragging) {
      setDragPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  // 드래그 종료
  const handleDragEnd = () => {
    setIsDragging(false);
    // 전역 이벤트 리스너 제거
    window.removeEventListener('mousemove', handleDragMove);
    window.removeEventListener('mouseup', handleDragEnd);
  };

  const modalImageStyle = {
    transform: `translate(${dragPosition.x}px, ${dragPosition.y}px) scale(${zoomLevel})`,
    cursor: isDragging ? "grabbing" : "grab", // 드래그 중이면 손 모양
  };
  
  

  const steps = [
    {
      title: <div className="step-title">Step 1: 익명화 시작</div>, // 스타일 추가
      content: (
        <button className="main-button" onClick={startAnonymization}>
          익명화 시작
        </button>
      ),
    },
    {
      title: "Step 2: 익명화 중...",
      content: (
        <div className="progress-container">
          <p>익명화 처리 중입니다. 잠시만 기다려주세요...</p>
          <div className="progress-bar">
            <div
              className="progress-bar-inner"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      ),
    },
    {
      title: <div className="step-title">Step 3: Face Blurring</div>,
      content: (
        <div className="image-grid">
          {faceBlurImages.map((imageSrc, index) => (
            <div className="pothole-container" key={index}>
              <img
                src={imageSrc}
                alt={`Face Blur 이미지 ${index + 1}`}
                className="pothole-image"
                onClick={() => handleImageClick(index, "faceBlurImages")}
              />
              <div className="pothole-label">
                {index === 0 ? "<FaceBlur 전>" : "<FaceBlur 후>"}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: <div className="step-title">Step 4: 차량 번호판 Blur 처리</div>,
      content: (
        <div>
          <div className="image-grid">
            {carBlurImages.map((imageSrc, index) => (
              <div className="pothole-container" key={index}>
                <img
                  src={imageSrc}
                  alt={`<Car Blur 이미지 ${index + 1}>`}
                  className="pothole-image"
                  onClick={() => handleImageClick(index, "carBlurImages")}
                />
                <div className="pothole-label">
                  {index % 2 === 0 ? "<CarBlur 전>" : "<CarBlur 후>"}
                </div>
              </div>
            ))}
          </div>
          <button className="main-button" onClick={startPotholeDetection}>
            포트홀 검출하기
          </button>
        </div>
      ),
    },
    {
      title: "Step 5: 검출 중...",
      content: (
        <div className="progress-container">
          <p>포트홀을 검출하는 중입니다. 잠시만 기다려주세요...</p>
          <div className="progress-bar">
            <div
              className="progress-bar-inner"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      ),
    },
    {
      title: <div className="step-title">Step 6: 검출된 포트홀 수: 5개</div>,
      content: (
        <div className="image-grid">
          {potholeImages.map((imageSrc, index) => (
            <div className="pothole-container" key={index}>
              <img
                src={imageSrc}
                alt={`포트홀 이미지 ${index + 1}`}
                className="pothole-image"
                onClick={() => handleImageClick(index, "potholeImages")}
              />
              {/* 라벨 분리 처리 */}
              <div className="pothole-label">
                {index === potholeImages.length - 1 ? (
                  <>
                    <div>{`<Pothole${index + 1}>`}</div>
                    <div>{`<Pothole${index + 2}>`}</div>
                  </>
                ) : (
                  `<Pothole${index + 1}>`
                )}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: <div className="step-title">Step 6.5: 선택하세요</div>,
      content: (
        <div className="button-group">
          <button
            className="main-button"
            onClick={() => setCurrentStep(STEPS.REWARD)} // Step 7로 이동
          >
            사용자에게 Reward 보내기
          </button>
          <button
            className="main-button"
            onClick={() => setCurrentStep(STEPS.LLM_ANALYSIS)} // 새로운 Step 10으로 이동
          >
            LLM으로 분석하기
          </button>
        </div>
      ),
    },
    {
      title: <div className="step-title">Step 7: 사용자에게 Reward 보내기</div>,
      content: (
        <div>
          <div className="reward-box">
            <div className="reward-row">
              <div className="reward-label-box">사용자 아이디</div>
              <div className="reward-value-box"><strong>{userId}</strong></div>
            </div>
            <div className="reward-row">
              <div className="reward-label-box">검출된 포트홀 개수</div>
              <div className="reward-value-box"><strong>5개</strong></div>
            </div>
            <div className="reward-row">
              <div className="reward-label-box">지급 포인트</div>
              <div className="reward-value-box"><strong>{rewardPoints}pt</strong></div>
            </div>
          </div>
          <button className="main-button" onClick={sendReward}>
            {userId}님에게 reward 보내기
          </button>
        </div>
      ),
      navigationDisabled: true, // Step 7에서는 "다음" 버튼 비활성화
    },
    {
      title: "Step 8: 리워드 전송 중...",
      content: (
        <div className="progress-container">
          <p>{userId}님에게 reward 보내는 중입니다...</p>
          <div className="progress-bar">
            <div
              className="progress-bar-inner"
              style={{ width: `${rewardProgress}%` }}
            ></div>
          </div>
        </div>
      ),
    },
    {
      title: <div className="step-title">Step 9: 리워드 전송 완료</div>,
      content: (
        <div className="reward-completion">
          <p>
            <strong>{userId}</strong>님에게 <strong>{rewardPoints}pt</strong> 전송
            완료!
          </p>
        </div>
      ),
      navigationDisabled: true, // "다음" 버튼 비활성화
    },
    {
      title: <div className="step-title">Step 10: LLM 분석 결과</div>,
      content: (
        <div>
          <p>LLM을 사용하여 분석 결과를 생성 중입니다...</p>
          <p>분석이 완료되면 결과가 아래에 표시됩니다:</p>
          <div className="llm-analysis-results">
            <ul>
              <li>분석 결과 1: 포트홀 위치 데이터</li>
              <li>분석 결과 2: 위험성 평가</li>
              <li>분석 결과 3: 유지보수 추천</li>
            </ul>
          </div>
          <button
            className="main-button"
            onClick={() => setCurrentStep(STEPS.STEP_6_5)} // Step 6로 돌아가기
          >
            돌아가기
          </button>
        </div>
      ),
    },
  ];

  const goToPreviousStep = () => {
    if (currentStep > STEPS.ANONYMIZATION_START) setCurrentStep(currentStep - 1);
  };

  const goToNextStep = () => {
    if (currentStep < STEPS.LLM_ANALYSIS) setCurrentStep(currentStep + 1);
  };

  return (
    <div className="app-container">
      {currentStep === 0 && (
        <video autoPlay muted loop className="background-video">
          <source
            src="./example_videos/background_video.mp4"
            type="video/mp4"
          />
        </video>
      )}

      <h1 className="app-header">🚧 포트홀 검출 시연 🚧</h1>

      {currentStep === 0 && (
        <div className="uploader-container">
          <label htmlFor="file-upload" className="main-button">
            파일 업로드
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {fileName && <p className="file-name">업로드된 파일: {fileName}</p>}
        </div>
      )}

      {currentStep > 0 && (
        <div className="steps-container">
          <TransitionGroup>
            <CSSTransition key={currentStep} timeout={300} classNames="fade">
              <div>
                <h3>{steps[currentStep - 1].title}</h3>
                {steps[currentStep - 1].content}
              </div>
            </CSSTransition>
          </TransitionGroup>

          {/* Navigation Buttons */}
          {currentStep !== 1 && currentStep !== 2 && currentStep !== 5 && currentStep !== 6.5 && (
            <div className="navigation-buttons">
              <button
                className="main-button"
                onClick={goToPreviousStep}
                disabled={currentStep === 1}
              >
                이전
              </button>
              {/* 다음 버튼 조건 */}
              {!steps[currentStep - 1]?.navigationDisabled && (
                <button
                  className="main-button"
                  onClick={goToNextStep}
                  disabled={currentStep === 4 || currentStep === 6.5}
                  style={
                    currentStep === 4 || currentStep === 6.5
                      ? { backgroundColor: "#ccc", color: "#666", cursor: "not-allowed" }
                      : {}
                  }
                >
                  다음
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {selectedImageIndex !== null && (
        <div className="modal">
          <button
            className="arrow-button left"
            onClick={handlePrevImage}
          >
            ⬅
          </button>
          <img
            src={selectedImageArrayData[selectedImageIndex]}
            alt={`확대된 이미지 ${selectedImageIndex + 1}`}
            className="modal-image"
            style={modalImageStyle} // 확대/축소 반영
            onMouseDown={handleDragStart} // 드래그 시작
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
          />
          <button
            className="arrow-button right"
            onClick={handleNextImage}
          >
            ➡
          </button>
          <div className="zoom-buttons">
            <button className="zoom-button" onClick={handleZoomIn}>+</button>
            <button className="zoom-button" onClick={handleZoomOut}>-</button>
          </div>
          <button className="close-button" onClick={handleCloseModal}>
            ✖
          </button>
        </div>
      )}
    </div>
  );
}

export default App;