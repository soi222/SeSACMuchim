"""
영상을 interval 단위로 캡쳐해 이미지파일로 변환합니다.
프레임 캡쳐 간격은 53번줄 interval로 조절가능합니다. 현재 0.5초
"""

import cv2
import os

def capture_frames(video_path, output_dir, interval=2):
    """
    동영상에서 일정 간격으로 프레임을 캡처하여 저장합니다.
    
    Args:
        video_path (str): 입력 동영상 파일 경로
        output_dir (str): 캡처 이미지를 저장할 디렉터리
        interval (int): 캡처 간격(초 단위)
    """
    # 저장 디렉터리 생성
    os.makedirs(output_dir, exist_ok=True)
    
    # 동영상 열기
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"동영상을 열 수 없습니다: {video_path}")
        return
    
    fps = int(cap.get(cv2.CAP_PROP_FPS))  # 동영상 FPS 가져오기
    frame_interval = fps * interval  # 간격(프레임 단위)

    frame_count = 0
    captured_count = 0

    while True:
        ret, frame = cap.read()
        if not ret:  # 동영상이 끝났다면 루프 종료
            break
        
        # 지정된 간격의 프레임 저장
        if frame_count % frame_interval == 0:
            filename = os.path.join(output_dir, f"frame_{captured_count:04d}.jpg")
            cv2.imwrite(filename, frame)
            print(f"저장 완료: {filename}")
            captured_count += 1
        
        frame_count += 1
    
    cap.release()
    print(f"{captured_count}개 이미지 캡처 완료.")

# 사용 예시
video_path = "Dashcam-Front.mp4"  # 동영상 경로
output_dir = "captured_frames"    # 이미지 저장 폴더
capture_frames(video_path, output_dir, interval=0.5)
