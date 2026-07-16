import { Room } from 'https://esm.sh/livekit-client';

export class FocusEngine {
    constructor(url, token) {
        this.room = new Room();
        this.url = url;
        this.token = token;
    }

    async startSession() {
        this.room.on('trackSubscribed', (track) => {
            const el = track.attach();
            document.getElementById('remoteVideoContainer').appendChild(el);
        });

        this.room.on('disconnected', () => {
            console.log('Sesión desconectada');
        });

        await this.room.connect(this.url, this.token);
        await this.room.localParticipant.enableCameraAndMicrophone();
    }
}