# 📸 Pothole Detection Project

> 도로 품질 관리를 위한 포트홀 검출 AI 시스템

![image](https://github.com/user-attachments/assets/4b4d3b61-62e1-4bb7-b682-cb5c59faa411)

<br>

## 🔍 프로젝트 소개
**포트홀(Pothole)** : 도로 균열에 물기가 스며들어 도로가 부서지고 파이는 현상 <br><br>
포트홀로 인해 차량 손상, 연쇄 사고 유발 및 안전 위협이 발생할 수 있으며, 2021-24년 7월 포트홀 1만 9천건으로 매년 증가하고 있습니다.이에 따라, 본 프로젝트는 딥러닝 기반 **YOLOv8(Object Detection 모델)** 을 활용하여 실시간 포트홀 감지 시스템을 구축하는 것을 목표로 합니다.  
우리 팀은 도로 데이터의 다양성과 실제 환경의 특성을 고려한 데이터셋 설계부터 모델 개발, 성능 평가, 그리고 사용자 친화적인 서비스 구현까지 프로젝트 전반을 통합적으로 수행하였습니다.
이를 통해 도로 관리 시스템의 효율성을 극대화하고, 사회적 비용을 절감할 수 있는 혁신적인 기술 솔루션을 제안하고자 합니다.  

<br>

## 🎯 프로젝트 목표
◎ 실시간 포트홀 탐지<br>YOLOv8을 활용한 정확도 높은 Object Detection.<br><br>
◎ 데이터 기반 도로 관리<br>포트홀 위험도 분석 및 효율적인 도로 유지보수 계획 지원.<br><br>
◎ 사용자 참여 증대<br>음성 입력 및 리워드 제공을 통해 도로 안전에 대한 참여 유도.<br><br>

<br>

## 🔧 기술 스택
 - **Frontend**<br>
   <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
   <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
 - **Backend**<br>
   <img src="https://img.shields.io/badge/express-FF4747?style=for-the-badge&logo=express&logoColor=white">
   <img src="https://img.shields.io/badge/openAI API-412991?style=for-the-badge&logo=openai&logoColor=white">
 - **ML / DL**<br>
   <img src="https://img.shields.io/badge/YOLOv8-5C3EE8?style=for-the-badge&logo=YOLOv8&logoColor=white">
   <img src="https://img.shields.io/badge/Whisper-6332F6?style=for-the-badge&logo=Whisper&logoColor=white">
   <img src="https://img.shields.io/badge/GTTS-4285F4?style=for-the-badge&logo=google&logoColor=white">
 - **Cloud**<br>
   <img src="https://img.shields.io/badge/AWS Rekognition-FF9900?style=for-the-badge&logo=AWS Rekognition&logoColor=black">
 - **Data Processing** <br>
   <img src="https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white">
   <img src="https://img.shields.io/badge/numpy-013243?style=for-the-badge&logo=numpy&logoColor=white">

<br>

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
   <img src="![제목_없는_아트워크 (1)](https://github.com/user-attachments/assets/a5135ef2-86f4-4748-bd27-a1500240ced5)" width="100" height="100" style="border-radius: 50%;"><br> 
   <a href="https://github.com/soi222">@soi222</a> 
  </td> 
 </tr> 
</table>

<br>

## 
```
# Directory structure for Pothole Detection Project

SeSACMuchim-1/
├── directory.py
├── README.md
├── .git/
├── .vscode/
│   └── settings.json
├── DL/
│   ├── Dataset/
│   │   ├── Convert_to_txt.ipynb
│   │   ├── Data_Length.ipynb
│   │   ├── Data_Merge.ipynb
│   │   ├── Data_Merge_sh.ipynb
│   │   ├── match.py
│   │   ├── Merge_Busan_Dataset.ipynb
│   │   ├── random_road_info.py
│   │   ├── seoul_roads.py
│   │   ├── seoul_roads_reduced.py
│   │   ├── sorting.py
│   │   ├── sync_check.ipynb
│   │   ├── train_valid_split_8163.ipynb
│   │   ├── VITVEL_to_txt.ipynb
│   │   ├── Detection/
│   │   │   ├── Detection_a_image.py
│   │   │   ├── Detection_images_and_counting.py
│   │   │   ├── detection_used_yoloonnx_count.py
│   │   │   └── test_image_cut.py
│   │   └── images_processing/
│   │       ├── 1.Classification_category_id.py
│   │       ├── 2-2.folder_resize.py
│   │       ├── 2.convert_bbox_to_yolo.py
│   │       ├── 3.Detection_image.py
│   │       └── image_cut_minkii.py
│   ├── Preprocessor_United/
│   │   ├── A1_to_yolov5_conv.ipynb
│   │   ├── A2_XML_conv.ipynb
│   │   ├── A3_JSON_conv.ipynb
│   │   ├── A4_D40(JSON).ipynb
│   │   ├── ABC.ipynb
│   │   ├── B_class_div.ipynb
│   │   └── C_class_check.ipynb
│   ├── LLM/
│   │   ├── LLM_test2_241122.ipynb
│   │   ├── LLM_test3_241125.ipynb
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
│   │   │   ├── yolov5m_test/
│   │   │   ├── yolov5n_test/
│   │   │   ├── yolov5s_test/
│   │   │   └── yolov5_test_pt/
│   │   │       ├── yolov5l.pt
│   │   │       ├── yolov5m.pt
│   │   │       ├── yolov5n.pt
│   │   │       ├── yolov5s.pt
│   │   │       └── yolov8n.pt
│   │   └── yolov8/
│   │       ├── etc/
│   │       │   ├── yolov8l_pothole_8K.yaml
│   │       │   └── yolov8_pothole.yaml
│   │       ├── yolov8l_10K_hpt_ver/
│   │       │   ├── custom_args.yaml
│   │       │   ├── yolo8l_10K_hpt_ver.ipynb
│   │       │   ├── yolov8l_pothole_10K.yaml
│   │       │   └── results/
│   │       └── yolov8_test_pt/
│   │           ├── yolo11n.pt
│   │           ├── yolov8l.pt
│   │           ├── yolov8m.pt
│   │           ├── yolov8n.pt
│   │           └── yolov8s.pt
├── PrivacyMasking/
│   ├── CarPlateBlurring.py
│   ├── FaceBlurring.py
│   ├── CarPlate_test_img/
│   │   ├── car_plate_1.png
│   │   ├── car_plate_2.png
│   │   └── car_plate_3.png
│   └── Face_test_img/
│       └── face_test_img_1.png
├── STTTTS/
│   ├── connect_test.py
│   ├── google_gtts.py
│   ├── TTS.ipynb
│   └── use_wave.py
├── TEST/
│   ├── YOLOv5_test/
│   │   ├── yolov5l_8K.ipynb
│   │   ├── yolov5l_test.ipynb
│   │   ├── yolov5m_test.ipynb
│   │   ├── yolov5s_test.ipynb
│   │   ├── yolov5x_test.ipynb
│   │   └── plt/
│   │       ├── YOLOv5_mAP0.5.png
│   │       ├── YOLOv5_mAP0.95.png
│   │       ├── YOLOv5_precision.png
│   │       ├── YOLOv5_recall.png
│   │       └── [plt] YOLOv5_Confusion_mAP.ipynb
│   └── YOLOv8_test/
│       ├── yolo8l_test.ipynb
│       ├── yolo8n_test.ipynb
│       ├── yolo8s_test.ipynb
│       ├── yolo8xl_test.ipynb
│       ├── yolov8l_30K.ipynb
│       └── yolov8l_8K.ipynb
├── WEB/
│   ├── government_pothole_app/
│   │   ├── .gitignore
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── test2.py
│   │   ├── public/
│   │   │   ├── favicon.ico
│   │   │   ├── final_csv.csv
│   │   │   ├── index.html
│   │   │   ├── logo192.png
│   │   │   ├── logo512.png
│   │   │   ├── manifest.json
│   │   │   ├── robots.txt
│   │   │   ├── test_csv.csv
│   │   │   └── test_csv_jiwon.csv
│   │   ├── src/
│   │   │   ├── App copy.js
│   │   │   ├── App.css
│   │   │   ├── App.js
│   │   │   ├── components/
│   │   │   │   ├── ImageStep.js
│   │   │   │   └── VideoUploader.js
│   │   │   ├── index.css
│   │   │   ├── index.js
│   │   │   └── styles.css
│   └── pothole_app/
│       ├── .gitignore
│       ├── package-lock.json
│       ├── package.json
│       ├── README.md
│       ├── src/
│       │   ├── App.css
│       │   ├── App.js
│       │   ├── components/
│       │   │   └── ProgressBar.js
│       │   ├── pages/
│       │   │   ├── MainPage.js
│       │   │   ├── MyPage.js
│       │   │   ├── PointStatusPage.js
│       │   │   ├── PotholeDetectionPage.js
│       │   │   ├── RewardCheckPage.js
│       │   │   └── TransferredVideosPage.js
│       │   └── styles.css

```


## 🧠 모델 설명
✅ 선정 모델 : [YOLOv8 Large](https://docs.ultralytics.com/ko/models/yolov8/)
 - YOLOv8의 **End-to-End** 신경망은 이미지 전체를 한 번에 처리
 - 빠른 처리 속도와 높은 정확도 제공
 - 특히, **소형 객체 탐지**에 탁월한 성능 보임

<br>

## 🛠 서비스 구현   
|YOLOv8 기반<br>포트홀 감지| 프라이버시 보호 (1) <br>: 얼굴 블러링 | 프라이버시 보호 (2) <br>: 차량 번호판 블러링|
|:---:|:---:|:---:|
|감지 및 데이터 저장<br>![yolo8(1)](https://github.com/user-attachments/assets/efe70d2b-011e-4f75-b6ab-fd1f5ddd6767) <br> ![yolo8(2)](https://github.com/user-attachments/assets/2cb85b7c-a992-471e-b030-f0eb3ac9dd3d)|Deface, ORB-HD.<br>![blur](https://github.com/user-attachments/assets/729463b0-9bd8-4a8b-86c2-a5822e52667b)|Amazon Rekognition API<br>![차량](https://github.com/user-attachments/assets/b6726cd9-5afc-46dc-8f04-f38f1b39f724)|
|STT / TTS| UI & UX||
|**STT** (Whisper (OpenAI))<br>![whisper](https://github.com/user-attachments/assets/b675091d-b7e4-45db-b376-6dbb88bde092) <br><br> **TTS** (Google TTS)<br>![google_tts](https://github.com/user-attachments/assets/5ef3c566-9333-44d0-a8c5-656a139c1bd7)|React.js 기반 프론트엔드<br>Express.js 및 OpenAI API 활용 백엔드. <br><br> **사용자 화면** <br>![소비자](https://github.com/user-attachments/assets/d336f8ce-0ed2-44bc-ab38-329916981200) <br><br> **포트홀 탐지 및 전송** ![포트홀탐지전송](https://github.com/user-attachments/assets/0bd8696b-8e9f-4aaf-a2ce-07962215791c) <br><br> **마이페이지 화면** ![마이페이지](https://github.com/user-attachments/assets/00cef2ae-a6fc-488c-9240-2357dbf6ae64)|**관리자 화면** <br>![포트홀 검출 시연](https://github.com/user-attachments/assets/0b33c121-430e-4223-bd4c-a832c641b729) <br><br> **포트홀 탐지 통계 화면** ![대시보드(2)](https://github.com/user-attachments/assets/a427d32c-18c2-4d04-82ac-b0ee39803202) <br><br> **LLM 기반 챗봇 화면** <br> ![LLM기반](https://github.com/user-attachments/assets/0d74d8ff-a655-46ea-89ac-101ae7282263) |

| YOLOv8 설명 | 이미지 |
|:---|:---|
| **YOLOv8 기반 포트홀 감지**<br>감지 및 데이터 저장 | ![yolo8](https://github.com/user-attachments/assets/ae523bf9-e6c2-4f42-8b64-3335cbfd272f)|
| **프라이버시 보호 (1)**<br>얼굴 블러링 (Deface, ORB-HD) | ![얼굴 블러링](https://github.com/user-attachments/assets/729463b0-9bd8-4a8b-86c2-a5822e52667b) |
| **프라이버시 보호 (2)**<br>차량 번호판 블러링 (Amazon Rekognition API) | ![차량 번호판 블러링](https://github.com/user-attachments/assets/b6726cd9-5afc-46dc-8f04-f38f1b39f724) |
| **STT / TTS**<br>STT (Whisper (OpenAI)), TTS (Google TTS) | ![Whisper STT](https://github.com/user-attachments/assets/b675091d-b7e4-45db-b376-6dbb88bde092) <br> ![Google TTS](https://github.com/user-attachments/assets/5ef3c566-9333-44d0-a8c5-656a139c1bd7) |
| **UI & UX (사용자 화면)**<br>React.js 프론트엔드, Express.js 백엔드 | ![사용자 화면](https://github.com/user-attachments/assets/d336f8ce-0ed2-44bc-ab38-329916981200) <br> ![포트홀 탐지 및 전송](https://github.com/user-attachments/assets/0bd8696b-8e9f-4aaf-a2ce-07962215791c) <br> ![마이페이지 화면](https://github.com/user-attachments/assets/00cef2ae-a6fc-488c-9240-2357dbf6ae64) |
| **UI & UX (관리자 화면)**<br>포트홀 탐지 통계 및 LLM 기반 챗봇 | ![포트홀 검출 시연](https://github.com/user-attachments/assets/0b33c121-430e-4223-bd4c-a832c641b729) <br> ![포트홀 탐지 통계](https://github.com/user-attachments/assets/a427d32c-18c2-4d04-82ac-b0ee39803202) <br> ![LLM 기반 챗봇](https://github.com/user-attachments/assets/0d74d8ff-a655-46ea-89ac-101ae7282263) |


<br>

## 📈 결과
 - YOLOv8 Large 성능:
   - Precision: 98.8%
   - Recall: 91.8%
   - mAP50: 99.1%
   - FPS: 50
 - 모델 개선 후:
   - Precision, Recall 증가.
   - mAP50-95 개선.

<br>


## 👨‍💻 역할분배
|이름|역할|상세내용|Github|
|--|--|--|--|
|**박창현**|AI모델링|......|[Click!](https://github.com/Chang-Hyeon-Park)|
|**박민기**|AI모델링|......|[Click!](https://github.com/mean71)|
|**박형준**|AI모델링|......|[Click!](https://github.com/Seajune117)|
|**송지원**|AI모델링|......|[Click!](https://github.com/G1song)|
|**위서현**|AI모델링|......|[Click!](https://github.com/soi222)|
