import joblib
import numpy as np
import ipaddress
import pandas as pd
from app.core.config import MODEL_PATH

SCALER_PATH = "models/scaler.pkl"

model = None
scaler = None


def load_model():
    global model

    if model is None:
        model = joblib.load(MODEL_PATH)

    return model


def load_scaler():
    global scaler

    if scaler is None:
        scaler = joblib.load(SCALER_PATH)

    return scaler


def is_local_ip(ip):
    return 1 if ip in ["127.0.0.1", "::1"] else 0


def is_private_ip(ip):
    try:
        return 1 if ipaddress.ip_address(ip).is_private else 0
    except:
        return 0


def extract_features(data):
    is_auth_endpoint = 1 if "auth" in data.path.lower() else 0
    is_sensitive_endpoint = 1 if len(data.flags) > 0 else 0

    return pd.DataFrame([{
        "riskScore": data.riskScore,
        "failedLoginCount": data.failedLoginCount,
        "contentLength": data.contentLength,
        "headerCount": data.headerCount,
        "hasAuthHeader": int(data.hasAuthHeader),
        "isLocalIP": is_local_ip(data.ip),
        "isPrivateIP": is_private_ip(data.ip),
        "requestFrequency": data.requestFrequency,
        "isAuthEndpoint": is_auth_endpoint,
        "isSensitiveEndpoint": is_sensitive_endpoint,
    }])

    return np.array(feature_vector)


def predict_anomaly(data):
    loaded_model = load_model()
    loaded_scaler = load_scaler()

    features = extract_features(data)

    scaled_array = loaded_scaler.transform(features)

    scaled_features = pd.DataFrame(
        scaled_array,
        columns=features.columns
    )

    prediction = loaded_model.predict(scaled_features)
    anomaly_score = loaded_model.decision_function(scaled_features)

    is_suspicious = prediction[0] == -1

    return {
        "anomalyScore": float(anomaly_score[0]),
        "prediction": "suspicious" if is_suspicious else "normal"
    }