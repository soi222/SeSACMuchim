import json
import math

# 파일 경로
input_path = r"C:\Users\user\Desktop\road_list\seoul_roads.json"
output_path = r"C:\Users\user\Desktop\road_list\seoul_roads_reduced.json"

# 목표 도로명 총 개수
target_total_roads = 5000

# JSON 데이터 로드
with open(input_path, "r", encoding="utf-8") as file:
    data = json.load(file)

# 자치구 리스트
gu_list = data["구"]

# 현재 총 도로명 수와 각 구별 도로명 리스트 길이
road_counts = {gu: len(data[gu]) for gu in gu_list}
current_total_roads = sum(road_counts.values())

# 각 구별 반복 배분 계산
scale_factor = target_total_roads / current_total_roads

balanced_data = {"구": gu_list}

for gu in gu_list:
    original_roads = data[gu]
    # 반복적으로 도로명을 추가하여 목표 길이 계산
    target_length = math.ceil(len(original_roads) * scale_factor)
    balanced_roads = original_roads * (target_length // len(original_roads)) + original_roads[: (target_length % len(original_roads))]
    balanced_data[gu] = balanced_roads

# JSON 파일로 저장
with open(output_path, "w", encoding="utf-8") as file:
    json.dump(balanced_data, file, ensure_ascii=False, indent=4)

print(f"도로명 데이터를 {target_total_roads}개로 조정했습니다. 저장 위치: {output_path}")
