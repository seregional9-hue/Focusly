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
};