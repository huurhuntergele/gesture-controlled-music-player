import { useEffect, useRef } from 'react';
import './index.css';

export default function VideoCanvas() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let animationFrameId;
    let streamRef = null;

    function renderLoop(){
      if(video && !video.paused && !video.ended){
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    }
     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => {
          streamRef = stream; 
          video.srcObject = stream; 
          
          renderLoop(); 
        })
        .catch((error) => {
          console.error("Webcam access error:", error);
        });
    }
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (streamRef) {
        streamRef.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <>
      <div style={{
        color: '#ffffff',
        textAlign: 'center',
        fontFamily: "'Press Start 2P', cursive",
        fontSize: '22px',
        fontWeight: 'bold',
        padding: '30px',
      }}>
        🎶Gesture Controlled Music Player🎶
      </div>

     
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        
        <video ref={videoRef} autoPlay muted playsInline style={{ display: 'none' }} />
        
        <div style={{
          padding: '10px',
          backgroundColor: '#4f41ba',        
          border: '10px outset #d311a9',      
          borderRadius: '24px',              
          boxShadow: '0 8px 24px rgba(211, 17, 169, 0.2)', 
        }}>
        
          <canvas 
            ref={canvasRef} 
            width={640} 
            height={480} 
            style={{ 
              display: 'block',
              borderRadius: '12px',          
              transform: 'scaleX(-1)',      
            }} 
          />

        </div>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
      }}>
        <div style={{ textAlign: 'center'}}> 
          <button style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: '16px',
            width: '150px', 
            height: '50px',
            margin: '0 50px',
            borderRadius: '12px',
          }}>Previous</button>
        </div>
        <div style={{ textAlign: 'center'}}> 
          <button style={{ 
            fontFamily: "'Press Start 2P', cursive",
            fontSize: '16px',
            width: '150px',
            height: '50px',
            margin: '0 50px',
            borderRadius: '12px',
          }}>Play</button>
        </div>
        <div style={{ textAlign: 'center'}}> 
          <button style={{ 
            fontFamily: "'Press Start 2P', cursive",
            fontSize: '16px',
            width: '150px',
            height: '50px',
            margin: '0 50px',
            borderRadius: '12px',
          }}>Next</button>
        </div>
      </div>
    </>
  );
}
