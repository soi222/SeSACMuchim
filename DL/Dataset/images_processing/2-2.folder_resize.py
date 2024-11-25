from PIL import Image
import os

# 원본 이미지 폴더와 압축 이미지 저장 폴더 설정
input_folder = "./images_C7"
output_folder = "./images_C7_resize"

# 출력 폴더 생성
os.makedirs(output_folder, exist_ok=True)

def compress_image_to_jpg(input_path, output_path, quality=85):
    """이미지 압축 및 JPG 형식 변환 함수"""
    with Image.open(input_path) as img:
        # JPG로 저장
        output_path = os.path.splitext(output_path)[0] + ".jpg"  # 확장자 변경
        rgb_img = img.convert("RGB")  # PNG 투명도를 JPG로 변환하기 위해 RGB로 변경
        rgb_img.save(output_path, "JPEG", optimize=True, quality=quality)

# 폴더 내 모든 이미지 압축 및 형식 변환
for filename in os.listdir(input_folder):
    if filename.lower().endswith(('jpg', 'jpeg', 'png')):
        input_path = os.path.join(input_folder, filename)
        output_path = os.path.join(output_folder, filename)
        compress_image_to_jpg(input_path, output_path)
        print(f"압축 완료 및 JPG 변환: {filename}")

print("모든 이미지 압축 및 형식 변환 완료!")
