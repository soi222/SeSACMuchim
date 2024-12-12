# 📸 Pothole Detection Project

### 도로 품질 관리를 위한 포트홀 검출 AI 시스템
<img src="https://github.com/user-attachments/assets/42b4685e-52db-4ead-b740-4e9e3ce48345" width="200" height="200">
<img src="https://github.com/user-attachments/assets/c041572f-06e2-411b-92e7-615e208485a3" width="200" height="200">
<br><br>

## 👨‍💻 팀원 구성
<table> 
 <tr> 
  <th>박창현</th>
  <th>박민기</th> 
  <th>박형준</th> 
  <th>송지원</th> 
  <th>위서현</th> 
 </tr> 
 <tr> 
  <td align="center"> 
   <img src="https://github.com/user-attachments/assets/55a3b48f-c5cb-41f3-9c08-6ae69a02c54c" width="100" height="100" style="border-radius: 50%;"><br> 
   <a href="https://github.com/Chang-Hyeon-Park">@Chang-Hyeon-Park</a> 
  </td> 
  <td align="center"> 
   <img src="https://github.com/user-attachments/assets/32926237-78f1-4146-8eb9-73c38b6ddfd2" width="100" height="100" style="border-radius: 50%;"><br> 
   <a href="https://github.com/mean71">@mean71</a> 
  </td> 
  <td align="center"> 
   <img src="https://github.com/user-attachments/assets/5f483fa6-a925-4de8-bf1a-19e8d2d8e3c4" width="100" height="100" style="border-radius: 50%;"><br> 
   <a href="https://github.com/Seajune117">@Seajune117</a> 
  </td> 
  <td align="center"> 
   <img src="https://via.placeholder.com/150" width="100" height="100" style="border-radius: 50%;"><br> 
   <a href="https://github.com/G1song">@G1song</a> 
  </td> 
  <td align="center"> 
   <img src="https://github.com/user-attachments/assets/a5135ef2-86f4-4748-bd27-a1500240ced5" width="100" height="100" style="border-radius: 50%;"><br> 
   <a href="https://github.com/soi222">@soi222</a> 
  </td> 
 </tr> 
</table>

<br>

## 🔍 프로젝트 소개
**포트홀(Pothole)** : 도로 균열에 물기가 스며들어 도로가 부서지고 파이는 현상 <br><br>
포트홀로 인해 차량 손상, 연쇄 사고 유발 및 안전 위협이 발생할 수 있으며, 2021-24년 7월 포트홀 1만 9천건으로 매년 증가하고 있습니다.이에 따라, 본 프로젝트는 딥러닝 기반 **YOLOv8(Object Detection 모델)** 을 활용하여 실시간 포트홀 감지 시스템을 구축하는 것을 목표로 합니다.  
우리 팀은 도로 데이터의 다양성과 실제 환경의 특성을 고려한 데이터셋 설계부터 모델 개발, 성능 평가, 그리고 사용자 친화적인 서비스 구현까지 프로젝트 전반을 통합적으로 수행하였습니다.
이를 통해 도로 관리 시스템의 효율성을 극대화하고, 사회적 비용을 절감할 수 있는 혁신적인 기술 솔루션을 제안하고자 합니다.  

<br>

## 🎯 프로젝트 목표
◎ **실시간 포트홀 탐지**<br>YOLOv8을 활용한 정확도 높은 Object Detection.<br><br>
◎ **데이터 기반 도로 관리**<br>포트홀 위험도 분석 및 효율적인 도로 유지보수 계획 지원.<br><br>
◎ **사용자 참여 증대**<br>음성 입력 및 리워드 제공을 통해 도로 안전에 대한 참여 증진.
<br><br>

## 🔧 기술 스택
**Frontend**<br>
   <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
   <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"><br><br>
**Backend**<br>
   <img src="https://img.shields.io/badge/express-FF4747?style=for-the-badge&logo=express&logoColor=white">
   <img src="https://img.shields.io/badge/openAI API-412991?style=for-the-badge&logo=openai&logoColor=white"><br><br>
**ML / DL**<br>
   <img src="https://img.shields.io/badge/YOLOv8-5C3EE8?style=for-the-badge&logo=YOLOv8&logoColor=white">
   <img src="https://img.shields.io/badge/Whisper-6332F6?style=for-the-badge&logo=Whisper&logoColor=white">
   <img src="https://img.shields.io/badge/GTTS-4285F4?style=for-the-badge&logo=google&logoColor=white"><br><br>
**Cloud**<br>
   <img src="https://img.shields.io/badge/AWS Rekognition-FF9900?style=for-the-badge&logo=AWS Rekognition&logoColor=black"><br><br>
**Data Processing** <br>
   <img src="https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white">
   <img src="https://img.shields.io/badge/numpy-013243?style=for-the-badge&logo=numpy&logoColor=white">

<br>


