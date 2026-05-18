from pydantic import BaseModel


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
    requestFrequency: int = 1
    flags: list[str] = []

