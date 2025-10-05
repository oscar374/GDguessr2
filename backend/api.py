from fastapi import FastAPI 
import random
import requests

app = FastAPI() 

@app.get("/question/{min}/{max}")
async def get_question(min: int, max: int):
    placement = random.randint(min, max)
    pointerCrateResponse = requests.get(f"https://pointercrate.com/api/v2/demons/listed")
    pointerCrateJSON = pointerCrateResponse.json();
    levelName = next((item["name"] for item in pointerCrateJSON if item["position"] == placement), None)
    
    return {"placement": placement, "levelName": levelName}
    