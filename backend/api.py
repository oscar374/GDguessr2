from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random
import requests
import cv2
import yt_dlp as youtube_dl
import base64

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_random_frame_from_video(url, skip_frames=300):
    cap = cv2.VideoCapture(url)
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    if frame_count == 0:
        cap.release()
        return None
    random_frame_number = random.randint(0, frame_count // skip_frames) * skip_frames
    cap.set(cv2.CAP_PROP_POS_FRAMES, random_frame_number)
    ret, frame = cap.read()
    cap.release()
    if not ret:
        return None
    _, buffer = cv2.imencode(".jpg", frame)
    return base64.b64encode(buffer).decode("utf-8")

@app.get("/question/{min}/{max}")
async def get_question(min: int, max: int):
    placement = random.randint(min, max)
    pointerCrateResponse = requests.get("https://pointercrate.com/api/v2/demons/listed")
    pointerCrateJSON = pointerCrateResponse.json()
    level = next((item for item in pointerCrateJSON if item["position"] == placement), None)
    levelName = level["name"] if level else "[ERROR] Level not found"
    allLevels = [item["name"] for item in pointerCrateJSON]
    youtubeLink = level["video"] if level and "video" in level else None
    frameURL = None

    if youtubeLink:
        try:
            ydl_opts = {}
            with youtube_dl.YoutubeDL(ydl_opts) as ydl:
                info_dict = ydl.extract_info(youtubeLink, download=False)
            formats = info_dict.get('formats', [])
            video_url = None
            for f in formats:
                if f.get('format_note') == '360p':
                    video_url = f.get('url')
                    break
            if video_url:
                encoded_frame = get_random_frame_from_video(video_url, skip_frames=300)
                if encoded_frame:
                    frameURL = f"data:image/jpeg;base64,{encoded_frame}"
        except Exception:
            frameURL = None

    return {
        "placement": placement,
        "levelName": levelName,
        "youtubeLink": youtubeLink,
        "frameURL": frameURL,
        "allLevels": allLevels
    }