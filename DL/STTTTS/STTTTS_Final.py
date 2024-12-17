import os
import whisper
import time
from gtts import gTTS
import wave
import pyaudio  # 오디오 재생을 위해 사용

# Whisper 모델 로드
whisper_model = whisper.load_model("base")  # Whisper 모델 로드

# TTS 함수 (gTTS 사용)
def generate_tts(text, output_file="output.wav"):
    tts = gTTS(text, lang="ko")
    temp_mp3 = "temp.mp3"
    tts.save(temp_mp3)
    os.system(f"ffmpeg -i {temp_mp3} -ar 16000 -ac 1 {output_file} -y")  # MP3를 WAV로 변환
    os.remove(temp_mp3)  # 임시 MP3 파일 삭제

# WAV 오디오 재생 함수 (wave + pyaudio 사용)
def play_audio(file_name):
    print(f"재생 중: {file_name}")
    chunk = 1024
    wf = wave.open(file_name, 'rb')
    pa = pyaudio.PyAudio()

    # 오디오 스트림 설정
    stream = pa.open(format=pa.get_format_from_width(wf.getsampwidth()),
                     channels=wf.getnchannels(),
                     rate=wf.getframerate(),
                     output=True)

    # 오디오 재생
    data = wf.readframes(chunk)
    while data:
        stream.write(data)
        data = wf.readframes(chunk)

    # 스트림 종료
    stream.stop_stream()
    stream.close()
    pa.terminate()
    wf.close()

# STT 음성 인식 함수 (Whisper 사용)
def transcribe_with_whisper(file_path):
    result = whisper_model.transcribe(file_path, language="ko")
    return result["text"]

# 대화 흐름
def main():
    # Step 1: 첫 번째 녹음된 음성 파일 확인
    print("첫 번째 녹음된 파일을 처리 중입니다...")
    first_audio_file = "C:/Users/dnltj/OneDrive/바탕 화면/TTSSTT/sound/포트홀.wav"  # 첫 번째 파일 경로

    # Whisper로 음성 인식
    command_result = transcribe_with_whisper(first_audio_file)
    print("사용자 발화:", command_result)

    # 사용자가 말한 음성 재생
    play_audio(first_audio_file)

    # 여러 표현 중 하나라도 맞으면 통과
    if "포트홀" in command_result or "포트 홀" in command_result:
        print("TTS: 녹화를 시작하시겠습니까?")
        generate_tts("녹화를 시작하시겠습니까?", "녹화시작하실.wav")
        play_audio("녹화시작하실.wav")

        # Step 2: 두 번째 음성 입력 확인
        while True:
            print("두 번째 녹음된 파일을 처리 중입니다...")

            # 기존에 저장된 '시작하세요' 음성 파일 사용
            second_audio_file = "./sound/시작하세요.wav"

            # 저장된 음성을 재생
            play_audio(second_audio_file)  # 사용자가 녹음한 음성 재생

            # Whisper로 음성 인식
            confirmation_result = transcribe_with_whisper(second_audio_file)
            print("사용자 응답:", confirmation_result)

            # '시작하세요' 음성 확인
            if "그래" in confirmation_result or "시작하세요" in confirmation_result:
                print("TTS: 녹화를 시작합니다.")
                generate_tts("녹화를 시작합니다.", "./sound/녹화시작합니다.wav")
                play_audio("./sound/녹화시작합니다.wav")

                # 녹화 완료
                print("녹화중...")
                time.sleep(2)
                print("TTS: 녹화가 완료되었습니다.")
                generate_tts("녹화가 완료되었습니다.", "./sound/recording_complete.wav")
                play_audio("./sound/recording_complete.wav")

                # 전송 중
                print("TTS: 전송 중입니다.")
                generate_tts("전송 중입니다.", "./sound/sending.wav")
                play_audio("./sound/sending.wav")
                print("<==================전송중==================>")
                time.sleep(4)

                # 전송 완료
                print("TTS: 전송이 완료되었습니다.")
                generate_tts("전송이 완료되었습니다.", "./sound/sending_complete.wav")
                play_audio("./sound/sending_complete.wav")

                return  # 프로그램 종료
            else:
                print("TTS: 잘못된 응답입니다. 다시 시도하세요.")
                generate_tts("잘못된 응답입니다. 다시 시도하세요.", "./sound/retry.wav")
                play_audio("./sound/retry.wav")

if __name__ == "__main__":
    main()
