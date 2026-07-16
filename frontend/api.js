export const API = {
    async getToken(room, user) {
        const res = await fetch('https://focusly-s8c6.onrender.com/api/token', { // ⚠️ CAMBIAR por tu URL real de Render
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ room, user })
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Error del servidor (${res.status}): ${errText}`);
        }

        const data = await res.json();
        if (!data.token) {
            throw new Error('El servidor no devolvió un token válido');
        }
        return data.token;
    }
};