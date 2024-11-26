"""
yolo8l_8k에 대한 best.onnx

폴더(captured_frames)에 들어있는 여러 이미지 대한 디텍팅과 결과값을 확인할 수 있습니다.
폴더 내에 디텍팅의 갯수가 txt파일로 저장됩니다.
"""

from ultralytics import YOLO
import cv2
import os

# Load the exported ONNX model
onnx_model = YOLO("best.onnx")

# 폴더 경로 설정
folder_path = "C:/Users/dnltj/OneDrive/바탕 화면/Dectection/captured_frames_3"
output_folder = "C:/Users/dnltj/OneDrive/바탕 화면/Dectection/runs/detect/predict3_total"
output_text_file = "C:/Users/dnltj/OneDrive/바탕 화면/Dectection/runs/detect/predict3_total/total_object_count.txt"  # 결과를 저장할 텍스트 파일 경로

# 출력 폴더가 없으면 생성
os.makedirs(output_folder, exist_ok=True)

# 전체 디텍팅된 객체 수 초기화
total_object_count = 0

# 폴더 내 이미지 파일 처리
for file_name in os.listdir(folder_path):
    if file_name.endswith((".jpg", ".png", ".jpeg")):  # 이미지 확장자 필터링
        # 이미지 경로 생성
        image_path = os.path.join(folder_path, file_name)
        
        # 이미지 읽기
        im2 = cv2.imread(image_path)
        
        if im2 is None:
            print(f"이미지를 불러올 수 없습니다: {image_path}")
            continue
        
        # 예측 수행
        results = onnx_model.predict(source=im2, save=False)  # save=False로 자동 저장 방지
        
        # 현재 이미지의 객체 수
        object_count = sum(len(result.boxes) for result in results)
        total_object_count += object_count  # 총 객체 수에 추가
        
        # 예측 결과 이미지를 저장
        for i, result in enumerate(results):
            # 예측된 이미지를 시각화
            plotted_image = result.plot()  # 시각화된 이미지를 얻음
            
            # 저장 파일 경로 생성
            output_image_path = os.path.join(
                output_folder, f"{os.path.splitext(file_name)[0]}_predicted.jpg"
            )
            
            # 결과 이미지 저장
            cv2.imwrite(output_image_path, plotted_image)
            
        print(f"{file_name}: {object_count} objects detected.")

# 최종 결과 출력
print(f"Total objects detected across all images: {total_object_count}")

# 결과를 텍스트 파일로 저장
with open(output_text_file, "w") as file:
    file.write(f"Total objects detected across all images: {total_object_count}\n")

print(f"Total object count saved to: {output_text_file}")
