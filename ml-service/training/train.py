import pandas as pd
import joblib
from sklearn.ensemble import IsolationForest

dataset = pd.read_csv(
    "training/processed_telemetry_dataset.csv"
)

#model for training dataset
model = IsolationForest(
    contamination=0.15,
    random_state=42,
    n_estimators=200
)

model.fit(dataset)

joblib.dump(
    model,
    "models/anomaly_model.pkl"
)

print("Anomaly detection model trained successfully.")