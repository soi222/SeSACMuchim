import pandas as pd

# 파일 불러오기
file_path = "C:/Users/user/Desktop/project/LLM_data/combined_output1.csv"
data = pd.read_csv(file_path)

# 숫자를 기준으로 정렬
# 숫자 추출 후 정렬을 위한 열 추가
data['sort_key'] = data['file_name'].str.extract(r'(\d+)').astype(int)

# sort_key를 기준으로 정렬
data = data.sort_values(by='sort_key').drop(columns='sort_key')

# 정렬된 데이터 확인
print(data.head())

# 정렬된 데이터 저장
sorted_file_path = "C:/Users/user/Desktop/project/LLM_data/sorted_combined_output1.csv"
data.to_csv(sorted_file_path, index=False)
