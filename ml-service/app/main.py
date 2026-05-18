from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class TelemetryRequest(BaseModel):
    ip: str
    method: str
    path: str
    userAgent: str
    riskScore: int
    failedLoginCount: int = 0
    hasAuthHeader: bool = False
    contentLength: int = 0
    headerCount: int = 0
    flags: list[str] = []


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

    if "auth" in data.path:
        anomaly_score += 0.2

    if data.userAgent == "Unknown":
        anomaly_score += 0.3

    if data.failedLoginCount >= 3:
        anomaly_score += 0.5

    if data.contentLength > 10000:
        anomaly_score += 0.2

    if data.headerCount < 5:
        anomaly_score += 0.2

    if len(data.flags) > 0:
        anomaly_score += 0.2

    prediction = (
        "suspicious"
        if anomaly_score >= 0.7
        else "normal"
    )

    return {
        "anomalyScore": anomaly_score,
        "prediction": prediction
    }