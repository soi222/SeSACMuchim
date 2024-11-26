# pip install boto3
import cv2
import numpy as np
import os
from pathlib import Path
import boto3

# AWS Rekognition API 클라이언트 설정
# 환경 변수에서 키를 가져오기
aws_access_key_id = ''#os.getenv('') # IAM 엑세스 키
aws_secret_access_key = ''# os.getenv() # IAM 비밀 키
region_name = 'ap-northeast-2'  # 사용할 AWS 리전 (예: 'us-west-2', 'us-east-1' 등)

client = boto3.client('rekognition',
                      aws_access_key_id=aws_access_key_id,
                      aws_secret_access_key=aws_secret_access_key,
                      region_name=region_name)

def detect_text(image_path):
    with open(image_path, "rb") as image_file:
        image_bytes = image_file.read()

    # 텍스트 감지 요청
    response = client.detect_text(Image={'Bytes': image_bytes})
    return response['TextDetections']

def blur_text_area(img, text_detections):
    for text in text_detections:
        if text['Type'] == 'LINE':  # LINE 타입의 텍스트만 처리
            box = text['Geometry']['BoundingBox']
            height, width, _ = img.shape
            
            # BoundingBox 좌표 계산
            x1 = int(box['Left'] * width)
            y1 = int(box['Top'] * height)
            x2 = int((box['Left'] + box['Width']) * width)
            y2 = int((box['Top'] + box['Height']) * height)

            # 블러 처리
            crop_img = img[y1:y2, x1:x2]
            blur_img = cv2.GaussianBlur(crop_img, (35, 35), 0)
            img[y1:y2, x1:x2] = blur_img

    return img

def process_images_in_directory(directory_path):
    for filename in os.listdir(directory_path):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):  # 이미지 파일 형식 확인
            image_path = Path(directory_path) / filename
            print(f"Processing {image_path}...")

            # 이미지 로드
            img = cv2.imread(str(image_path))
            if img is None:
                print(f"Failed to read image: {image_path}")
                continue

            # 텍스트 감지
            text_detections = detect_text(str(image_path))

            # 블러 처리
            img_blurred = blur_text_area(img, text_detections)

            # 결과 이미지 저장
            output_path = Path(directory_path) / f'blurred_{filename}'
            cv2.imwrite(str(output_path), img_blurred)
            print(f"Saved blurred image to {output_path}")

def main(): 
    # 이미지가 있는 폴더 경로 설정
    directory_path = Path(r".")  # 경로 설정
    process_images_in_directory(directory_path)

if __name__ == "__main__":
    main()