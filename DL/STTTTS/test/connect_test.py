import os
import whisper
import time

import pydub
from gtts import gTTS
"""
=======================
https://www.gyan.dev/ffmpeg/builds/

1. 위의 사이트 들어가서 > release bulids > 2번째줄 ffmpeg-release-essential.Zip 다운
2. 압축해제 후 bin폴더 경로 환경변수 추가
=======================
"""

def transcribe_with_whisper(file_path):
    # FFmpeg 경로를 환경 변수에 명시적으로 설정
    os.environ["PATH"] += os.pathsep + r"C:/Users/dnltj/ffmpeg-7.1-essentials_build/bin"

    model = whisper.load_model("base")  # Whisper 모델 로드
    result = model.transcribe(file_path, language="ko")
    return result["text"]  # STT 결과 반환

def main():
    while True:
        # Step 1: 첫 번째 음성 명령 확인
        print("첫 번째 음성을 입력하세요: (예: '포트홀')")
        command_result = transcribe_with_whisper("C:/Users/dnltj/OneDrive/바탕 화면/TTS_sesac/Pothole_2.m4a")
        print("사용자 발화:", command_result)

        if "포트홀" in command_result:
            print("서비스: 녹화를 시작하시겠습니까?")
            
            # Step 2: 두 번째 응답 확인x
            print("두 번째 음성을 입력하세요: (예: '시작하세요')")
            confirmation_result = transcribe_with_whisper("C:/Users/dnltj/OneDrive/바탕 화면/TTS_sesac/Pothole_2.m4a")
            print("사용자 응답:", confirmation_result)

            if "시작하세요" in confirmation_result or "그래" in confirmation_result:
                os.system("recode_start.mp3")
                print("녹화를 시작합니다...")
                time.sleep(5)

                os.system("recode_fin.mp3")
                print("녹화가 완료되었습니다.")
                time.sleep(2)
                
                print("<==================전송중==================>")
                time.sleep(4)
                os.system("send_fin.mp3")
                print("전송이 완료되었습니다.")
                break

            elif "아니" in confirmation_result:
                os.system("recode_cancel.mp3")
                print("녹화를 취소합니다.")
        
        elif "포트홀" not in command_result:
            os.system("retry_plz.mp3")
            time.sleep(3)
            print("명령어를 인식하지 못했습니다. 다시 시도하세요.")

if __name__ == "__main__":
    main()
    
