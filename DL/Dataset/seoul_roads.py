import os
import json

# 파일 경로 설정
base_path = r"C:\Users\user\Desktop\road_list"

# 서울시 자치구 리스트를 수동으로 생성하지 않고 파일 이름에서 추출
result_dict = {"구": []}

# 디렉토리 내 파일 읽기
for file_name in os.listdir(base_path):
    if file_name.endswith(".txt"):
        # 파일명에서 숫자 제거 및 확장자 제외 (ex. '1 강남구.txt' -> '강남구')
        gu_name = file_name.split(" ", 1)[-1].replace(".txt", "").strip() 
        result_dict["구"].append(gu_name)

        # 파일 경로
        file_path = os.path.join(base_path, file_name)

        # 파일 읽기
        with open(file_path, "r", encoding="utf-8") as file:
            road_names = [line.strip() for line in file if line.strip()]
            result_dict[gu_name] = road_names

# JSON 파일로 저장
output_path = os.path.join(base_path, "seoul_roads.json")
with open(output_path, "w", encoding="utf-8") as json_file:
    json.dump(result_dict, json_file, ensure_ascii=False, indent=4)

print(f"JSON 파일이 저장되었습니다: {output_path}")
