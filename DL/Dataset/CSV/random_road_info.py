import os
import json
import pandas as pd

# JSON 파일들이 저장된 디렉토리 경로
input_dir = r"C:\Users\user\Desktop\project\LLM_data\output_json"
output_csv_path = r"C:\Users\user\Desktop\project\LLM_data\combined_output.csv"

# 결과를 저장할 리스트
data = []

# 디렉토리 내 모든 JSON 파일 읽기
for file_name in os.listdir(input_dir):
    if file_name.endswith(".json"):  # JSON 파일만 처리
        file_path = os.path.join(input_dir, file_name)
        with open(file_path, "r", encoding="utf-8") as json_file:
            file_data = json.load(json_file)
            # JSON 데이터에 file_name 추가
            file_data["file_name"] = file_name
            data.append(file_data)

# JSON 데이터를 DataFrame으로 변환
df = pd.DataFrame(data)

# DataFrame을 CSV 파일로 저장
df.to_csv(output_csv_path, index=False, encoding="utf-8-sig")

print(f"CSV 파일이 저장되었습니다: {output_csv_path}")
