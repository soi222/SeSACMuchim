# 📸 Pothole Detection Project

> 도로 품질 관리를 위한 포트홀 검출 AI 시스템

![image](https://github.com/user-attachments/assets/4b4d3b61-62e1-4bb7-b682-cb5c59faa411)



## 📂 프로젝트 소개
포트홀은 차량 손상 및 연쇄 사고를 유발하는 주요 원인 중 하나입니다. 본 프로젝트는 YOLOv8을 활용하여 실시간으로 포트홀을 감지하고, 데이터 기반으로 도로 관리 효율성을 증대시키는 AI 솔루션을 제공합니다.

## 📊 데이터셋 구축
✅ 데이터 수집
 - 총 데이터 : 10,488개의 이미지 및 라벨 데이터
 - 출처 : AI허브, Roboflow, Mendeley Data
 - 다양성 : 날씨, 지역, 시간대, 환경별로 수집된 데이터

✅ 데이터 전처리
 - 결측치 및 이상치 제거
 - 라벨 포맷 변환  XML, JSON -> YOLO 형식 (<class>, <x>, <y>, <width>, <height>)
 - 데이터 분할 : Train/Valid/Test = 7:2:1

## 🧠 모델 설명
✅ 모델 선택 이유
 - YOLOv8: 빠른 처리 속도와 높은 정확도 제공.
 - 평가지표: Precision, Recall, mAP50, mAP50-95.
 - 성능 비교: YOLOv5 대비 mAP50, FPS, Precision/Recall 모두 개선.
✅ 성능 개선 방법
 - 하이퍼파라미터 튜닝.
 - 데이터 증강 및 리샘플링.
 - 추가 데이터 학습.
✅ 최종 선정 모델
 - YOLOv8 Large: 작은 물체 검출 및 정확도 우수.

## 🛠 서비스 구현
✅ 주요 기능
 - 포트홀 감지: YOLOv8 기반 감지 및 데이터 저장.
 - 프라이버시 보호:
   - 얼굴 블러링: Deface, ORB-HD.
   - 차량 번호판 블러링: Amazon Rekognition API.
 - STT/TTS:
   - STT: Whisper (OpenAI).
   - TTS: Google TTS.
 - UI/UX:
   - React.js 기반 프론트엔드.
   - Express.js 및 OpenAI API 활용 백엔드.

## 📈 결과
 - YOLOv8 Large 성능:
   - Precision: 98.8%
   - Recall: 91.8%
   - mAP50: 99.1%
   - FPS: 50
 - 모델 개선 후:
   - Precision, Recall 증가.
   - mAP50-95 개선.

## 🔧 기술 스택
 - Frontend: React.js, Axios.
 - Backend: Express.js, OpenAI API.
 - ML/DL: YOLOv8, Whisper, GTTS.
 - Cloud: AWS Rekognition.


## 👨‍💻 팀원
|이름|역할|분석주제|분석결과|Github|
|--|--|--|--|--|
|**박창현**|분석|제작사 중심 영화 흥행 요인 분석|[PPT](./presentation/SeSAC_Movie_data_anlaysis_MJ.pdf)|[Click!](https://github.com/Chang-Hyeon-Park)|
|**박민기**|분석 및 모델링|영화 키워드와 영화 평점간의 상관관계 분석 <br> 평점 예측 모델 제작|[PPT](./presentation/SeSAC-MiniProject_yugyeongjo.pdf)|[Click!](https://github.com/mean71)|
|**박형준**|분석|제작사 중심 영화 흥행 요인 분석|[PPT](./presentation/Chang_Movies_Data_PPT.pdf)|[Click!](https://github.com/Seajune117)|
|**송지원**|분석|영화 산업의 시대별 변화와 트렌드 분석|[PPT](./presentation/SESAC%20MiniProject-DongWoo.pdf.pdf)|[Click!](https://github.com/G1song)|
|**위서현**|분석|영화 인기도에 영향을 미치는 요인 분석|[PPT](./presentation/SeSAC_Movie_data_anlaysis_soyoun.pdf.pdf)|[Click!](https://github.com/soi222)|
