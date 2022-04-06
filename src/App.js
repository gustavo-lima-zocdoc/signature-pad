import { useEffect, useRef } from 'react';
import './App.css';

const base64Image = 'data:image/png;base64,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';

function App() {
  // https://medium.com/@divbydiv/build-a-signature-pad-in-html-css-js-canvas-bd174d999392
  const signPad = useRef(null);
  useEffect(()=>{
    const ctx = signPad.current.getContext('2d');
    ctx.lineWidth = 3;
    ctx.lineJoin = ctx.lineCap = 'round';
    let writingMode = false;

    const handlePointerDown = (event) => {
      writingMode = true;
      ctx.beginPath();
      const [positionX, positionY] = getCursorPosition(event);
      ctx.moveTo(positionX, positionY);
    }    

    const handlePointerUp = () => {
      writingMode = false;
    }

    const handlePointerMove = (event) => {
      if (!writingMode) return
      const [positionX, positionY] = getCursorPosition(event);
      ctx.lineTo(positionX, positionY);
      ctx.stroke();
    }

    const getCursorPosition = (event) => {
      const positionX = event.clientX - event.target.getBoundingClientRect().x;
      const positionY = event.clientY - event.target.getBoundingClientRect().y;
      return [positionX, positionY];
    }

    signPad.current.addEventListener('pointerdown', handlePointerDown, {passive: true});
    signPad.current.addEventListener('pointerup', handlePointerUp, {passive: true});
    signPad.current.addEventListener('pointermove', handlePointerMove, {passive: true});

    // MOBILE
    signPad.current.addEventListener("touchstart",  function(event) {event.preventDefault()})
    signPad.current.addEventListener("touchmove",   function(event) {event.preventDefault()})
    signPad.current.addEventListener("touchend",    function(event) {event.preventDefault()})
    signPad.current.addEventListener("touchcancel", function(event) {event.preventDefault()})
  },[]);
  const handleClear = () => {
    const ctx = signPad.current.getContext('2d');
    ctx.clearRect(0, 0, signPad.current.width, signPad.current.height);
  }
  const handleSave = () => {
    const imageURL = signPad.current.toDataURL();
    console.log('imageURL',imageURL);
  }
  const handleLoad = base64 => {
    const ctx = signPad.current.getContext('2d');
    const image = new Image();
    image.onload = function() {
      ctx.drawImage(image, 0, 0);
    };
    image.src = base64;
  };
  return (
    <div className="App">
      <h1>Signature pad</h1>
      <canvas ref={signPad} height="100" width="300" className="signature-pad"></canvas>
      <button onClick={handleClear}>clear</button>
      <button onClick={handleSave}>save</button>
      <button onClick={()=>handleLoad(base64Image)}>load</button>
    </div>
  );
}

export default App;
