import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

const Camera = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    navigate('/photo-result', { state: { image: imageSrc } });
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#f4fbfb'}}>
      <nav className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-2">
            ← Back
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
              Capture Photo
            </h1>

            <div className="relative bg-black rounded-lg overflow-hidden mb-6 shadow-lg">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-auto"
                videoConstraints={{
                  facingMode: 'user'
                }}
              />
            </div>

            <button onClick={capture} className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition duration-300 text-lg">
              Capture Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Camera;
