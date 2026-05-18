import numpy as np
import pandas as pd

np.random.seed(42)

NORMAL_SAMPLES = 2000
ATTACK_SAMPLES = 500

normal_data = pd.DataFrame({
    "riskScore": np.random.randint(0, 15, NORMAL_SAMPLES),
    "failedLoginCount": np.random.randint(0, 2, NORMAL_SAMPLES),
    "contentLength": np.random.randint(100, 1200, NORMAL_SAMPLES),
    "headerCount": np.random.randint(8, 16, NORMAL_SAMPLES),
    "hasAuthHeader": np.random.randint(0, 2, NORMAL_SAMPLES),
    "isLocalIP": np.random.randint(0, 2, NORMAL_SAMPLES),
    "isPrivateIP": np.random.randint(0, 2, NORMAL_SAMPLES),
    "requestFrequency": np.random.randint(1, 10, NORMAL_SAMPLES),
    "isAuthEndpoint": np.random.randint(0, 2, NORMAL_SAMPLES),
    "isSensitiveEndpoint": np.random.randint(0, 2, NORMAL_SAMPLES),
})

attack_data = pd.DataFrame({
    "riskScore": np.random.randint(20, 80, ATTACK_SAMPLES),
    "failedLoginCount": np.random.randint(3, 15, ATTACK_SAMPLES),
    "contentLength": np.random.randint(1000, 50000, ATTACK_SAMPLES),
    "headerCount": np.random.randint(1, 6, ATTACK_SAMPLES),
    "hasAuthHeader": np.random.randint(0, 1, ATTACK_SAMPLES),
    "isLocalIP": np.random.randint(0, 1, ATTACK_SAMPLES),
    "isPrivateIP": np.random.randint(0, 1, ATTACK_SAMPLES),
    "requestFrequency": np.random.randint(20, 200, ATTACK_SAMPLES),
    "isAuthEndpoint": np.random.randint(0, 2, ATTACK_SAMPLES),
    "isSensitiveEndpoint": np.random.randint(1, 2, ATTACK_SAMPLES),
})

dataset = pd.concat([normal_data, attack_data])

dataset.to_csv(
    "training/telemetry_dataset.csv",
    index=False
)

print("Telemetry dataset generated successfully.")