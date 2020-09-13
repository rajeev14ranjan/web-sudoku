function Camera() {
    this.SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;
    this.devices = [];
    this.stream = null;
    this.track = null;

    this.streamConstraints = {
        video: {
            deviceId: '',
            facingMode: ['environment'],
            height: { ideal: 1080 },
            width: { ideal: 1920 },
        },
    };



}

Camera.prototype.getDevices = async function () {
    if (this.SUPPORTS_MEDIA_DEVICES) {
        this.devices = await navigator.mediaDevices.enumerateDevices();
        this.devices = this.devices.filter((device) => device.kind === 'videoinput');

        return this.devices;
    }
}

Camera.prototype.startStream = async function (deviceId) {
    this.stopStream();

    this.streamConstraints.video.deviceId = deviceId;

    const stream = await navigator.mediaDevices.getUserMedia(this.streamConstraints);
    this.stream = stream;
    this.track = stream.getVideoTracks()[0];

    this.trackConstraints = {};
    return stream;
}

Camera.prototype.stopStream = function () {
    if (this.stream) {
        for (const track of this.stream.getVideoTracks()) {
            track.stop();
        }
    }
}


export default Camera;