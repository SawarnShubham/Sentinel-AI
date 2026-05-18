from fastapi import APIRouter
from app.schemas.telemetry import TelemetryRequest
from app.services.predictor import predict_anomaly

router = APIRouter()


@router.get("/")
def root():
    return {
        "message": "ML Service running"
    }


@router.post("/analyze")
def analyze_request(data: TelemetryRequest):
    return predict_anomaly(data)