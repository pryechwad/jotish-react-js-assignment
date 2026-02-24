import { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Webcam from 'react-webcam';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Camera = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { updateEmployeePhoto } = useAuth();
  const [capturedImage, setCapturedImage] = useState(null);
  const employeeId = location.state?.employeeId;

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    toast.success('Photo captured successfully!');
  };

  const retake = () => {
    setCapturedImage(null);
    toast.info('Ready to capture new photo');
  };

  const downloadPhoto = () => {
    const link = document.createElement('a');
    link.href = capturedImage;
    link.download = `photo_${new Date().getTime()}.jpg`;
    link.click();
    toast.success('Photo downloaded successfully!');
  };

  const handleOk = () => {
    if (employeeId) {
      updateEmployeePhoto(employeeId, capturedImage);
      toast.success('Photo saved successfully!');
      navigate(`/details/${employeeId}`);
    } else {
      navigate('/photo-result', { state: { image: capturedImage } });
    }
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#f4fbfb'}}>
      <Toaster position="top-right" />
      <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button onClick={() => navigate(-1)} className="text-white hover:text-blue-100 font-bold flex items-center gap-2 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
              {capturedImage ? 'Photo Preview' : 'Capture Photo'}
            </h1>
            <p className="text-gray-600 text-center mb-6">
              {capturedImage ? 'Review your photo and choose an action' : 'Position yourself and click capture'}
            </p>

            <div className="relative bg-black rounded-lg overflow-hidden mb-6 shadow-lg">
              {!capturedImage ? (
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full h-auto"
                  videoConstraints={{
                    facingMode: 'user'
                  }}
                />
              ) : (
                <img src={capturedImage} alt="Captured" className="w-full h-auto" />
              )}
            </div>

            {!capturedImage ? (
              <button 
                onClick={capture} 
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition duration-300 text-lg shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Capture Photo
              </button>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={downloadPhoto} 
                  className="px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition duration-300 shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download
                </button>
                <button 
                  onClick={retake} 
                  className="px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold hover:from-orange-600 hover:to-orange-700 transition duration-300 shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Retake
                </button>
                <button 
                  onClick={handleOk} 
                  className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition duration-300 shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  OK
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Camera;
