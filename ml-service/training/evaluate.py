import pandas as pd
import joblib
from sklearn.metrics import classification_report, confusion_matrix

MODEL_PATH = "models/anomaly_model.pkl"

dataset = pd.read_csv(
    "training/processed_telemetry_dataset.csv"
)

X = dataset.drop(columns=["label"])
y_true = dataset["label"]

model = joblib.load(MODEL_PATH)

predictions = model.predict(X)

# convert Isolation Forest output
y_pred = [1 if pred == -1 else 0 for pred in predictions]

print("\n===== SENTINEL AI MODEL EVALUATION =====")
print(confusion_matrix(y_true, y_pred))
print()
print(classification_report(y_true, y_pred))
print("========================================")