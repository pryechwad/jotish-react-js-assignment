import { useLocation, useNavigate } from 'react-router-dom';

const PhotoResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const image = location.state?.image;

  if (!image) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#f4fbfb'}}>
        <div className="text-center bg-white p-10 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Photo Captured</h2>
          <button onClick={() => navigate('/camera')} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
            Capture Photo
          </button>
        </div>
      </div>
    );
  }

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = `photo-${Date.now()}.jpg`;
    link.click();
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#f4fbfb'}}>
      <nav className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button onClick={() => navigate('/list')} className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-2">
            ← Back to List
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
              Captured Photo
            </h1>

            <div className="mb-6 rounded-lg overflow-hidden shadow-lg">
              <img src={image} alt="Captured" className="w-full h-auto" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={downloadImage} className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition duration-300">
                Download Photo
              </button>
              <button onClick={() => navigate('/camera')} className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition duration-300">
                Retake Photo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoResult;
