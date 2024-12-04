// VideoUploader.js -> 영상 업로드 UI

import React, { useState } from 'react';

const VideoUploader = ({ onUpload }) => {
    const [videoFile, setVideoFile] = useState(null);

    const handleUpload = (event) => {
        const file = event.target.files[0];
        setVideoFile(file);
        onUpload(file); // 부모 컴포넌트로 파일 전달
    };

    return (
        <div>
            <h2>포트홀 영상 업로드</h2>
            <input type="file" accept="video/*" onChange={handleUpload} />
            {videoFile && <video src={URL.createObjectURL(videoFile)} controls width="500" />}
        </div>
    );
};

export default VideoUploader;
