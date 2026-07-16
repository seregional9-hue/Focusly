import { Room } from 'https://esm.sh/livekit-client';

export class FocusEngine {
    constructor(url, token) {
        this.room = new Room();
        this.url = url;
        this.token = token;
    }

    async startSession() {
        // Mostrar videos de otros participantes (remotos)
        this.room.on('trackSubscribed', (track) => {
            const el = track.attach();
            document.getElementById('remoteVideoContainer').appendChild(el);
        });

        await this.room.connect(this.url, this.token);
        await this.room.localParticipant.enableCameraAndMicrophone();

        // Mostrar TU PROPIA cámara (local)
        this.room.localParticipant.videoTrackPublications.forEach((publication) => {
            if (publication.track) {
                const el = publication.track.attach();
                document.getElementById('remoteVideoContainer').appendChild(el);
            }
        });
    }
}