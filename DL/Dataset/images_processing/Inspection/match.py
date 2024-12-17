import os
import json
import random

# 경로 설정
road_data_path = r"C:\Users\user\Desktop\project\LLM_data\seoul_roads_reduced.json"
image_folder_path = r"C:\Users\user\Desktop\project\LLM_data\merged_images\images"
json_output_path = r"C:\Users\user\Desktop\output_json"

# 도로명 데이터 로드
with open(road_data_path, "r", encoding="utf-8") as road_file:
    road_data = json.load(road_file)  # {"구": ["강남구", "강동구", ...], "강남구": ["테헤란로", "논현로", ...], ...}

# 이미지 파일 리스트 (8163개)
image_files = [f"pothole_{i}.jpg" for i in range(1, 8164)]

# JSON 저장 폴더 생성
os.makedirs(json_output_path, exist_ok=True)

# 랜덤 매칭 및 JSON 파일 생성
for image_file in image_files:
    # 랜덤 구 및 도로명 선택
    gu = random.choice(road_data["구"])  # "구" 키에서 랜덤 구 선택
    road = random.choice(road_data[gu])  # 선택된 구의 도로명 리스트에서 랜덤 도로명 선택

    # JSON 데이터 생성
    json_data = {
        "file_name": image_file,
        "class": 0,  # class 값은 고정
        "구": gu,
        "로": road
    }

    # JSON 파일 저장
    json_file_name = os.path.join(json_output_path, image_file.replace(".jpg", ".json"))
    with open(json_file_name, "w", encoding="utf-8") as json_file:
        json.dump(json_data, json_file, ensure_ascii=False, indent=4)

print(f"총 {len(image_files)}개의 JSON 파일이 {json_output_path}에 생성되었습니다.")
