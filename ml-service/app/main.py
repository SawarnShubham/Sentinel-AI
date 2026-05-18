from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class TelemetryRequest(BaseModel):
    ip: str
    method: str
    path: str
    userAgent: str
    riskScore: int
    statusCode: int


@app.get("/")
def root():
    return {
        "message": "ML Service running"
    }


@app.post("/analyze")
def analyze_request(data: TelemetryRequest):
    anomaly_score = 0.0

    if data.riskScore >= 20:
        anomaly_score += 0.4

    if data.statusCode == 401:
        anomaly_score += 0.3

    if "auth" in data.path:
        anomaly_score += 0.2

    if data.userAgent == "Unknown":
        anomaly_score += 0.3

    prediction = (
        "suspicious"
        if anomaly_score >= 0.6
        else "normal"
    )

    return {
        "anomalyScore": anomaly_score,
        "prediction": prediction
    }
