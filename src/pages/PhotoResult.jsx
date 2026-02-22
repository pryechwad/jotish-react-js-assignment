import { useLocation, useNavigate } from 'react-router-dom';

const PhotoResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const image = location.state?.image;

  if (!image) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Photo Captured</h2>
          <button
            onClick={() => navigate('/camera')}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/list')}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
          >
            ← Back to List
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
              Captured Photo
            </h1>

            <div className="mb-6 rounded-lg overflow-hidden shadow-md">
              <img src={image} alt="Captured" className="w-full h-auto" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={downloadImage}
                className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition duration-300 flex items-center justify-center gap-2"
              >
                💾 Download Photo
              </button>
              <button
                onClick={() => navigate('/camera')}
                className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-300 flex items-center justify-center gap-2"
              >
                📷 Retake Photo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoResult;
