import pandas as pd
import joblib
from sklearn.preprocessing import StandardScaler


def preprocess_dataset(input_path, output_path):
    df = pd.read_csv(input_path)

    df = df.drop_duplicates()
    df = df.fillna(0)

    features = [
        "riskScore",
        "failedLoginCount",
        "contentLength",
        "headerCount",
        "hasAuthHeader",
        "isLocalIP",
        "isPrivateIP",
        "requestFrequency",
        "isAuthEndpoint",
        "isSensitiveEndpoint",
    ]

    X = df[features]

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    processed_df = pd.DataFrame(
        X_scaled,
        columns=features
    )

    processed_df.to_csv(
        output_path,
        index=False
    )

    joblib.dump(
        scaler,
        "models/scaler.pkl"
    )

    print("Dataset preprocessing completed.")
    
if __name__ == "__main__":
    preprocess_dataset(
        "training/telemetry_dataset.csv",
        "training/processed_telemetry_dataset.csv"
    )