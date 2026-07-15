from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"mensaje": "Focusly backend funcionando 🚀"}

@app.get("/health")
def health_check():
    return {"status": "ok"}