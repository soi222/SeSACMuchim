import cv2  # OpenCV 라이브러리 임포트
import asyncio  # 비동기 프로그래밍을 위한 asyncio 라이브러리 임포트
import requests  # HTTP 요청을 위한 requests 라이브러리 임포트
import time  # 시간 관련 기능을 위한 time 라이브러리 임포트

async def get_gps_coordinates():
    """
    현재 GPS 좌표를 비동기적으로 가져오는 함수.
    
    Returns:
        dict: {'latitude': 위도, 'longitude': 경도} 형식의 GPS 좌표.
    """
    try:
        response = requests.get("http://api.example.com/get_location")  # GPS API 호출
        if response.status_code == 200:
            return response.json()  # {'latitude': ..., 'longitude': ...} 형식으로 반환
        else:
            print(f"Failed to retrieve GPS coordinates: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"Error while fetching GPS coordinates: {e}")
    return {'latitude': 0.0, 'longitude': 0.0}  # 기본 좌표 반환


async def save_frame(frame, timestamp, location):
    """
    프레임을 비동기적으로 저장하는 함수.
    
    Args:
        frame (numpy.ndarray): 저장할 이미지 프레임.
        timestamp (float): 프레임이 저장된 시간.
        location (dict): {'latitude': 위도, 'longitude': 경도} 형식의 GPS 좌표.
    """
    # GPS 좌표와 프레임 시점을 포함한 파일 이름 생성
    latitude = location['latitude']
    longitude = location['longitude']
    filename = f"frame_{timestamp:.2f}_lat{latitude:.6f}_lon{longitude:.6f}.jpg"  # 파일 이름 설정
    cv2.imwrite(filename, frame)  # 프레임을 이미지 파일로 저장
    print(f"Saved: {filename} at {location}")  # 저장된 파일 이름과 위치 출력

async def process_video(video_source, speed_kmh, time_interval, num_images):
    """
    비디오 스트림을 처리하는 비동기 함수.
    
    Args:
        video_source (str): 비디오 파일 경로 또는 카메라 인덱스 (0은 기본 카메라).
        speed_kmh (float): 자동차 속도 (km/h).
        time_interval (float): 입력 시점 전후로 몇 초 동안 이미지를 추출할 것인지.
        num_images (int): 전후로 추출할 이미지 수.
    """
    cap = cv2.VideoCapture(video_source)  # 비디오 파일 또는 카메라에서 비디오 스트림을 받아오기 위해 VideoCapture 객체 생성
    if not cap.isOpened():
        print("Error: Could not open video source.")
        return

    fps = cap.get(cv2.CAP_PROP_FPS)  # 초당 프레임 수(FPS) 가져오기
    print(f"Video source opened. FPS: {fps}")

    frames = []  # 프레임을 저장할 리스트 초기화

    while True:
        ret, frame = cap.read()  # 비디오 스트림에서 프레임 읽기
        if not ret:  # 프레임을 제대로 읽지 못한 경우
            print("End of video stream or error reading frame.")
            break  # 루프 종료

        current_time = len(frames) / fps  # 현재 시간 (초) 계산
        frames.append(frame)  # 현재 프레임을 리스트에 추가

        # GPS 좌표를 비동기적으로 가져오기
        location = await get_gps_coordinates()  
        if location:  # GPS 좌표가 정상적으로 반환된 경우
            print(f"Current GPS Location: {location}")  # 현재 GPS 좌표 출력

        # 현재 프레임을 화면에 표시
        cv2.imshow('Video', frame)  

        # 사용자 입력 처리
        key = cv2.waitKey(1)  # 1ms 동안 키 입력 대기
        if key == ord('q'):  # 'q' 키를 누르면 종료
            print("Video stream terminated by user.")
            break  # 루프 종료
        elif key == ord('s'):  # 's' 키를 누르면 현재 프레임 저장
            await save_frame(frame, current_time, location)  # 프레임 저장

        # 특정 입력을 받기 위한 비동기 함수 호출
        if key == ord('i'):  # 'i' 키를 누르면 특정 입력을 받음
            await handle_input(frames, current_time, location, speed_kmh, time_interval, num_images)

    cap.release()  # 비디오 캡처 객체 해제
    cv2.destroyAllWindows()  # 모든 OpenCV 창 닫기

async def handle_input(frames, current_time, location, speed_kmh, time_interval, num_images):
    """
    특정 입력을 처리하고 전후 프레임과 GPS 좌표를 저장하는 함수.
    
    Args:
        frames (list): 저장된 프레임 리스트.
        current_time (float): 현재 시간 (초).
        location (dict): {'latitude': 위도, 'longitude': 경도} 형식의 GPS 좌표.
        speed_kmh (float): 자동차 속도 (km/h).
        time_interval (float): 입력 시점 전후로 몇 초 동안 이미지를 추출할 것인지.
        num_images (int): 전후로 추출할 이미지 수.
    """
    # 전후 프레임을 계산
    frame_interval = time_interval / num_images  # 각 이미지 간격 (초)
    for i in range(-num_images, num_images + 1):
        frame_index = int((current_time + i * frame_interval) * (len(frames) / (current_time + frame_interval)))
        if 0 <= frame_index < len(frames):
            await save_frame(frames[frame_index], frame_index * frame_interval, location)

def main(use_test_video=True):
    """
    메인 함수로, 비디오 스트림을 처리합니다.
    
    Args:
        use_test_video (bool): True일 경우 테스트 비디오 파일을 사용하고, False일 경우 웹캠을 사용합니다.
    """
    if use_test_video:
        video_file_path = 'Dashcam-Front.mp4'  # 테스트 비디오 파일 경로
        print("Using test video file: Dashcam-Front.mp4")
    else:
        video_file_path = 0  # 기본 카메라 사용
        print("Using webcam.")

    # 자동차 속도, 시간 간격, 추출할 이미지 수 설정
    speed_kmh = 60  # 예시 속도 (km/h)
    time_interval = 3  # 전후로 몇 초 동안 이미지를 추출할 것인지
    num_images = 3  # 전후로 추출할 이미지 수

    # 비동기 이벤트 루프 실행
    asyncio.run(process_video(video_file_path, speed_kmh, time_interval, num_images))  # process_video 함수를 비동기적으로 실행

if __name__ == "__main__":
    main(use_test_video=True)  # 테스트 비디오를 사용하려면 True로 설정
    
    
'''
1. 속도 및 이미지 추출 설정:
speed_kmh, time_interval, num_images 변수를 설정하여 자동차 속도, 전후로 몇 초 동안 이미지를 추출할 것인지, 그리고 전후로 추출할 이미지 수를 정의합니다.
2. 비디오 처리:
process_video 함수에서 비디오를 재생하면서 사용자의 입력을 처리합니다. 'i' 키를 누르면 handle_input 함수가 호출되어 전후 프레임과 GPS 좌표를 저장합니다.
3. 전후 프레임 저장:
handle_input 함수는 현재 시간과 속도를 기반으로 전후 프레임을 계산하고, 해당 프레임을 저장합니다. 이때, 각 프레임의 시간 간격을 계산하여 저장합니다.
4. 사용자 입력 처리:
'q' 키를 눌러 비디오를 종료하고, 's' 키를 눌러 현재 프레임을 저장하며, 'i' 키를 눌러 전후 프레임과 GPS 좌표를 저장합니다.
실행 방법
비디오가 재생되는 동안 'q' 키를 눌러 비디오를 종료하고, 's' 키를 눌러 현재 프레임을 저장할 수 있습니다.
'i' 키를 눌러 전후 프레임과 GPS 좌표를 저장할 수 있습니다.
이렇게 하면, 비디오 재생 중에 사용자 입력을 처리하고, 자동차 속도에 따라 전후 프레임을 잘라서 저장하는 기능을 구현할 수 있습니다.
'''