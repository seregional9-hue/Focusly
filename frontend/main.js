import { FocusEngine } from './webrtc.js';
import { API } from './api.js';

const btn = document.getElementById('btnAction');
const errorDiv = document.getElementById('errorMsg');

btn.onclick = async () => {
    btn.disabled = true;
    errorDiv.textContent = '';

    try {
        // Generamos un usuario único cada vez, para evitar choques de identidad en LiveKit
        const userId = "user_" + Math.random().toString(36).substring(2, 10);

        const token = await API.getToken("focus_room_01", userId);
        const engine = new FocusEngine('wss://focusly-58gbx3or.livekit.cloud', token);
        await engine.startSession();
    } catch (err) {
        console.error(err);
        errorDiv.textContent = `Error: ${err.message}`;
        btn.disabled = false;
    }

    async function entrar() {
    const pin = document.getElementById('pinInput').value;
    const loader = document.getElementById('loadingScreen');
    loader.classList.remove('hidden'); // Mostrar pantalla carga

    // 1. Validar PIN contra tu servidor Render
    const res = await fetch('TU_URL_DE_RENDER/api/validar-pin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ pin: pin })
    });

    const data = await res.json();
    if (data.status === 'ok') {
        // 2. Si es OK, llamar a tu función de LiveKit que ya tenías hecha
        // Ejemplo: iniciarCamara(data.room, "Usuario_Kids");
    } else {
        loader.classList.add('hidden');
        alert("PIN incorrecto, ¡vuelve a intentarlo!");
    }
}
};

