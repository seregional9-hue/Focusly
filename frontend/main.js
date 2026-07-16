import { FocusEngine } from './webrtc.js';
import { API } from './api.js';

const btn = document.getElementById('btnAction');
const errorDiv = document.getElementById('errorMsg');

btn.onclick = async () => {
    btn.disabled = true;
    errorDiv.textContent = '';

    try {
        const token = await API.getToken("focus_room_01", "user_abc");
        const engine = new FocusEngine('wss://focusly-58gbx3or.livekit.cloud', token); // ⚠️ CAMBIAR por tu URL real de LiveKit
        await engine.startSession();
    } catch (err) {
        console.error(err);
        errorDiv.textContent = `Error: ${err.message}`;
        btn.disabled = false;
    }
};