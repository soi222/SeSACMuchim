import os
import cv2
import numpy as np  # np.fromfile 사용을 위해 추가
import matplotlib.pyplot as plt
import natsort  # 정렬할 때 사용

# 원본 이미지와 라벨의 상대 경로 설정
images_dir = "C:/Users/user/Downloads/Sample/labeling_data_2/images"  # 원본 이미지가 있는 폴더
labels_dir = "C:/Users/user/Downloads/Sample/labeling_data_2/json_to_yolo"  # 라벨 파일이 있는 폴더
output_dir = "C:/Users/user/Downloads/Sample/labeling_data_2/images_check"  # 테두리가 그려진 이미지를 저장할 폴더
convert_dir = "C:/Users/user/Downloads/Sample/labeling_data_2/CONVERT"  # 스킵된 파일명을 저장할 폴더

# 출력 폴더가 없으면 생성
os.makedirs(output_dir, exist_ok=True)
os.makedirs(convert_dir, exist_ok=True)  # CONVERT 폴더 생성

# 스킵된 파일을 기록할 파일 경로 설정
skipped_file_path = os.path.join(convert_dir, "check_skipped.txt")

# 스킵된 파일명을 저장할 리스트 생성
skipped_files = []

# 이미지에 바운딩 박스를 그려 저장하는 함수
def check(pic, label, output_path):
    # 라벨 파일에서 데이터를 읽어옴
    try:
        dp = [line.strip() for line in open(label).readlines()]
    except Exception as e:
        print(f"라벨 파일을 읽을 수 없습니다: {label}, 오류: {e}")
        skipped_files.append(label)
        return

    # 원본 이미지를 읽어옴
    try:
        img_array = np.fromfile(pic, np.uint8)  # 경로를 넘파이 배열로 변환
        picture = cv2.imdecode(img_array, cv2.IMREAD_COLOR)  # 이미지를 디코딩하여 읽음
        if picture is None:
            raise ValueError("이미지를 읽을 수 없습니다.")
    except Exception as e:
        print(f"이미지를 읽을 수 없습니다: {pic}, 오류: {e}")
        skipped_files.append(pic)
        return

    height, width = picture.shape[:2]
    blue_color = (255, 0, 0)  # 테두리 색상 (파란색)
    skipped = False  # 스킵 여부를 저장하는 변수

    # 라벨 파일의 각 라인마다 사각형 테두리 그리기
    for i in dp:
        # 데이터가 5개가 아닐 경우 건너뜀
        data = i.split(' ')
        if len(data) != 5:
            print(f"잘못된 라벨 형식: {data} (파일: {label})")
            skipped = True  # 스킵된 파일로 표시
            continue

        # 5개의 값을 읽어오도록 보장
        try:
            c, x, y, w, h = data
            c, x, y, w, h = float(c), float(x), float(y), float(w), float(h)
        except ValueError as ve:
            print(f"잘못된 값: {data} (파일: {label}), 오류: {ve}")
            skipped = True
            continue

        # 시작점과 끝점 계산
        start = (int(x * width - 0.5 * w * width), int(y * height - 0.5 * h * height))
        end = (int(x * width + 0.5 * w * width), int(y * height + 0.5 * h * height))

        # 디버깅: 좌표 확인
        print(f"좌표 계산 - 시작: {start}, 끝: {end} (파일: {label})")

        # 사각형 테두리 그리기
        cv2.rectangle(picture, start, end, blue_color, 3)

    # 스킵된 파일이라면 파일명을 기록 리스트에 추가
    if skipped:
        print(f"스킵된 파일로 처리됨: {pic}")
        skipped_files.append(pic)
        return

    # 테두리가 그려진 이미지를 images_check 폴더에 저장
    try:
        _, encoded_img = cv2.imencode(output_path[-4:], picture)  # 확장자에 맞게 인코딩
        with open(output_path, 'wb') as f:
            f.write(encoded_img)
    except Exception as e:
        print(f"이미지 저장 실패: {output_path}, 오류: {e}")
        skipped_files.append(pic)

# 지원하는 이미지 파일 확장자
supported_extensions = ('.jpg', '.jpeg', '.png', '.bmp', '.gif')

# 이미지와 라벨 파일 리스트 생성
image_files = natsort.natsorted([os.path.join(images_dir, x) for x in os.listdir(images_dir) if x.lower().endswith(supported_extensions)])
label_files = natsort.natsorted([os.path.join(labels_dir, x) for x in os.listdir(labels_dir) if x.endswith('.txt')])

# 파일 개수 확인 및 출력
total_files = len(image_files)
print(f"총 이미지 파일 개수: {total_files}")

# check 함수를 사용하여 이미지와 라벨을 순차적으로 처리하여 출력
for img, lbl in zip(image_files, label_files):
    # 파일 이름에서 확장자를 제거하고 images_check 폴더에 저장할 파일 경로 설정
    filename = os.path.splitext(os.path.basename(img))[0]
    output_extension = os.path.splitext(img)[1]  # 원래 이미지의 확장자 가져오기
    output_path = os.path.join(output_dir, f"{filename}_boxed{output_extension}")
    
    print(f"현재 처리 중: 이미지: {img}, 라벨: {lbl}")
    # check 함수 호출하여 테두리가 그려진 이미지를 images_check 폴더에 저장
    check(img, lbl, output_path)

# 스킵된 파일이 있을 경우에만 check_skipped.txt에 저장
if skipped_files:
    with open(skipped_file_path, 'w') as f:
        for file in skipped_files:
            f.write(f"{file}\n")
    print(f"스킵된 파일명들은 {skipped_file_path}에 저장되었습니다.")

# 스킵된 파일 개수 출력
print(f"스킵된 파일 개수: {len(skipped_files)}")
print(f"{output_dir} 폴더에 바운딩 박스가 그려진 이미지들이 저장되었습니다.")
