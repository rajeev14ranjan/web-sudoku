import React, { useEffect } from 'react';
import Camera from './Camera';
import './Page.css';

function Page() {
  let camera = new Camera();

  useEffect(() => {
    let videoElement = document.getElementById('videoElement');

    async function fetchData() {
      videoElement.srcObject = await camera.startStream();
    }
    fetchData();

    return () => camera.stopStream();
  })




  return (
    <div>
      <video autoPlay={true} id="videoElement">
      </video>

      <div className="controls">
        <button >Click</button>
      </div>
    </div>
  );
}

export default Page;
