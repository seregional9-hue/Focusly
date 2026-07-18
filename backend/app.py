from flask import Flask, jsonify, request
from flask_cors import CORS
from livekit import api
import os

app = Flask(__name__)
CORS(app)

# Tu base de datos de salas (PIN : Nombre de la Sala)
SALAS_VALIDAS = {
    "1234": "sala_laboratorio",
    "5678": "sala_exploracion",
    "9999": "sala_sonido"
}

# 1. VALIDACIÓN DEL PIN
@app.route('/api/validar-pin', methods=['POST'])
def validar_pin():
    data = request.get_json()
    pin = data.get('pin')
    if pin in SALAS_VALIDAS:
        return jsonify({"status": "ok", "room": SALAS_VALIDAS[pin]})
    return jsonify({"status": "error", "message": "PIN incorrecto"}), 401

# 2. GENERACIÓN DEL TOKEN (Cuando el PIN ya fue validado)
@app.route('/api/token', methods=['POST'])
def get_token():
    data = request.get_json(silent=True)
    room = data.get('room')
    user = data.get('user')

    if not room or not user:
        return jsonify({"error": "Faltan datos"}), 400

    try:
        # Asegúrate de tener estas variables configuradas en Render
        token = api.AccessToken(os.environ['LK_API_KEY'], os.environ['LK_API_SECRET'])
        token.with_identity(user).with_grants(
            api.VideoGrants(room_join=True, room=room)
        )
        return jsonify({"token": token.to_jwt()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/', methods=['GET'])
def health():
    return "Servidor Focusly Activo", 200

if __name__ == '__main__':
    app.run(port=5000)