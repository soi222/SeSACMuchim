import os
import json
import shutil

# 경로 설정
json_folder = "C:/Users/user/Desktop/ai_hub/data/labels"  # 원본 JSON 폴더 경로
image_folder = "C:/Users/user/Desktop/ai_hub/data/images"  # 이미지 폴더 경로

category_7_json_folder = "C:/Users/user/Desktop/ai_hub/data/labels/category_7_json_folder"  # category_id 7 JSON 이동 경로
category_7_image_folder = "C:/Users/user/Desktop/ai_hub/data/images/category_7_image_folder"

# 폴더 생성
os.makedirs(category_7_json_folder, exist_ok=True)
os.makedirs(category_7_image_folder, exist_ok=True)

# JSON 폴더 내 모든 JSON 파일 처리
for json_file in os.listdir(json_folder):
    if json_file.endswith(".json"):
        json_path = os.path.join(json_folder, json_file)
        
        # JSON 파일 읽기
        with open(json_path, "r", encoding="utf-8-sig") as file:
            data = json.load(file)


        # category_id 확인
        categories = {annotation["category_id"] for annotation in data["annotations"]}
        if 7 in categories:

            if 7 in categories:
                # JSON 파일 이동 (category_id 7)
                target_json_path = os.path.join(category_7_json_folder, json_file)
                shutil.move(json_path, target_json_path)
                print(f"Moved JSON to category_7: {json_path} -> {target_json_path}")

                # 관련 이미지 이동
                for image in data["images"]:
                    image_path = os.path.join(image_folder, image["file_name"])
                    if os.path.exists(image_path):
                        target_image_path = os.path.join(category_7_image_folder, image["file_name"])
                        shutil.move(image_path, target_image_path)
                        print(f"Moved image to category_7: {image_path} -> {target_image_path}")
                    else:
                        print(f"Image not found: {image_path}")

print("모든 작업이 완료되었습니다!")
