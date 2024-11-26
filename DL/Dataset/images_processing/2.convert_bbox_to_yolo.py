import json
import os

# 입력 폴더와 출력 폴더 설정
input_folder = "C:/Users/user/Downloads/Sample/02.라벨링데이터/JSON"  # JSON 파일이 위치한 폴더 경로
output_folder = "C:/Users/user/Downloads/Sample/02.라벨링데이터/json_to_yolo" 

# YOLO 형식 변환 함수
def convert_bbox_to_yolo(bbox, image_width, image_height):
    x_min, y_min, x_max, y_max = bbox
    x_center = (x_min + x_max) / 2.0
    y_center = (y_min + y_max) / 2.0
    width = x_max - x_min
    height = y_max - y_min
    # 정규화
    x_center /= image_width
    y_center /= image_height
    width /= image_width
    height /= image_height
    return f"0 {x_center} {y_center} {width} {height}"

# 입력 폴더 내 모든 JSON 파일 처리
for file_name in os.listdir(input_folder):
    if file_name.endswith('.json'):  # JSON 파일만 처리
        input_file = os.path.join(input_folder, file_name)
        
        # JSON 파일 로드
        with open(input_file, 'r', encoding='utf-8-sig') as f:  # UTF-8 BOM 지원
            data = json.load(f)
        
        # YOLO 형식 데이터 저장 준비
        yolo_annotations = []
        
        for image_info in data['images']:
            image_id = image_info['id']
            image_width = image_info['width']
            image_height = image_info['height']
            
            # 해당 이미지의 category_id가 7인 bbox 변환
            for annotation in data['annotations']:
                if annotation['image_id'] == image_id and annotation['category_id'] == 7:
                    yolo_format = convert_bbox_to_yolo(annotation['bbox'], image_width, image_height)
                    yolo_annotations.append(yolo_format)
        
        # YOLO 형식 텍스트 파일 저장
        output_file_name = os.path.splitext(file_name)[0] + ".txt"
        output_file_path = os.path.join(output_folder, output_file_name)
        
        # 출력 폴더가 없으면 생성
        os.makedirs(output_folder, exist_ok=True)
        
        if yolo_annotations:
            with open(output_file_path, 'w') as f:
                f.write("\n".join(yolo_annotations))
            print(f"'{file_name}'의 YOLO 형식 데이터가 '{output_file_path}'에 저장되었습니다.")
        else:
            print(f"'{file_name}'에 category_id가 7인 데이터가 없습니다.")
