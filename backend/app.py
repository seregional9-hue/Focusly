from flask import Flask, request, jsonify
from flask_cors import CORS
from livekit import api
import os

app = Flask(__name__)
CORS(app)  # Permite peticiones desde tu frontend en Vercel

@app.route('/api/token', methods=['POST'])
def get_token():
    data = request.get_json(silent=True)
    if not data or 'room' not in data or 'user' not in data:
        return jsonify({"error": "Faltan 'room' o 'user' en la petición"}), 400

    room = data.get('room')
    user = data.get('user')

    try:
        token = api.AccessToken(os.environ['LK_API_KEY'], os.environ['LK_API_SECRET'])
        token.with_identity(user).with_grants(
            api.VideoGrants(room_join=True, room=room)
        )
        return jsonify({"token": token.to_jwt()})
    except KeyError:
        return jsonify({"error": "Faltan variables de entorno LK_API_KEY / LK_API_SECRET en Render"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/webhook', methods=['POST'])
def webhook():
    event = request.get_json(silent=True)
    print(f"Sesión finalizada: {event}")
    return "OK", 200


@app.route('/', methods=['GET'])
def health():
    # Para comprobar rápido si el backend está vivo, entra a tu URL de Render en el navegador
    return "Servidor activo", 200


if __name__ == '__main__':
    app.run(port=5000, debug=True)