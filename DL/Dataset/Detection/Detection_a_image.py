"""
yolo8l_8k에 대한 best.onnx

이미지 한 장에 대한 디텍팅과 결과값을 확인할 수 있습니다.
"""


from ultralytics import YOLO
import cv2

# Load the exported ONNX model
onnx_model = YOLO("best.onnx")

im2 = cv2.imread("C:/Users/dnltj/OneDrive/바탕 화면/Dectection/test_image.jpg")
results = onnx_model.predict(source=im2, save=True, save_txt=True)  # save predictions as labels

for result in results:
    boxes = result.boxes  # Boxes object for bbox outputs
    masks = result.masks  # Masks object for segmentation masks outputs
    probs = result.probs  # Class probabilities for classification outputs