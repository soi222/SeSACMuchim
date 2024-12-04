// ImageStep.js : 각 단계의 이미지와 설명 표시
import React from 'react';

const ImageStep = ({ step, description, imageSrc }) => {
    return (
        <div style={{ marginBottom: "20px" }}>
            <h3>Step {step}: {description}</h3>
            <img src={imageSrc} alt={`Step ${step}`} width="500" />
        </div>
    );
};

export default ImageStep;
