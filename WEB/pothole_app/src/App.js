// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StateProvider } from './StateContext';
import ReactPlayer from 'react-player';
import MainPage from './pages/MainPage';
import PotholeDetectionPage from './pages/PotholeDetectionPage';
import MyPage from './pages/MyPage';
import TransferredVideosPage from './pages/TransferredVideosPage';
import RewardCheckPage from './pages/RewardCheckPage';
import PointStatusPage from './pages/PointStatusPage';
import './styles.css';

function App() {
  return (
    <StateProvider>
      <Router>
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
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/pothole-detection" element={<PotholeDetectionPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/transferred-videos" element={<TransferredVideosPage />} />
            <Route path="/reward-check" element={<RewardCheckPage />} />
            <Route path="/point-status" element={<PointStatusPage />} />
          </Routes>
        </div>
      </Router>
    </StateProvider>
  );
}

export default App;