## 🧠 모델 설명
✅ 선정 모델 : [YOLOv8 Large](https://docs.ultralytics.com/ko/models/yolov8/)
 - YOLOv8의 **End-to-End** 신경망은 이미지 전체를 한 번에 처리
 - 빠른 처리 속도와 높은 정확도 제공
 - 특히, **소형 객체 탐지**에 탁월한 성능 보임

<br>

## 🛠 서비스 구현   
| 항목 | 설명 |
|:---:|:---:|
| **YOLOv8 기반 포트홀 감지**<br><br> 포트홀 감지 및 데이터 저장 | <img src="https://github.com/user-attachments/assets/ae523bf9-e6c2-4f42-8b64-3335cbfd272f" width="650" height="300">|
| **프라이버시 보호**<br><br>(1) 얼굴 블러링 (Deface, ORB-HD)<br>(2) 차량 번호판 블러링<br>(Amazon Rekognition API) | <img src="https://github.com/user-attachments/assets/5c952260-1d6e-4360-9b13-6fa6c6203c40" width="650" height="300">|
| **STT / TTS**<br><br>STT (Whisper (OpenAI))<br> TTS (Google TTS) | <figure class="half">  <a href="link"><img src="https://github.com/user-attachments/assets/b675091d-b7e4-45db-b376-6dbb88bde092"></a>  <a href="link"><img src="https://github.com/user-attachments/assets/5ef3c566-9333-44d0-a8c5-656a139c1bd7"></a></figure>|
| **UI & UX : 사용자 화면** <br><br>React.js 프론트엔드,<br> Express.js 백엔드 |<img src="https://github.com/user-attachments/assets/22edae6c-125e-41ac-9332-478677e39511" width="600" height="250"> <br> <img src="https://github.com/user-attachments/assets/71fa1f86-c667-49e9-8ab6-c6b11cc34016" width="600" height="250">|
| **UI & UX : 관리자 화면** <br><br>LLM 분석 및 포트홀 탐지 통계,<br> LLM 기반 챗봇 |<img src="https://github.com/user-attachments/assets/5093a98f-66b3-4e51-9555-39a16a49fae4" width="600" height="250"> <br> <img src="https://github.com/user-attachments/assets/e6932678-f3df-47f7-9ec0-720f983908f7" width="600" height="250">|

<br>

## 📈 결과
✅YOLOv8 Large 성능 결과
| Precision | Recall | mAP50 | FPS|
|:---:|:---:|:---:|:---:|
|98.8%|91.8%|99.1%|50|

 - 모델 개선 후:
   - Precision, Recall 증가.
   - mAP50-95 개선.

<br>

## 📂디렉토리 구조
```
# Directory structure for Pothole Detection Project

SeSACMuchim-1/
├── DL/
│   ├── Dataset/
│   │   ├── CSV/
│   │   ├── Detection/
│   │   ├── images_processing/
│   │   │   ├── Inspection/
│   │   │   │   ├── Convert_to_txt.ipynb
│   │   │   │   ├── Data_Length.ipynb
│   │   │   │   ├── sync_check.ipynb
│   │   │   │   └── train_valid_split_8163.ipynb
│   │   │   ├── Merge/
│   │   │   │   ├── Data_Merge.ipynb
│   │   │   └── Preprocessor_United/
│   ├── LLM/
│   │   ├── LLM_test_241122.ipynb
│   │   └── RAG_address.ipynb
│   ├── Models/
│   │   ├── yolov5/
│   │   │   ├── code/
│   │   │   │   ├── detect.py
│   │   │   │   ├── export.py
│   │   │   │   ├── train.py
│   │   │   │   └── val.py
│   │   │   ├── etc/
│   │   │   │   ├── pothole.yaml
│   │   │   │   ├── pothole_8K.yaml
│   │   │   │   └── requirements.txt
│   │   │   ├── yolov5l_test/
│   │   │   │   └── weights/
│   │   │   │       └── best.pt
│   │   │   ├── yolov5m_test/
│   │   │   ├── yolov5n_test/
│   │   │   ├── yolov5s_test/
│   │   │   └── yolov5_test_pt/
│   │   └── yolov8/
│   │       ├── etc/
│   │       ├── yolov8l_10K_hpt_ver/
│   │       │   ├── custom_args.yaml
│   │       │   ├── yolo8l_10K_hpt_ver.ipynb
│   │       │   ├── yolov8l_pothole_10K.yaml
│   │       │   └── results/
│   │       └── yolov8l_8K/
├── PrivacyMasking/
│   ├── CarPlateBlurring.py
│   └── FaceBlurring.py
├── STTTTS/
│   ├── STTTTS_Final.py
│   ├── test/
├── TEST/
│   ├── YOLOv5_test/
│   └── YOLOv8_test/
│       ├── yolov8l_10K.ipynb
│       └── yolov8l_8K.ipynb
└── WEB/
    ├── government_pothole_app/
    │   ├── public/
    │   │   ├── test_csv.csv
    │   ├── src/
    │   │   ├── App.css
    │   │   ├── App.js
    │   │   ├── components/
    │   │   │   ├── ImageStep.js
    │   │   │   └── VideoUploader.js
    │   │   ├── index.css
    │   │   ├── index.js
    │   │   └── styles.css
    └── pothole_app/
        └── src/
            ├── App.css
            ├── App.js
            ├── components/
            │   └── ProgressBar.js
            ├── pages/
            │   ├── MainPage.js
            │   ├── MyPage.js
            │   ├── PointStatusPage.js
            │   ├── PotholeDetectionPage.js
            │   ├── RewardCheckPage.js
            │   └── TransferredVideosPage.js
            └── styles.css
```
<br>

## 👨‍💻 역할분배
|이름|역할|상세내용|Github|
|--|--|--|--|
|**박창현**|AI모델링|......|[Click!](https://github.com/Chang-Hyeon-Park)|
|**박민기**|AI모델링|......|[Click!](https://github.com/mean71)|
|**박형준**|AI모델링|......|[Click!](https://github.com/Seajune117)|
|**송지원**|AI모델링|......|[Click!](https://github.com/G1song)|
|**위서현**|AI모델링|......|[Click!](https://github.com/soi222)|
